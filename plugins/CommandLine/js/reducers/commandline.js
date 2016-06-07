import { Map, List } from 'immutable'
import * as constants from '../constants/commandline.js'

const initialState = Map({
    commandHistory: List([])
})

export default function commandLineReducer(state = initialState, action) {
	switch (action.type) {
        case constants.ADD_COMMAND:
            //Add command to the command history.
            console.log("NEW COMMAND!")
            var newCommandHistory = state.get("commandHistory").push(action.command)
            return state.set("commandHistory", newCommandHistory)
    
        case constants.UPDATE_COMMAND:
            //Updates output of command given by command name and id.
            var newCommandHistory = state.get("commandHistory")
            var [commandIdx, newCommand] = newCommandHistory.findLastEntry(
                (val) => (val.get("command") == action.command && val.get("id") == action.id)
            ) //TODO If val isn't found?
    
            newCommand = newCommand.set('result', newCommand.get('result') + action.dataChunk)
            console.log(newCommand)
            newCommandHistory = newCommandHistory.set(commandIdx, newCommand)
            return state.set("commandHistory", newCommandHistory)
    
    	default:
    		return state
	}
}
