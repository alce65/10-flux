import { useEffect, useReducer, useMemo } from 'react';

import { TaskModel } from '../models/task';
import { taskReducer } from '../reducers/reducer';
import * as actions from '../reducers/action.creators';
import { HttpStoreTasks } from '../services/http.store.task';

export function useTasks() {
    const initialState: Array<TaskModel> = [];
    const apiTasks = useMemo(() => new HttpStoreTasks(), []);
    const [tasks, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        apiTasks
            .getTasks()
            .then((resp) => dispatch(actions.loadTasksAction(resp)));
    }, [apiTasks]);

    const addTask = (task: TaskModel) => {
        apiTasks
            .setTask(task)
            .then((resp) => dispatch(actions.addTaskAction(resp)));
    };

    const deleteTask = (task: TaskModel) => {
        apiTasks
            .deleteTask(String(task.id))
            .then((resp) => dispatch(actions.deleteTaskAction(task)));
    };
    const toggleComplete = (task: TaskModel) => {
        apiTasks
            .updateTask(task)
            .then((resp) =>
                dispatch(actions.updateTaskAction(resp as TaskModel))
            );
    };

    return {
        tasks,
        addTask,
        deleteTask,
        toggleComplete,
    };
}
