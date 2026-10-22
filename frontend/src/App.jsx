import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import MetricsGrid from './components/MetricsGrid';
import FilterBar from './components/FilterBar';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import { taskApi } from './api/taskApi';
import { Loader2, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [metrics, setMetrics] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteState, setDeleteState] = useState({ isOpen: false, task: null, isDeleting: false });

  // Toasts state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedTasks, fetchedMetrics] = await Promise.all([
        taskApi.getTasks({
          status: statusFilter || null,
          priority: priorityFilter || null,
          search: search || null,
        }),
        taskApi.getMetrics(),
      ]);
      setTasks(fetchedTasks);
      setMetrics(fetchedMetrics);
    } catch (error) {
      addToast(error.message || 'Error al conectar con el servidor', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter, priorityFilter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      loadData();
    }, 250); // Debounce de búsqueda

    return () => clearTimeout(handler);
  }, [loadData]);

  // Manejadores CRUD
  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      await taskApi.updateTask(editingTask.id, taskData);
      addToast('Tarea actualizada correctamente');
    } else {
      await taskApi.createTask(taskData);
      addToast('Tarea creada exitosamente');
    }
    await loadData();
  };

  const handleQuickStatusChange = async (task, newStatus) => {
    try {
      await taskApi.updateTask(task.id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: newStatus,
      });
      addToast(`Estado cambiado a ${newStatus}`, 'info');
      await loadData();
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const handleOpenDelete = (task) => {
    setDeleteState({ isOpen: true, task, isDeleting: false });
  };

  const handleConfirmDelete = async (taskId) => {
    setDeleteState((prev) => ({ ...prev, isDeleting: true }));
    try {
      await taskApi.deleteTask(taskId);
      addToast('Tarea eliminada correctamente');
      setDeleteState({ isOpen: false, task: null, isDeleting: false });
      await loadData();
    } catch (error) {
      addToast(error.message, 'error');
      setDeleteState((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('');
    setPriorityFilter('');
  };

  const isFiltered = Boolean(search || statusFilter || priorityFilter);

  return (
    <div className="app-container">
      <Navbar onOpenNewTask={handleOpenNewTask} />

      <MetricsGrid metrics={metrics} />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        onResetFilters={handleResetFilters}
      />

      {isLoading ? (
        <div className="loading-wrapper">
          <Loader2 size={32} className="spinner" />
          <span>Cargando tareas de TaskFlow...</span>
        </div>
      ) : tasks.length > 0 ? (
        <section className="tasks-grid" aria-label="Listado de tareas">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleOpenEditTask}
              onDelete={handleOpenDelete}
              onStatusChange={handleQuickStatusChange}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          isFiltered={isFiltered}
          onOpenNewTask={handleOpenNewTask}
          onResetFilters={handleResetFilters}
        />
      )}

      {/* Modal de Crear / Editar */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Modal de Confirmación de Eliminación */}
      <DeleteConfirmModal
        isOpen={deleteState.isOpen}
        task={deleteState.task}
        isDeleting={deleteState.isDeleting}
        onClose={() => setDeleteState({ isOpen: false, task: null, isDeleting: false })}
        onConfirm={handleConfirmDelete}
      />

      {/* Toasts de Feedback */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === 'success' && <CheckCircle2 size={18} color="var(--success)" />}
            {toast.type === 'error' && <AlertCircle size={18} color="var(--danger)" />}
            {toast.type === 'info' && <Info size={18} color="var(--primary)" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
