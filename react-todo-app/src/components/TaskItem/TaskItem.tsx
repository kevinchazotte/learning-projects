import './TaskItem.css';

import Checkbox from './../Checkbox/Checkbox';
import { Task } from './../Task';

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    isOverdue: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, isOverdue }) => {
    const formatDate = (date: string) => {
        const dueDate = new Date(date);
        return dueDate.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    };

    return (
        <div className="task-item">
            <div className="task-content">
                <div className="task-checkbox">
                    <Checkbox checked={task.completed} onChange={() => onToggle(task.id)}/>
                    <span>{task.taskName}</span>
                </div>
                {task.description && (
                    <div className="task-description">
                        {task.description}
                    </div>
                )}
            </div>
            <div className={`task-due-date${isOverdue ? ' overdue' : ''}`}>{formatDate(task.dueDate)}</div>
        </div>
    );
};

export default TaskItem;
