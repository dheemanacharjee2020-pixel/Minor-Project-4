import { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  const saveNote = () => {
    if (title.trim() === '' || content.trim() === '') return;

    if (editingId !== null) {
      // Edit existing note
      setNotes(notes.map(note => 
        note.id === editingId ? { ...note, title, content } : note
      ));
      setEditingId(null);
    } else {
      // Add new note
      setNotes([...notes, { id: Date.now(), title, content }]);
    }
    
    setTitle('');
    setContent('');
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div>
      <h2>{editingId ? "Edit Note" : "Create Note"}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Note Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Write your note here..." 
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn-primary" onClick={saveNote}>
          {editingId ? "Update Note" : "Save Note"}
        </button>
      </div>

      <div className="item-list">
        {notes.map(note => (
          <div key={note.id} className="card" style={{ alignItems: 'flex-start' }}>
            <div className="card-content">
              <h3 style={{ margin: 0, color: 'var(--cr-orange)' }}>{note.title}</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>{note.content}</p>
            </div>
            <div className="card-actions">
              <button className="icon-btn" onClick={() => editNote(note)}>
                <Edit size={20} />
              </button>
              <button className="icon-btn" onClick={() => deleteNote(note.id)}>
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {notes.length === 0 && <p style={{color: 'var(--text-muted)'}}>No notes available. Create one above!</p>}
      </div>
    </div>
  );
};

export default NotesApp;