import { combineReducers } from 'redux'

import userReducer from './userReducer'
import ticketReducer from './ticketReducer'

const rootreduces = combineReducers({
    userState: userReducer,
    ticketState: ticketReducer

})


export default rootreduces