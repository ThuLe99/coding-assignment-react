import { User } from "@acme/shared-models"
import { ActionType } from "./type"

const initialState = {
    data: [],
    loading: false,
    error: undefined

}
function ticketReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case 'tickets/fetch_request':
            return {
                ...state,
                loading: true
            }
        case 'tickets/fetch_success':
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case 'tickets/fetch_error':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //detail ticket
        case 'ticket/fetch_request':
            return {
                ...state,
                loading: true
            }
        case 'ticket/fetch_success':
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case 'ticket/fetch_error':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //create ticket
        case 'tickets/create_request':
            return {
                ...state,
                loading: true
            }
        case 'tickets/create_success':
            return {
                ...state,
                loading: false,
                data: [action.payload, ...state.data]
            }
        case 'tickets/create_error':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        //update user
        case 'tickets/update_request':
            return {
                ...state,
                loading: true
            }
        case 'tickets/update_success':
            return {
                ...state,
                loading: false,
                data: state.data?.map((item: User) =>
                    item?.id === action.payload.id ? action.payload : item)
            }
        case 'tickets/update_error':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'tickets/delete_request':
            return {
                ...state,
                loading: true
            }
        case 'tickets/delete_success':
            return {
                ...state,
                loading: false,
                data: state.data?.filter((item: User) => item.id !== action.payload)
            }
        case 'tickets/delete_error':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default ticketReducer