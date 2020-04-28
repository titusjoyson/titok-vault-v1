export const ADD_SECRET = "ADD_SECRET";
export const SELECT_SECRET = "SELECT_SECRET";
export const DELETE_SECRET = "DELETE_SECRET";
export const CHANGE_VIEW_MODE = "CHANGE_VIEW_MODE";
export const REPLACE_SECRET = "REPLACE_SECRET";


export function addSecret(){
    return {
        type: ADD_SECRET
    }
}

export function selectSecret(id){
    return {
        type: SELECT_SECRET,
        payload: { id }
    }
}


export function deleteSecret(id){
    return {
        type: DELETE_SECRET,
        payload: { id }
    }
}

export function changeViewMode(viewMode){
    return {
        type: CHANGE_VIEW_MODE,
        payload: viewMode
    }
}

export function replaceSecret(data){
    return {
        type: REPLACE_SECRET,
        payload: data
    }
}