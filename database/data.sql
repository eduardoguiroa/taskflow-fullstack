-- =============================================================================
-- TaskFlow Seed Data (PostgreSQL)
-- Descripción: Datos iniciales de prueba para validar el sistema y su dashboard.
-- =============================================================================

INSERT INTO tasks (title, description, priority, status) VALUES
(
    'Configurar entorno de desarrollo local',
    'Verificar instalación de PostgreSQL, JDK 21+ y Node.js para el monorepo.',
    'HIGH',
    'COMPLETED'
),
(
    'Diseñar esquema relacional y restricciones',
    'Crear script DDL con validaciones CHECK para estados y prioridades en PostgreSQL.',
    'HIGH',
    'COMPLETED'
),
(
    'Construir API REST con Spring Boot',
    'Implementar controladores, servicios y repositorios JPA para las operaciones CRUD.',
    'HIGH',
    'IN_PROGRESS'
),
(
    'Diseñar componentes visuales en React',
    'Maquetar Dashboard de métricas, formulario reactivo y listado con filtros en tiempo real.',
    'MEDIUM',
    'IN_PROGRESS'
),
(
    'Redactar casos de prueba funcionales en QA',
    'Definir matriz de pruebas manuales con caminos felices, valores límite y validaciones negativas.',
    'MEDIUM',
    'PENDING'
),
(
    'Automatizar pruebas E2E con Playwright',
    'Crear scripts automatizados para el flujo completo de creación, edición y eliminación de tareas.',
    'LOW',
    'PENDING'
);
