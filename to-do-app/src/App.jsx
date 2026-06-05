import { useState } from 'react';
import TodoApp from './components/TodoApp';
import NotesApp from './components/NotesApp';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('todo');

  return (
    <div className="app-container">
      <header className="header">
        <h1>UNLOX Workspace</h1>
      </header>

      <div className="nav-tabs">
        <button 
          className={activeTab === 'todo' ? 'active' : ''} 
          onClick={() => setActiveTab('todo')}
        >
          To-Do List
        </button>
        <button 
          className={activeTab === 'notes' ? 'active' : ''} 
          onClick={() => setActiveTab('notes')}
        >
          Notes App
        </button>
      </div>

      <main>
        {activeTab === 'todo' ? <TodoApp /> : <NotesApp />}
      </main>
    </div>
  );
}

export default App;