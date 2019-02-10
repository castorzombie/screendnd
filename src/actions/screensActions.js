import { SHOW_SCREENS, ADD_SCREEN, DELETE_SCREEN, DETAILS_SCREEN, UPDATE_SELECTED } from './types';

export const getScreens = () => {
    return {
        type: SHOW_SCREENS
    }
};

export const addScreen = (screen) => {
    return {
        type: ADD_SCREEN,
        payload: screen
    }
};

export const deleteScreen = (id) => {
    return {
        type: DELETE_SCREEN,
        payload: id
    }
};

export const detailsScreen = (id) => {
    return {
        type: DETAILS_SCREEN,
        payload: id
    }
}

export const updateSelected = (screen) => {
    return{
        type: UPDATE_SELECTED,
        payload: screen
    } 
}