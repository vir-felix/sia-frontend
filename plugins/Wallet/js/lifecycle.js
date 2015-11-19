'use strict';

// Library for working with clipboard
const Clipboard = require('clipboard');
// How often /wallet updates
var refreshRate = 500; // half-second
var finalRefreshRate = 1000 * 60 * 5; // five-minutes
// Keeps track of if the view is shown
var updating;
// Variable to store addresses
var addresses = {};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Updating  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Make API calls, sending a channel name to listen for responses
function update() {
	IPC.sendToHost('api-call', '/wallet', 'update-status');

	// Get list of wallet addresses
	IPC.sendToHost('api-call', {
		url: '/wallet/addresses',
		type: 'GET',
	}, 'update-address');

	updating = setTimeout(update, refreshRate);
}

// Update wallet summary in header
addResultListener('update-status', function(wallet) {
	// slow down after first successful call
	refreshRate = finalRefreshRate;

	// Show correct lock status.
	if (!wallet.encrypted) {
		setUnencrypted();
	} else if (!wallet.unlocked) {
		setLocked();
	} else if (wallet.unlocked) {
		setUnlocked();
	}

	// Update balance confirmed and uncomfirmed
	var bal = convertSiacoin(wallet.confirmedsiacoinbalance);
	var pend = convertSiacoin(wallet.unconfirmedincomingsiacoins).sub(convertSiacoin(wallet.unconfirmedoutgoingsiacoins));
	if (wallet.unlocked && wallet.encrypted) {
		$('#confirmed').show();
		$('#unconfirmed').show();
		$('#confirmed').html('Balance: ' + bal + ' S');
		$('#unconfirmed').html('Pending: ' + pend + ' S');
	} else {
		$('#confirmed').hide();
		$('#unconfirmed').hide();
	}
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Addresses ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Get transactions for a specific wallet address
function updateAddrTxn(address) {
	$('#transaction-list').empty();
	IPC.sendToHost('api-call', {
		url: '/wallet/transactions/' + address,
		type: 'GET',
	}, 'update-history');
}

// Make wallet address html element
function makeAddress(address, callback) {
	// Create only new addresses
	if (typeof(address) === 'undefined') { callback(undefined); }
	if (addresses[address]) { callback(undefined); }
	var addr = $('#addressbp').clone();
	addresses[address] = addr;

	// Insert values
	addr.removeClass('hidden');
	addr.find('.listnum').html(Object.keys(addresses).length);
	addr.find('.address').html(address);
	addr.attr('id', address);

	// Make clicking the address show relevant transactions
	addr.find('.address').click(function() {
		updateAddrTxn(address);
	});

	// Make copy-to-clipboard buttin clickable
	addr.find('.copy-address').click(function() {
		Clipboard.writeText(address);
		notify('Copied address to clipboard', 'copied');
	});

	// Pass the element to the callback
	callback(addr);
}

function appendAddress(address) {
	makeAddress(address, $('#address-list').append);
}

// Efficiently add an array of addresses by making an array of html elements
// then inserting the array into the page
function appendAddresses(addresses) {
	var processed = 0;
	var elementArray = [];
	var len = addresses.length;
	function pushElement(element) {
		processed++;
		if (!element) {
			return;
		}

		elementArray.push(element);

		if (processed === len) {
			$('#address-list').append(elementArray);
		}
	}
	for (var i = 0; i < len; i++) {
		makeAddress(addresses[i], pushElement);
	}
}

// Add addresses to page
addResultListener('update-address', function(result) {
	// Update address list
	appendAddresses(result.addresses);

	/* Fetch all wallet transactions by iterate over wallet addresses
	var loopmax = result.addresses.length;
	var counter = 0;
	(function next() {
		setTimeout(function() {
			updateAddrTxn(result.addresses[counter].address);
			next();
		}, 50); // force 50 ms delay between each GET request
	})();*/
});

// Filter address list by search string
function filterAddressList(searchstr) {
	var entries = $('#address-list').children();
	entries.each(function(index, entry) {
		if ($(entry).find('.address').html().indexOf(searchstr) > -1) {
			$(entry).show();
		} else {
			$(entry).hide();
		}
	});
}

// Start search when typing in Search field
$('#search-bar').keyup(function() {
	tooltip('Searching...', this);
	var searchstr = $('#search-bar').val();
	filterAddressList(searchstr);
});

// Add the new address
addResultListener('new-address', function(result) {
	notify('New address created', 'created');
	appendAddress(result.address);
	filterAddressList(result.address);
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Transactions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Append a transaction to Transactions list
function appendTransaction(txn) {
	// Add only new transactions
	if (typeof(txn) === 'undefined') { return; }
	if ($('#' + txn.transactionid).length !== 0) { return; }

	// Compute transaction net amount
	var amount = new BigNumber(0);
	if (txn.inputs) {
		txn.inputs.forEach( function(input) {
			if (input.walletaddress) {
				amount = amount.sub(input.value);
			}
		});
	}
	if (txn.outputs) {
		txn.outputs.forEach( function(output) {
			if (output.walletaddress) {
				amount = amount.add(output.value);
			}
		});
	}

	// Add only non-zero transactions
	amount = convertSiacoin(amount);
	if (amount.equals(0)) {
		return;
	}

	// Make transaction
	var txnElement = $('#transactionbp').clone();
	txnElement.id = txn.transactionid;

	txnElement.timestamp = txn.confirmationtimestamp * 1000;
	var timestamp = new Date(txn.confirmationtimestamp * 1000);
	var time = timestamp.toLocaleString();

	// Insert transaction values in UI
	txnElement.find('.amount').html(amount + ' S');
	txnElement.find('.txnid').html(txn.transactionid);
	txnElement.find('.time').html(time);

	// Set transaction type
	if (amount < 0) {
		txnElement.find('.send').show();
		txnElement.find('.receive').hide();
	} else {
		txnElement.find('.send').hide();
		txnElement.find('.receive').show();
	}

	// Display transaction
	$('#transaction-list').append(txnElement);
	txnElement.show();
}

// Update transaction history
addResultListener('update-history', function(result) {
	if (result.confirmedtransactions) {
		// Reverse direction of transactions list (most recent first)
		result.confirmedtransactions.reverse();
		result.confirmedtransactions.forEach(function (txn) {
			appendTransaction(txn);
		});
	}
	// TODO Register unconfirmed transactions
	/*if (result.unconfirmed) {
		result.unconfirmedtransactions.forEach(function(processedtxn) {
		});
	}*/
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Start/Stop ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Called upon showing
function start() {
	// DEVTOOL: uncomment to bring up devtools on plugin view
	// IPC.sendToHost('devtools');

	update();
}

// Called upon transitioning away from this view
function stop() {
	// Stop updating
	clearTimeout(updating);
}

