import { nextTaskId, Task } from '../components/Task'
import { ADD_TASK, TOGGLE_TASK, AddTaskAction, ToggleTaskAction, TaskAction } from '../components/TaskAction'

const initialState: Task[] = []

export default function TasksReducer(state = initialState, action : TaskAction | { type: string }): Task[] {
  switch (action.type) {
    case ADD_TASK:
      let newId: number = nextTaskId(state);
      return [...state, { ...(action as AddTaskAction).payload, id: newId }]
    case TOGGLE_TASK:
      return state.map(task =>
        task.id === (action as ToggleTaskAction).payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state
  }
}
