import { Task } from './Task'

export const ADD_TASK = 'ADD_TASK'
export const TOGGLE_TASK = 'TOGGLE_TASK'

export interface AddTaskAction {
    type: typeof ADD_TASK
    payload: Omit<Task, 'id'>
    [key: string]: any
}

export interface ToggleTaskAction {
    type: typeof TOGGLE_TASK
    payload: number
    [key: string]: any
}

export const addTask = (task: Omit<Task, 'id'>): AddTaskAction => ({
    type: ADD_TASK,
    payload: task
})

export const toggleTask = (id: number): ToggleTaskAction => ({
    type: TOGGLE_TASK,
    payload: id
})

export type TaskAction = AddTaskAction | ToggleTaskAction
