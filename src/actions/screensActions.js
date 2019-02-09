import { SHOW_SCREENS, ADD_SCREEN, DELETE_SCREEN } from './types';

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