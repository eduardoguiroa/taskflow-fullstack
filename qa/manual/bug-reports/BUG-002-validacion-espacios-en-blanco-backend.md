# 🐞 Reporte de Defecto: BUG-002

| Identificador | Severidad | Prioridad | Estado | Versión Detectada |
|---|---|---|---|---|
| **BUG-002** | **Alta (Major)** | **Alta** | **CERRADO (CLOSED)** | v0.3.0-alpha |

---

## 1. Título del Defecto
Inserción permitida de tareas con títulos compuestos exclusivamente de caracteres de espacio en blanco cuando se omitía la validación en la capa de base de datos.

---

## 2. Descripción General
Durante las pruebas de robustez de la API REST (`POST /api/tasks`), se identificó que al enviar un payload JSON con un título con espacios (`"title": "     "`), si bien `@NotBlank` en Java lo detecta, si una petición o script SQL directo omitía la validación de la aplicación, la base de datos permitía almacenar registros vacíos, creando tarjetas invisibles en la interfaz de usuario.

---

## 3. Pasos para Reproducir
1. Enviar una petición HTTP POST directa con Postman / cURL al endpoint `/api/tasks`:
   ```bash
   curl -X POST http://localhost:8080/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"   ","priority":"LOW","status":"PENDING"}'
   ```
2. Inspeccionar la respuesta y el estado de la tabla en base de datos.

---

## 4. Resultado Esperado vs. Obtenido
* **Resultado Esperado:** La solicitud debe ser rechazada con código `400 Bad Request` y un mensaje claro (`"El título de la tarea es obligatorio"`). Adicionalmente, la base de datos debe tener una restricción a nivel DDL que rechace cadenas vacías con espacios (`CHECK (length(trim(title)) > 0)`).
* **Resultado Obtenido:** El backend rechazaba el request pero la tabla `tasks` en el esquema preliminar solo tenía `NOT NULL`, lo que permitía que conexiones directas o migraciones insertaran strings vacíos.

---

## 5. Causa Raíz y Solución Aplicada
* **Causa Raíz:** Falta de una restricción de integridad a nivel motor relacional (`CHECK constraint`) y falta de sanitización con `.trim()` explícito en el servicio.
* **Acción Correctiva:**
  1. En [`database/schema.sql`](file:///D:/task.portafoli0/taskflow-fullstack/database/schema.sql): Se añadió `CONSTRAINT chk_task_title_not_empty CHECK (length(trim(title)) > 0)`.
  2. En [`backend/src/main/java/com/taskflow/service/impl/TaskServiceImpl.java`](file:///D:/task.portafoli0/taskflow-fullstack/backend/src/main/java/com/taskflow/service/impl/TaskServiceImpl.java): Se aplicó `.trim()` tanto al crear como al actualizar tareas.
* **Resultado del Re-test:** Verificado con el caso **CP-003**. Entrada rechazada tanto en frontend, capa de servicio y motor PostgreSQL con código de error explicativo.
