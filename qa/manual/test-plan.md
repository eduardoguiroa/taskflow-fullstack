# 📋 Plan de Pruebas Manuales (Master Test Plan) — TaskFlow

| Documento | Versión | Estado | Autor | Fecha |
|---|---|---|---|---|
| Plan Maestro de Calidad | 1.0.0 | Aprobado | QA Lead / Tester | 2026-10-22 |

---

## 1. Introducción y Objetivos
El presente plan establece la estrategia, alcance, recursos y criterios de calidad para la validación manual funcional y de experiencia de usuario (UX) de **TaskFlow Full Stack**.

### Objetivos Específicos:
1. Validar que todas las operaciones CRUD sobre la entidad `Task` funcionen con persistencia íntegra en PostgreSQL.
2. Comprobar la integridad de los datos tanto en validaciones del cliente (React) como en el servidor (Spring Boot Bean Validation).
3. Asegurar la precisión de las métricas en tiempo real del Dashboard (Total, Pendientes, En Progreso, Completadas).
4. Verificar la usabilidad, tiempos de respuesta perceptibles y retroalimentación al usuario (toasts, modales de confirmación y estados vacíos).

---

## 2. Alcance de las Pruebas

### 2.1. Funcionalidades en Alcance (In Scope)
* **Gestión de Tareas (CRUD)**:
  * Creación de tareas con datos válidos.
  * Edición de tareas existentes (título, descripción, prioridad, estado).
  * Eliminación de tareas con modal de confirmación obligatoria.
  * Transición rápida de estados desde la tarjeta de tarea.
* **Filtros y Búsqueda**:
  * Búsqueda dinámica con debounce por texto en título y descripción.
  * Filtrado individual y combinado por Estado (`PENDING`, `IN_PROGRESS`, `COMPLETED`).
  * Filtrado individual y combinado por Prioridad (`LOW`, `MEDIUM`, `HIGH`).
  * Función de restablecimiento de filtros.
* **Dashboard y Métricas**:
  * Conteo exacto en tarjetas métricas y actualización inmediata tras mutaciones.
* **Validación y Manejo de Errores**:
  * Título vacío, espacios en blanco y límite de 100 caracteres.
  * Respuesta y presentación de errores 400 Bad Request y 404 Not Found.
* **Persistencia**:
  * Integridad de los datos tras refresco del navegador (F5).

### 2.2. Fuera de Alcance (Out of Scope en v1.0)
* Flujos de autenticación y autorización (login, registro, tokens JWT).
* Roles de usuario y permisos multi-inquilino (multi-tenant).
* Notificaciones por correo electrónico o web push.

---

## 3. Estrategia y Tipos de Pruebas

| Tipo de Prueba | Objetivo | Metodología |
|---|---|---|
| **Funcional (Caja Negra)** | Validar entradas, salidas y reglas de negocio contra los requerimientos funcionales. | Ejecución paso a paso de matrices de casos de prueba. |
| **Pruebas Negativas** | Verificar la robustez del sistema ante datos inválidos o maliciosos. | Inyección de strings vacíos, exceso de caracteres, caracteres especiales. |
| **Pruebas de Valores Límite** | Validar comportamientos en los bordes de los campos (longitud 0, 1, 99, 100, 101). | Partición equivalente y análisis de valores límite (BVA). |
| **Pruebas de Usabilidad / UI** | Evaluar la claridad de los textos, contraste, visibilidad de los estados y toasts. | Inspección heurística y validación en navegadores Chromium y Firefox. |
| **Pruebas de Regresión** | Garantizar que las correcciones de bugs no introduzcan nuevos defectos. | Re-ejecución de la suite completa tras cada corrección. |

---

## 4. Entorno de Pruebas

* **Cliente**: Google Chrome (v130+), Mozilla Firefox (v131+), Microsoft Edge.
* **Resoluciones**: 1920x1080 (Desktop), 1366x768 (Laptop), 768x1024 (Tablet responsive).
* **Frontend Local**: `http://localhost:5173` (React 18 + Vite).
* **Backend Local**: `http://localhost:8080` (Spring Boot 4 / Java 23).
* **Base de Datos**: PostgreSQL 17 (`taskflow_db`).

---

## 5. Criterios de Aceptación (Entrada y Salida)

### Criterios de Entrada (Entry Criteria):
- [x] Repositorio clonado y dependencias instaladas (`mvnw` y `npm`).
- [x] Base de datos `taskflow_db` creada y esquema DDL aplicado sin errores.
- [x] Backend y frontend inician sin excepciones en consola.

### Criterios de Salida (Exit Criteria):
- [ ] 100% de los casos de prueba ejecutados y documentados.
- [ ] 0 defectos de severidad **Crítica** o **Alta** abiertos.
- [ ] Al menos el 95% de los casos de prueba con estado **PASS**.
- [ ] Todos los defectos reportados cuentan con pasos de reproducción y evidencia.

---

## 6. Clasificación de Severidad de Defectos

| Nivel | Definición | Ejemplo |
|---|---|---|
| **Crítica (Blocker)** | El sistema se bloquea, causa pérdida de datos o impide el uso de la aplicación. | Fallo total en la API al guardar cualquier tarea; crash de React en blanco. |
| **Alta (Major)** | Una funcionalidad principal no opera y no existe alternativa inmediata. | El filtro de tareas no responde o el botón de eliminar no borra el registro en la BD. |
| **Media (Minor)** | Funcionalidad opera pero con comportamiento incorrecto que no bloquea el flujo principal. | Toasts no desaparecen automáticamente; error de formato en fechas. |
| **Baja (Trivial)** | Defectos estéticos, desalineaciones leves o errores ortográficos en etiquetas. | Margen desalineado en 2px en el badge de prioridad. |
