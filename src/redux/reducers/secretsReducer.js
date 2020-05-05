import {
    ADD_SECRET,
    SELECT_SECRET,
    DELETE_SECRET,
    CHANGE_VIEW_MODE,
    REPLACE_SECRET,
} from "../actions/secrets";
import { Secret } from "../../models";
import { ViewModes } from "../../com/const";

const initialState = {
    activeMode: ViewModes.VIEW,
    active: null,
    data: [],
};

export default (state = initialState, action) => {
    let data = [];
    switch (action.type) {
        case ADD_SECRET:
            const newData = Secret();
            return {
                ...state,
                activeMode: ViewModes.EDIT,
                active: newData.id,
                data: [newData, ...state.data],
            };
        case SELECT_SECRET:
            data = state.data;
            const selItemIdx = data.findIndex(
                (i) => i.id === action.payload.id
            );
            let activeMode = ViewModes.VIEW;
            if (data[selItemIdx].items.length <= 0) {
                activeMode = ViewModes.EDIT;
            }
            return {
                ...state,
                active: action.payload.id,
                activeMode: activeMode,
            };
        case DELETE_SECRET:
            data = state.data;
            const deleteItemIdx = data.findIndex(
                (i) => i.id === action.payload.id
            );
            data.splice(deleteItemIdx, 1);
            let active = null;
            // current data length
            if (data.length > 0) {
                // check deleted item is last item
                if (data.length === deleteItemIdx) {
                    active = data[deleteItemIdx - 1].id;
                } else {
                    active = data[deleteItemIdx].id;
                }
            }
            return {
                ...state,
                active: active,
                data: data,
            };
        case CHANGE_VIEW_MODE:
            return {
                ...state,
                activeMode: action.payload,
            };
        case REPLACE_SECRET:
            data = [...state.data];
            const replaceItemIdx = data.findIndex(
                (i) => i.id === action.payload.id
            );
            data[replaceItemIdx] = action.payload
            return {...state, "data":data}
        default:
            return state;
    }
};
