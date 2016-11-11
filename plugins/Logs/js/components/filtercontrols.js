import React, { PropTypes } from 'react'
import { Set } from 'immutable'
import FilterControl from './filtercontrol'

const filterButtons = [
	{
		name: 'Consensus',
		filters: ['consensus.log'],
	},
	{
		name: 'Gateway',
		filters: ['gateway.log'],
	},
	{
		name: 'Host',
		filters: ['host.log', 'storagemanager.log'],
	},
	{
		name: 'Renter',
		filters: ['renter/contractor.log', 'renter/hostdb.log', 'renter.log'],
	},
	{
		name: 'Miner',
		filters: ['miner.log'],
	},
	{
		name: 'Wallet',
		filters: ['wallet.log'],
	},
]

const filterControlsStyle = {
	width: '100%',
	height: '60px',
	marginTop: '5px',
	marginBottom: '5px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}

const FilterControls = ({logFilters, actions}) => (
	<div style={filterControlsStyle}>
		{
			filterButtons.map((filter, key) => (
				<FilterControl
					name={filter.name}
					filters={filter.filters}
					checked={filter.filters.reduce((isChecked, filtertext) => isChecked || logFilters.includes(filtertext), false)}
					addLogFilters={actions.addLogFilters}
					removeLogFilters={actions.removeLogFilters}
					key={key}
				/>
			))
		}
	</div>
)


FilterControls.propTypes = {
	logFilters: PropTypes.instanceOf(Set).isRequired,
}

export default FilterControls

