import { Map, List } from 'immutable'
import * as constants from '../constants/files.js'

const initialState = Map({
	activespending: '',
	allocatedspending: '',
	files: List(),
	path: '',
	searchText: '',
	uploadSource: '',
	showAllowanceDialog: false,
	showUploadDialog: false,
	showSearchField: false,
	dragging: false,
})

export default function filesReducer(state = initialState, action) {
	console.log(action)
	switch (action.type) {
	case constants.RECEIVE_METRICS:
		return state.set('activespending', action.activespending)
		            .set('allocatedspending', action.allocatedspending)
	case constants.RECEIVE_FILES:
		return state.set('files', action.files)
		            .set('path', action.path)
	case constants.SHOW_ALLOWANCE_DIALOG:
		return state.set('showAllowanceDialog', true)
	case constants.CLOSE_ALLOWANCE_DIALOG:
		return state.set('showAllowanceDialog', false)
	case constants.SET_SEARCH_TEXT:
		return state.set('searchText', action.text)
	case constants.TOGGLE_SEARCH_FIELD:
		return state.set('showSearchField', !state.get('showSearchField'))
	case constants.SET_DRAGGING:
		return state.set('dragging', true)
	case constants.SET_NOT_DRAGGING:
		return state.set('dragging', false)
	case constants.SHOW_UPLOAD_DIALOG:
		return state.set('showUploadDialog', true)
		            .set('uploadSource', action.source)
	case constants.HIDE_UPLOAD_DIALOG:
		return state.set('showUploadDialog', false)
	default:
		return state
	}
}
