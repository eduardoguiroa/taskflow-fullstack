-- =============================================================================
-- TaskFlow Database Schema (PostgreSQL)
-- Descripción: Definición de la estructura de datos relacional para TaskFlow.
-- =============================================================================

-- 1. Limpieza preventiva (opcional en desarrollo)
DROP TABLE IF EXISTS tasks CASCADE;
DROP FUNCTION IF EXISTS update_task_updated_at CASCADE;

-- 2. Tabla Principal: tasks
CREATE TABLE tasks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    priority VARCHAR(10) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Restricciones de integridad (Check Constraints)
    CONSTRAINT chk_task_title_not_empty CHECK (length(trim(title)) > 0),
    CONSTRAINT chk_task_priority CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    CONSTRAINT chk_task_status CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED'))
);

-- 3. Índices para optimizar búsquedas y métricas en el Dashboard
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);

-- 4. Función y Trigger para actualización automática de 'updated_at'
CREATE OR REPLACE FUNCTION update_task_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_task_updated_at();

-- Comentarios explicativos para documentación en PostgreSQL
COMMENT ON TABLE tasks IS 'Almacena el registro principal de tareas de TaskFlow';
COMMENT ON COLUMN tasks.id IS 'Identificador único incremental de la tarea';
COMMENT ON COLUMN tasks.title IS 'Título corto obligatorio de la actividad (1-100 caracteres)';
COMMENT ON COLUMN tasks.description IS 'Detalles ampliados o notas sobre la tarea';
COMMENT ON COLUMN tasks.priority IS 'Prioridad de atención: LOW, MEDIUM o HIGH';
COMMENT ON COLUMN tasks.status IS 'Estado del ciclo de vida: PENDING, IN_PROGRESS o COMPLETED';
COMMENT ON COLUMN tasks.created_at IS 'Fecha y hora con zona horaria de creación del registro';
COMMENT ON COLUMN tasks.updated_at IS 'Fecha y hora con zona horaria de la última modificación';
