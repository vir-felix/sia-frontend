import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import Wallet from '../../plugins/Wallet/js/components/wallet.js'
import ReceiveButton from '../../plugins/Wallet/js/containers/receivebutton.js'
import ReceivePrompt from '../../plugins/Wallet/js/containers/receiveprompt.js'
import NewWalletDialog from '../../plugins/Wallet/js/containers/newwalletdialog.js'
import LockButton from '../../plugins/Wallet/js/containers/lockbutton.js'
import TransactionList from '../../plugins/Wallet/js/containers/transactionlist.js'
import SendPrompt from '../../plugins/Wallet/js/containers/sendprompt.js'

const testActions = {
	startSendPrompt: spy(),
}

describe('wallet component', () => {
	afterEach(() => {
		testActions.startSendPrompt.reset()
	})
	it('should render balance info', () => {
		const walletComponent = shallow(<Wallet confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" />)
		expect(walletComponent.find('.balance-info').children()).to.have.length(2)
	})
	it('should render siafund balance when it is non-zero', () => {
		const walletComponent = shallow(<Wallet confirmedbalance="10" unconfirmedbalance="1" siafundbalance="1" />)
		expect(walletComponent.find('.balance-info').children()).to.have.length(3)
	})
	it('should render siacoin send button when siafund balance is zero', () => {
		const walletComponent = shallow(<Wallet confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" />)
		expect(walletComponent.find('SendButton')).to.have.length(1)
	})
	it('should start send prompt with siacoins when send siacoin button is clicked', () => {
		const walletComponent = shallow(<Wallet confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" actions={testActions} />)
		walletComponent.find('SendButton').first().simulate('click')
		expect(testActions.startSendPrompt.calledWith('siacoins')).to.equal(true)
	})
	it('should start send prompt with siafunds when send siafunds button is clicked', () => {
		const walletComponent = shallow(<Wallet confirmedbalance="10" unconfirmedbalance="1" siafundbalance="1" actions={testActions} />)
		walletComponent.find('SendButton [currencytype="Siafund"]').first().simulate('click')
		expect(testActions.startSendPrompt.calledWith('siafunds')).to.equal(true)
	})
	it('should have a transaction list', () => {
		const walletComponent = shallow(<Wallet confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" actions={testActions} />)
		expect(walletComponent.contains(<TransactionList />)).to.equal(true)
	})
	it('should have a receive button', () => {
		const walletComponent = shallow(<Wallet confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" actions={testActions} />)
		expect(walletComponent.contains(<ReceiveButton />)).to.equal(true)
	})
	it('should not show new wallet dialog unless showNewWalletDialog', () => {
		const walletComponent = shallow(<Wallet showNewWalletDialog={false} confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" actions={testActions} />)
		expect(walletComponent.contains(<NewWalletDialog />)).to.equal(false)
	})
	it('should show new wallet dialog when showNewWalletDialog', () => {
		const walletComponent = shallow(<Wallet showNewWalletDialog={true} confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" actions={testActions} />)
		expect(walletComponent.contains(<NewWalletDialog />)).to.equal(true)
	})
	it('should not show send prompt unless showSendPrompt', () => {
		const walletComponent = shallow(<Wallet showSendPrompt={false} confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" actions={testActions} />)
		expect(walletComponent.contains(<SendPrompt />)).to.equal(false)
	})
	it('should show send prompt when showSendPrompt', () => {
		const walletComponent = shallow(<Wallet showSendPrompt={true} confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" actions={testActions} />)
		expect(walletComponent.contains(<SendPrompt />)).to.equal(true)
	})
	it('should not show receive prompt unless showReceivePrompt', () => {
		const walletComponent = shallow(<Wallet showReceivePrompt={false} confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" actions={testActions} />)
		expect(walletComponent.contains(<ReceivePrompt />)).to.equal(false)
	})
	it('should show receive prompt when showReceivePrompt', () => {
		const walletComponent = shallow(<Wallet showReceivePrompt={true} confirmedbalance="10" unconfirmedbalance="1" siafundbalance="0" actions={testActions} />)
		expect(walletComponent.contains(<ReceivePrompt />)).to.equal(true)
	})
})