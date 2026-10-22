import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';

export default function Navbar({ onOpenNewTask }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">
          <CheckSquare size={26} strokeWidth={2.5} />
        </div>
        <div>
          <span className="brand-title">TaskFlow</span>
          <span className="brand-badge">Full Stack</span>
        </div>
      </div>
      <button 
        className="btn btn-primary" 
        onClick={onOpenNewTask}
        id="btn-new-task"
      >
        <Plus size={18} />
        <span>Nueva Tarea</span>
      </button>
    </header>
  );
}
