import React, { PropTypes } from 'react'
import UnlockWarning from './unlockwarning.js'

const AllowanceDialog = ({unlocked, feeEstimate, storageEstimate, actions}) => {
	const onCancelClick = () => actions.closeAllowanceDialog()
	const onAcceptClick = (e) => {
		e.preventDefault()
		actions.setAllowance(e.target.allowance.value)
	}
	const onAllowanceChange = (e) => {
		actions.getStorageEstimate(e.target.value)
		actions.setFeeEstimate(Math.floor(1000 + 0.12 * parseInt(e.target.value)) || 0)
	}
	const dialogContents = (
		<div className="allowance-dialog">
			<h3> Buy storage on the Sia Decentralized Network</h3>
			<p>You need to allocate funds to upload and download on Sia. Your allowance remains locked for 3 months. Unspent funds are then refunded*. You can increase your allowance at any time.</p>
			<p>Your storage allowance automatically refills every 6 weeks. Your computer must be online with your wallet unlocked to complete the refill. If Sia fails to refill the allowance by the end of the lock-in period, your data may be lost.</p>
			<p>*contract fees are non-refundable</p>
			<form className="allowance-form" onSubmit={onAcceptClick}>
				<input type="number" name="allowance" defaultValue="5000" onFocus={onAllowanceChange} onChange={onAllowanceChange} required autoFocus className="allowance-amount" />SC
				<div className="allowance-buttons">
					<button type="submit" className="allowance-button-accept">Accept</button>
					<button type="button" onClick={onCancelClick} className="allowance-button-cancel">Cancel</button>
				</div>
			</form>
			<span> Estimated Fees: {feeEstimate} SC </span>
			<span> Estimated storage based on current prices: {storageEstimate} </span>
		</div>
	)

	return (
		<div className="modal">
			{unlocked ? dialogContents : <UnlockWarning onClick={onCancelClick} />}
		</div>
	)
}

AllowanceDialog.propTypes = {
	unlocked: PropTypes.bool.isRequired,
	feeEstimate: PropTypes.number.isRequired,
	storageEstimate: PropTypes.string.isRequired,
}

export default AllowanceDialog
