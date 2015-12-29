'use strict';

/*
 * folderElement:
 *   This module holds the creation logic for folder elements.
 */

// Node modules
const $ = require('jquery');
const tools = require('./uiTools');
const BigNumber = require('bignumber.js');

// Make folder element with jquery
function addFolder(f) {
	var el = $(`
		<div class='folder hidden' id='${f.path}'>
			<div class='graphic'>
				<i class='fa fa-folder'></i>
			</div>
			<div class='name'></div>
			<div class='size'></div>
			<div class='download cssTooltip' tooltip-content="Download"><i class='fa fa-download'></i></div>
			<div class='share cssTooltip' tooltip-content="Share"><i class='fa fa-share-alt'></i></div>
			<div class='delete cssTooltip' tooltip-content="Delete"><i class='fa fa-remove'></i></div>
		</div>
	`);

	// Give the folder buttons clickability
	el.find('.download').click(function() {
		var destination = tools.dialog('save');
		if (!destination) {
			return;
		}
		tools.notify('Downloading ' + f.name + ' to ' + destination, 'download');
		f.download(destination, function() {
			tools.notify(f.name + ' downloaded to ' + destination, 'success');
		});
	});
	el.find('.share').click(function() {
		var destination = tools.dialog('save');
		if (!destination) {
			return;
		}
		// Download siafiles to location
		f.share(destination, function() {
			tools.notify('Downloaded ' + f.name + '\'s .sia files to '+ destination, 'download');
		});
	});
	el.find('.delete').click(function() {
		// Confirm deletion dialog
		var confirmation = tools.dialog('message', {
			type: 'warning',
			title: 'Confirm Deletion',
			message: `Are you sure you want to delete ${f.name}?`,
			detail: 'This will permanently remove it from your library!',
			buttons: ['Okay', 'Cancel'],
		});
		if (confirmation === 0) {
			f.delete(el.remove);
		}
	});

	// Set field display values
	el.find('.name').html(f.name);
	el.find('.size').html(tools.formatBytes(f.size));
}

module.exports = addFolder;
