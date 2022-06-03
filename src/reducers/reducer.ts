// Funcion pura
// recibe un estado y una accion
// retorna un NUEVO estado (NO HAY MUTACION)

import { TaskModel } from '../models/task';
import { iAction } from './action.creators';
import { actionTypes } from './action.types';

export function taskReducer(initialState: Array<TaskModel>, action: iAction) {
    let state: Array<TaskModel> = [];
    switch (action.type) {
        case actionTypes['tasks@load']:
            state = action.payload;
            break;
        case actionTypes['tasks@add']:
            state = [...initialState, action.payload];
            break;
        case actionTypes['tasks@update']:
            state = initialState.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
            break;
        case actionTypes['tasks@delete']:
            state = initialState.filter(
                (item) => item.id !== action.payload.id
            );
            break;
        default:
            state = initialState;
    }

    return state;
}
