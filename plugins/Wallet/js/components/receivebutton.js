import React from 'react';

const ReceiveButton = ({actions}) => (
	<div className="receive-button" onClick={actions.getNewReceiveAddress}>
		<i className="fa fa-download fa-4x"></i>
		<span>Receive Siacoin</span>
	</div>
);
export default ReceiveButton;
