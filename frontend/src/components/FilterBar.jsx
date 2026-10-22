import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export default function FilterBar({ 
  search, 
  onSearchChange, 
  statusFilter, 
  onStatusChange, 
  priorityFilter, 
  onPriorityChange,
  onResetFilters
}) {
  const hasActiveFilters = search || statusFilter || priorityFilter;

  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar tareas por título o descripción..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          id="search-tasks"
        />
      </div>

      <select
        className="select-filter"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        id="filter-status"
      >
        <option value="">Todos los Estados</option>
        <option value="PENDING">Pendiente</option>
        <option value="IN_PROGRESS">En Progreso</option>
        <option value="COMPLETED">Completada</option>
      </select>

      <select
        className="select-filter"
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        id="filter-priority"
      >
        <option value="">Todas las Prioridades</option>
        <option value="LOW">Baja</option>
        <option value="MEDIUM">Media</option>
        <option value="HIGH">Alta</option>
      </select>

      {hasActiveFilters && (
        <button
          className="btn btn-secondary"
          onClick={onResetFilters}
          title="Limpiar filtros"
          id="btn-reset-filters"
        >
          <RotateCcw size={16} />
          <span>Limpiar</span>
        </button>
      )}
    </div>
  );
}
