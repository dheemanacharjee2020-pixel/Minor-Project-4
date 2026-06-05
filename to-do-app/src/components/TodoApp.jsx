import { useState } from 'react';
import { Trash2, CheckCircle } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button className="btn-primary" onClick={addTask}>Add</button>
      </div>

      <div className="item-list">
        {tasks.map(task => (
          <div key={task.id} className="card">
            <span className={task.completed ? "completed-text" : ""}>
              {task.text}
            </span>
            <div className="card-actions">
              <button className="icon-btn" onClick={() => toggleComplete(task.id)}>
                <CheckCircle size={20} color={task.completed ? "#F47521" : "currentColor"} />
              </button>
              <button className="icon-btn" onClick={() => deleteTask(task.id)}>
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p style={{color: 'var(--text-muted)'}}>No tasks yet. Get started!</p>}
      </div>
    </div>
  );
};

export default TodoApp;