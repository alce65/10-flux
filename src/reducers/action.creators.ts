import { TaskModel } from '../models/task';
import { actionTypes } from './action.types';

export interface iAction {
    type: actionTypes;
    payload?: any;
}

export const loadTasksAction = (tasks: Array<TaskModel>): iAction => ({
    type: actionTypes['tasks@load'],
    payload: tasks,
});

export const addTaskAction = (task: TaskModel): iAction => ({
    type: actionTypes['tasks@add'],
    payload: task,
});

export const updateTaskAction = (task: TaskModel): iAction => ({
    type: actionTypes['tasks@update'],
    payload: task,
});

export const deleteTaskAction = (task: TaskModel): iAction => ({
    type: actionTypes['tasks@delete'],
    payload: task,
});
