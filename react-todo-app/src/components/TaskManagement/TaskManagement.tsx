import './TaskManagement.css';

import { useDispatch, useSelector } from 'react-redux'

import TaskSection from './../TaskSection/TaskSection';
import { Task } from './../Task';
import { toggleTask } from './../TaskAction';

const TaskManagement = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state: { Tasks: Task[] }) => state.Tasks)

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    const completedTasks = tasks.filter(task => task.completed === true)
    const outstandingTasks = tasks.filter(task => task.completed === false)
    const overdueTasks = outstandingTasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate < currentDate;
    })

    const handleToggle = (id: number) => {
        dispatch(toggleTask(id));
    };

    return (
        <div className="task-management-container">
            <TaskSection title="Overdue" tasks={overdueTasks} onToggle={handleToggle} isOverdue={true}/>
            <TaskSection title="Outstanding" tasks={outstandingTasks} onToggle={handleToggle} isOverdue={false}/>
            <TaskSection title="Completed" tasks={completedTasks} onToggle={handleToggle} isOverdue={false}/>
        </div>
    );
};

export default TaskManagement;
