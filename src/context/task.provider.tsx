import { ReactElement } from 'react';
import { useTasks } from '../hooks/useTasks';

import { TaskContext } from './task.context';

export function TaskContextProvider({ children }: { children: ReactElement }) {
    const context = useTasks();

    return (
        <TaskContext.Provider value={context}>{children}</TaskContext.Provider>
    );
}
