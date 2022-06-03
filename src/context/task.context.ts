import { createContext } from 'react';
import { TaskModel } from '../models/task';

let initialContext: {
    tasks: Array<TaskModel>;
    addTask(task: TaskModel): void;
    deleteTask(task: TaskModel): void;
    toggleComplete(task: TaskModel): void;
} = {
    tasks: [],
    addTask: () => {},
    deleteTask: () => {},
    toggleComplete: () => {},
};

export const TaskContext = createContext(initialContext);
