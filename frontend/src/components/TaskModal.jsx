import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, editingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [status, setStatus] = useState('PENDING');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'MEDIUM');
      setStatus(editingTask.status || 'PENDING');
    } else {
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      setStatus('PENDING');
    }
    setErrors({});
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'El título de la tarea es obligatorio.';
    } else if (title.trim().length > 100) {
      newErrors.title = 'El título no puede superar los 100 caracteres.';
    }

    if (!priority) {
      newErrors.priority = 'Debes seleccionar una prioridad.';
    }

    if (!status) {
      newErrors.status = 'Debes seleccionar un estado.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave({
        title: title.trim(),
        description: description.trim() || null,
        priority,
        status,
      });
      onClose();
    } catch (err) {
      setErrors({ form: err.message || 'Error al guardar la tarea' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
          </h2>
          <button className="btn-icon" onClick={onClose} aria-label="Cerrar modal">
            <X size={20} />
          </button>
        </div>

        {errors.form && (
          <div className="toast error" style={{ position: 'static', marginBottom: '16px' }}>
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="task-title-input">
              Título *
            </label>
            <input
              id="task-title-input"
              type="text"
              className="form-input"
              placeholder="Ej. Revisar arquitectura del backend"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="task-desc-input">
              Descripción
            </label>
            <textarea
              id="task-desc-input"
              className="form-textarea"
              placeholder="Detalles adicionales, requisitos o enlaces relevantes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="task-priority-select">
                Prioridad *
              </label>
              <select
                id="task-priority-select"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </select>
              {errors.priority && <p className="form-error">{errors.priority}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="task-status-select">
                Estado *
              </label>
              <select
                id="task-status-select"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="PENDING">Pendiente</option>
                <option value="IN_PROGRESS">En Progreso</option>
                <option value="COMPLETED">Completada</option>
              </select>
              {errors.status && <p className="form-error">{errors.status}</p>}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              id="btn-submit-task"
            >
              {isSubmitting ? 'Guardando...' : editingTask ? 'Actualizar' : 'Crear Tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
