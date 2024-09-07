import { createStore } from 'redux'
import {composeWithDevTools} from'redux-devtools-extension'
import rootreduces from './reducers/rootReducer'

const composeEnhancers = composeWithDevTools()
export const store = createStore(rootreduces, composeEnhancers)
