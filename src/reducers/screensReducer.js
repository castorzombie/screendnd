import { SHOW_SCREENS, ADD_SCREEN, DELETE_SCREEN, DETAILS_SCREEN } from '../actions/types'

const initialState = {
    screens: [],
    screen: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_SCREENS:
            return {
                ...state
            }
        case ADD_SCREEN:
            return {
                ...state,
                screens: [...state.screens, action.payload]
            }
        case DELETE_SCREEN:
            return {
                ...state,
                screens: state.screens.filter(screen => screen.id != action.payload)
            } 
        case DETAILS_SCREEN:
            return {
                ...state, 
                screen: state.screens.find(screen => screen.id == action.payload)
            }    
        default:
            return state;              
    }
}