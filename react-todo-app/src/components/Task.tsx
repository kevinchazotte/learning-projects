export type Task = {
    id: number;
    taskName: string;
    dueDate: string;
    description?: string;
    completed: boolean;
}

export function nextTaskId(Tasks: Task[]) : number {
    const maxId = Tasks.reduce((maxId, task) => Math.max(task.id, maxId), -1)
    return maxId + 1
}
