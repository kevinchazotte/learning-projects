import './TaskSection.css';

import TaskItem from './../TaskItem/TaskItem';
import { Task } from './../Task';

interface TaskSectionProps {
    title: string;
    tasks: Task[];
    onToggle: (id: number) => void;
    isOverdue: boolean;
}

const TaskSection: React.FC<TaskSectionProps> = ({ title, tasks, onToggle, isOverdue }) => {
    return (
        <div className="task-section">
            <div className="task-section-header">
                <h3 className="task-section-header-text">{title}</h3>
                <span className="task-section-header-count">{tasks.length}</span>
            </div>
            <div>
                {tasks.map(task => {
                    return (
                        <TaskItem key={task.id} task={task} onToggle={onToggle} isOverdue={isOverdue}/>
                    )
                })}
            </div>
        </div>
    );
};

export default TaskSection;
