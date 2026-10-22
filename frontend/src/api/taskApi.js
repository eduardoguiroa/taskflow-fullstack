const API_BASE_URL = '/api/tasks';

export const taskApi = {
  /**
   * Obtiene la lista de tareas con filtros opcionales.
   */
  async getTasks({ status, priority, search } = {}) {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (priority) params.append('priority', priority);
    if (search && search.trim()) params.append('search', search.trim());

    const url = params.toString() ? `${API_BASE_URL}?${params.toString()}` : API_BASE_URL;
    const response = await fetch(url);
    if (!response.ok) {
      throw await this.handleErrorResponse(response);
    }
    return response.json();
  },

  /**
   * Obtiene las métricas agregadas del dashboard.
   */
  async getMetrics() {
    const response = await fetch(`${API_BASE_URL}/metrics`);
    if (!response.ok) {
      throw await this.handleErrorResponse(response);
    }
    return response.json();
  },

  /**
   * Obtiene el detalle de una tarea por su ID.
   */
  async getTaskById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw await this.handleErrorResponse(response);
    }
    return response.json();
  },

  /**
   * Crea una nueva tarea.
   */
  async createTask(taskData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw await this.handleErrorResponse(response);
    }
    return response.json();
  },

  /**
   * Actualiza una tarea existente.
   */
  async updateTask(id, taskData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw await this.handleErrorResponse(response);
    }
    return response.json();
  },

  /**
   * Elimina una tarea por su ID.
   */
  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok && response.status !== 204) {
      throw await this.handleErrorResponse(response);
    }
    return true;
  },

  /**
   * Procesa la respuesta de error de Spring Boot.
   */
  async handleErrorResponse(response) {
    try {
      const errorJson = await response.json();
      const message = errorJson.message || 'Error en el servidor';
      const details = errorJson.validationErrors
        ? Object.values(errorJson.validationErrors).join(', ')
        : null;
      const error = new Error(details ? `${message}: ${details}` : message);
      error.status = response.status;
      error.data = errorJson;
      return error;
    } catch {
      const error = new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      error.status = response.status;
      return error;
    }
  },
};
