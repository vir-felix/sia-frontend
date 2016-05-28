import ReceivePromptView from '../components/receiveprompt.js'
import { connect } from 'react-redux'
import { hideReceivePrompt } from '../actions/wallet.js'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => ({
	address: state.receiveprompt.get('address'),
})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ hideReceivePrompt }, dispatch),
})

const ReceivePrompt = connect(mapStateToProps, mapDispatchToProps)(ReceivePromptView)
export default ReceivePrompt
