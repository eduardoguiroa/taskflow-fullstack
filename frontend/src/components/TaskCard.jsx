import React from 'react';
import { Edit2, Trash2, CheckCircle2, Clock, Flame, ArrowUpRight } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const getStatusLabel = (status) => {
    switch (status) {
      case 'PENDING': return 'Pendiente';
      case 'IN_PROGRESS': return 'En Progreso';
      case 'COMPLETED': return 'Completada';
      default: return status;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'LOW': return 'Baja';
      case 'MEDIUM': return 'Media';
      case 'HIGH': return 'Alta';
      default: return priority;
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleNextStatus = () => {
    if (task.status === 'PENDING') onStatusChange(task, 'IN_PROGRESS');
    else if (task.status === 'IN_PROGRESS') onStatusChange(task, 'COMPLETED');
    else onStatusChange(task, 'PENDING');
  };

  return (
    <article className={`task-card ${task.status === 'COMPLETED' ? 'completed' : ''}`} id={`task-card-${task.id}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-badges">
        <span className={`badge badge-status-${task.status.toLowerCase()}`}>
          {task.status === 'PENDING' && <Clock size={12} />}
          {task.status === 'IN_PROGRESS' && <Flame size={12} />}
          {task.status === 'COMPLETED' && <CheckCircle2 size={12} />}
          {getStatusLabel(task.status)}
        </span>

        <span className={`badge badge-priority-${task.priority.toLowerCase()}`}>
          <ArrowUpRight size={12} />
          Prioridad {getPriorityLabel(task.priority)}
        </span>
      </div>

      <div className="task-footer">
        <span className="task-date">Creada: {formatDate(task.createdAt)}</span>
        
        <div className="task-actions">
          <button
            className="btn btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
            onClick={handleNextStatus}
            title="Cambiar estado secuencial"
            id={`btn-status-${task.id}`}
          >
            {task.status === 'PENDING' && 'Iniciar ▶'}
            {task.status === 'IN_PROGRESS' && 'Completar ✔'}
            {task.status === 'COMPLETED' && 'Reabrir ↺'}
          </button>

          <button
            className="btn-icon"
            onClick={() => onEdit(task)}
            title="Editar tarea"
            id={`btn-edit-${task.id}`}
          >
            <Edit2 size={16} />
          </button>

          <button
            className="btn-icon delete"
            onClick={() => onDelete(task)}
            title="Eliminar tarea"
            id={`btn-delete-${task.id}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
