import './TaskInput.css';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addTask } from './../TaskAction';
import { Task } from './../Task';

const TaskInput = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: { Tasks: Task[] }) => state.Tasks)

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    const outstandingTasks = tasks.filter(task => task.completed === false)
    const overdueTasks = outstandingTasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate < currentDate;
    })

    const [name, setName] = useState<string>('');
    const [dueDateString, setDueDateString] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Set result and hide form
        dispatch(addTask({
            taskName: name,
            dueDate: dueDateString,
            description: description,
            completed: false
        }))
        // clear input items
        setName('')
        setDueDateString('')
        setDescription('')
    };

    return (
        <div className="task-input">
            <div className="task-input-header">
                <h2 className="task-input-header-text">To Do</h2>
                <span className="task-input-header-count">{overdueTasks.length + outstandingTasks.length}</span>
            </div>
            <form className="task-input" onSubmit={handleSubmit}>
                <div className="input-top-row">
                    <input className="task-name-input" id="name" type="text" placeholder="Task Name*" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input className="due-date-input" id="dueDateString" type="date" placeholder="mm/dd/yyyy" value={dueDateString} onChange={(e) => setDueDateString(e.target.value)} required />
                    <button className="add-button" type="submit">+ Add</button>
                    <textarea className="description-input" id="description" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </form>
        </div>
    );
};

export default TaskInput;
