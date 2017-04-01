import React, { PropTypes } from 'react'

// -- helper functions --

// currentEstimatedHeight returns the estimated block height for the current time.
const currentEstimatedHeight = () => {
	const knownBlockHeight = 98149
	const knownBlockTime = new Date('March 31, 2017 23:30:30 UTC')
	const blockTime = 10 //minutes
	const diffMinutes = Math.abs(new Date() - knownBlockTime) / 1000 / 60 / 60

	const estimatedHeight = knownBlockHeight + (diffMinutes / blockTime)

	return Math.floor(estimatedHeight + 0.5) // round to the nearest block
}

// estimatedProgress returns the estimated sync progress given the current
// blockheight, as a number from 0 -> 100
const estimatedProgress = (currentHeight) =>
	currentHeight / currentEstimatedHeight() * 100

// -- components --

const StatusBar = ({synced, blockheight, peers}) => {

	const redColor = '#E0000B'
	const greenColor = '#00CBA0'
	const yellowColor = '#E7D414'

	const syncStyle = {
		color: redColor,
	}

	const syncProgressStyle = {
		width: estimatedProgress(blockheight).toString() + '%',
		height: '20px',
		transition: 'width 200ms',
		backgroundColor: '#00CBA0',
		margin: '0',
	}

	const syncProgressContainerStyle = {
		backgroundColor: '#eee',
		height: '20px',
		width: '150px',
	}

	const syncProgressInfoStyle = {
		width: '200px',
		position: 'relative',
		right: '30px',
		fontSize: '12px',
	}

	let status
	if (!synced && peers === 0) {
		syncStyle.color = redColor
		status = 'Not Synchronizing'
	} else if (!synced && peers > 0) {
		syncStyle.color = yellowColor
		status = 'Synchronizing'
	} else if (synced && peers === 0) {
		syncStyle.color = redColor
		status = 'No Peers'
	} else if (synced) {
		syncStyle.color = greenColor
		status = 'Synchronized'
	}

	let syncStatus = (
		<div className="status-bar-blockheight">Block Height: {blockheight}</div>
	)

	if (!synced) {
		syncStatus = (
			<div style={syncProgressContainerStyle}>
				<div style={syncProgressStyle} />
				<div style={syncProgressInfoStyle}>
					{blockheight} / {currentEstimatedHeight()} blocks
				</div>
			</div>
		)
	}

	return (
		<div className="status-bar">
			<div style={syncStyle}>
				<i className="fa fa-globe fa-2x" />
				{status}
			</div>
			{syncStatus}
		</div>
	)
}

StatusBar.propTypes = {
	synced: PropTypes.bool.isRequired,
	blockheight: PropTypes.number.isRequired,
	peers: PropTypes.number.isRequired,
}

export default StatusBar

