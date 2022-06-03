import { ReactElement, useEffect } from 'react';
import { useReducer } from 'react';

import { TaskModel } from '../models/task';
import { taskReducer } from '../reducers/reducer';
import { TaskContext } from './task.context';
import * as actions from '../reducers/action.creators';
import { HttpStoreTasks } from '../services/http.store.task';

export function TaskContextProvider({ children }: { children: ReactElement }) {
    const initialState: Array<TaskModel> = [];
    const apiTasks = new HttpStoreTasks();
    const [tasks, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        apiTasks
            .getTasks()
            .then((resp) => dispatch(actions.loadTasksAction(resp)));
    }, []);

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

    const context = {
        tasks,
        addTask,
        deleteTask,
        toggleComplete,
    };

    return (
        <TaskContext.Provider value={context}>{children}</TaskContext.Provider>
    );
}
