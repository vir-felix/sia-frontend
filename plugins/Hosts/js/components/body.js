import React, { PropTypes } from 'react'
import { Map, List } from 'immutable'
import * as helper from '../utils/host.js'
import FilesList from '../containers/fileslist.js'
import SettingsList from '../containers/settingslist.js'

const Body = ({ acceptingContracts, usersettings, defaultsettings, files, actions }) => {

	return (
		<div className="hosting">

			<div className="help section">
				<div className="property row">
					<div className="title">Help</div>
					<div className='controls'>
						<div className='button' id='announce' onClick={ function () {} }>
							<i className='fa fa-bullhorn'></i>
							Announce
						</div>
					</div>
				</div>
				<div className="property">
					<div className="instructions">
						To start hosting:
						<ol>
							<li>Add a storage folder.</li>
							<li>Set your prefered price, bandwidth cost, collateral, and duration.</li>
							<li>Set "Accepting Contracts" to "Yes"</li>
							<li>Announce your host by clicking the above "Announce" button.</li>
						</ol>
					</div>
				</div>
			</div>

			<SettingsList />
			<FilesList />
		</div>
	)
}

export default Body
