import { SHOW_SCREENS, ADD_SCREEN, DELETE_SCREEN } from '../actions/types'

const initialState = {
    screens: []
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
        default:
            return state;
               
    }
}