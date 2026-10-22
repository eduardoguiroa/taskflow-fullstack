# 🏛️ Documento de Arquitectura del Sistema — TaskFlow

Este documento describe la arquitectura global, patrones de diseño y flujo de datos de **TaskFlow**, concebido bajo principios de diseño limpio, bajo acoplamiento y alta cohesión.

---

## 1. Diagrama de Contenedores (C4 Model)

```mermaid
graph TD
    subgraph Browser ["Navegador Web del Cliente"]
        User(["👤 Usuario"]) -->|Interacción UI / DOM| SPA["React SPA (Vite)<br>Puerto: 5173"]
    end

    subgraph BackendApp ["Servidor de Aplicaciones"]
        SPA -->|HTTPS / JSON REST API| RestAPI["Spring Boot API REST<br>Puerto: 8080"]
        RestAPI -->|Inyección de Dependencias| Controller["TaskController"]
        Controller -->|DTOs inmutables| Service["TaskService & Impl"]
        Service -->|Entidades JPA| Repo["TaskRepository (Data JPA)"]
        Controller -.-> ExceptionHandler["GlobalExceptionHandler (@RestControllerAdvice)"]
    end

    subgraph DataStore ["Capa de Datos"]
        Repo -->|JDBC / SQL Nativo| Postgres[("PostgreSQL 15+<br>BD: taskflow_db<br>Puerto: 5432")]
        Postgres -->|Trigger PL/pgSQL| Trg["trg_tasks_updated_at"]
    end

    subgraph QualityAssurance ["Aseguramiento de Calidad (QA)"]
        JUnit["JUnit 5 + Mockito"] -.->|Pruebas Unitarias & WebMvc| BackendApp
        Newman["Postman / Newman CLI"] -.->|Pruebas de Contrato API| RestAPI
        Playwright["Playwright E2E"] -.->|Automatización de Navegador| SPA
    end
```

---

## 2. Diagrama de Secuencia: Flujo de Creación de Tarea

El siguiente diagrama detalla la interacción paso a paso cuando un usuario registra una nueva tarea:

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant React as Frontend (React UI)
    participant Spring as Backend (TaskController)
    participant Service as TaskService
    participant Repo as TaskRepository
    participant DB as PostgreSQL (taskflow_db)

    Usuario->>React: Completa formulario y hace clic en "Crear Tarea"
    React->>React: Valida campos en cliente (título no vacío, max 100 car.)
    alt Validación en cliente falla
        React-->>Usuario: Despliega mensaje inline de error sin petición HTTP
    else Validación en cliente exitosa
        React->>Spring: POST /api/tasks (JSON Payload con TaskRequestDTO)
        Spring->>Spring: Bean Validation (@Valid): Verifica @NotBlank y @Size
        alt Validación en servidor falla
            Spring-->>React: 400 Bad Request (JSON con ErrorResponseDTO)
            React-->>Usuario: Despliega Toast/Error con campo rechazado
        else Validación en servidor exitosa
            Spring->>Service: createTask(requestDTO)
            Service->>Service: Aplica .trim() y mapea a Entidad Task
            Service->>Repo: save(task)
            Repo->>DB: INSERT INTO tasks (title, description, priority, status)
            DB->>DB: Dispara trigger trg_tasks_updated_at y asigna ID auto-incremental
            DB-->>Repo: Registro persistido con ID y timestamps
            Repo-->>Service: Entidad Task guardada
            Service->>Service: Mapea a TaskResponseDTO
            Service-->>Spring: TaskResponseDTO
            Spring-->>React: 201 Created (JSON TaskResponseDTO)
            React->>React: Cierra modal, agrega toast de éxito y actualiza lista
            React-->>Usuario: Muestra nueva tarjeta en pantalla y actualiza métricas
        end
    end
```

---

## 3. Principios de Diseño Aplicados

### 3.1. Separación de Responsabilidades (SoC)
* **Frontend**: Únicamente gestiona presentación, estado local en UI, accesibilidad y experiencia de usuario.
* **Controlador REST**: Maneja peticiones HTTP, deserialización, códigos de estado y ruteo; no contiene lógica de negocio ni persistencia.
* **Servicio**: Contiene todas las reglas de negocio, validaciones cruzadas, transaccionalidad (`@Transactional`) y mapeos entre DTOs y entidades.
* **Repositorio**: Abstrae las operaciones de acceso a datos mediante Spring Data JPA.
* **Base de Datos**: Ejerce la última línea de defensa con restricciones `CHECK` nativas para evitar estados corruptos incluso ante inserciones SQL directas.

### 3.2. Manejo Centralizado de Excepciones
Mediante [`GlobalExceptionHandler`](../../backend/src/main/java/com/taskflow/exception/GlobalExceptionHandler.java) (`@RestControllerAdvice`), el servidor nunca devuelve stacktraces de Java al cliente. Todos los errores adoptan la estructura estándar:
```json
{
  "timestamp": "2026-10-22T12:00:00Z",
  "status": 400,
  "error": "Validation Failed",
  "message": "Uno o más campos enviados son inválidos",
  "path": "/api/tasks",
  "validationErrors": {
    "title": "El título de la tarea es obligatorio"
  }
}
```

### 3.3. Desacoplamiento de Entidades y DTOs
Los registros Java (`Records`) [`TaskRequestDTO`](../../backend/src/main/java/com/taskflow/dto/TaskRequestDTO.java) y [`TaskResponseDTO`](../../backend/src/main/java/com/taskflow/dto/TaskResponseDTO.java) garantizan inmutabilidad y previenen vulnerabilidades como *Over-Posting* o exposición innecesaria del modelo de persistencia.
