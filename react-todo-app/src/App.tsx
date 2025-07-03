import './Styles/main.css'
import TaskInput from './components/TaskInput/TaskInput'
import TaskManagement from './components/TaskManagement/TaskManagement'

function App() {
  return (
    <div className="app-display-container">
      <div className="task-layout-container">
        <TaskInput />
        <TaskManagement />
      </div>
    </div>
  );
}

export default App;
