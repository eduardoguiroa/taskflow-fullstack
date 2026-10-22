import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';

export default function EmptyState({ isFiltered, onOpenNewTask, onResetFilters }) {
  return (
    <div className="empty-state">
      <ClipboardList size={48} className="empty-icon" />
      <h3 className="empty-title">
        {isFiltered ? 'No se encontraron tareas coincidentes' : 'Aún no tienes tareas registradas'}
      </h3>
      <p className="empty-description">
        {isFiltered
          ? 'Prueba modificando tus términos de búsqueda o limpiando los filtros seleccionados.'
          : 'Comienza organizando tus actividades creando tu primera tarea en TaskFlow.'}
      </p>

      {isFiltered ? (
        <button className="btn btn-secondary" onClick={onResetFilters}>
          Restablecer Filtros
        </button>
      ) : (
        <button className="btn btn-primary" onClick={onOpenNewTask}>
          <Plus size={16} />
          <span>Crear mi primera tarea</span>
        </button>
      )}
    </div>
  );
}
