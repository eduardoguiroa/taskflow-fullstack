# 🐞 Reporte de Defecto: BUG-001

| Identificador | Severidad | Prioridad | Estado | Versión Detectada |
|---|---|---|---|---|
| **BUG-001** | **Media (Minor)** | **Media** | **CERRADO (CLOSED)** | v0.4.0-alpha |

---

## 1. Título del Defecto
Desbordamiento horizontal del contenedor de tarjeta al ingresar títulos con palabras continuas sin espacios (ej. URLs largas o identificadores técnicos).

---

## 2. Descripción General
Al registrar una tarea cuyo título o descripción contiene una cadena de texto continua sin espacios (por ejemplo: `https://github.com/usuario/taskflow-fullstack/actions/runs/1234567890/job/0987654321`), el texto sobrepasaba los límites del contenedor `.task-card`, provocando un scroll horizontal indeseado y rompiendo el grid visual en pantallas móviles y tablets.

---

## 3. Pasos para Reproducir
1. Abrir la aplicación web en `http://localhost:5173`.
2. Hacer clic en el botón "+ Nueva Tarea".
3. En el campo "Título", pegar la cadena:  
   `SUPER_LONG_UNBROKEN_STRING_IDENTIFIER_TASKFLOW_SYSTEM_MODULE_PROCESSOR_TEST_VERIFICATION_CHECK`
4. Hacer clic en "Crear Tarea".
5. Observar la tarjeta generada en el listado principal.

---

## 4. Resultado Esperado vs. Obtenido
* **Resultado Esperado:** El texto largo debe ajustarse automáticamente al ancho disponible de la tarjeta mediante un salto de línea forzado (`word-break`).
* **Resultado Obtenido:** El texto sobresale del borde derecho de la tarjeta (`overflow`), tapando los márgenes del grid y obligando a hacer scroll horizontal.

---

## 5. Evidencia Técnica
* **Elemento Afectado:** `.task-card .task-title`, `.task-card .task-description`
* **Estilos Faltantes:** Propiedad de salto de línea CSS en strings sin espacios delimitadores.

---

## 6. Causa Raíz y Solución Aplicada
* **Causa Raíz:** Las reglas CSS por defecto no parten palabras continuas si no se define explícitamente la regla de ruptura.
* **Acción Correctiva:** En [`frontend/src/styles/main.css`](file:///D:/task.portafoli0/taskflow-fullstack/frontend/src/styles/main.css), se agregaron las propiedades `word-break: break-word` y `overflow-wrap: anywhere` en `.task-title` y `.task-description`.
* **Resultado del Re-test:** Verificado exitosamente en resolución móvil (375px) y de escritorio (1920px). Título ajustado al ancho de columna sin desbordamiento.
