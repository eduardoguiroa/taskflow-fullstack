# 📮 Pruebas de API Automatizadas — Postman & Newman

Colección de pruebas para la API REST de TaskFlow diseñada para ejecutarse tanto en la interfaz gráfica de **Postman** como de forma desatendida en consola con **Newman**.

---

## 🧪 Casos de Prueba Automatizados en la Colección
1. **GET `/api/tasks/metrics`**: Comprueba status `200 OK` y presencia de las 4 métricas (`total`, `pending`, `inProgress`, `completed`).
2. **POST `/api/tasks` (Happy Path)**: Crea una tarea, valida código `201 Created`, extrae el `id` dinámicamente y lo almacena en variable de entorno.
3. **GET `/api/tasks/:id`**: Comprueba recuperación exitosa del recurso creado (`200 OK`).
4. **PUT `/api/tasks/:id`**: Actualiza el estado a `IN_PROGRESS` y valida respuesta (`200 OK`).
5. **GET `/api/tasks?status=IN_PROGRESS`**: Valida que el filtro devuelva exclusivamente tareas con estado solicitado.
6. **POST `/api/tasks` (Prueba Negativa)**: Envía título vacío y comprueba código `400 Bad Request` y error en `validationErrors.title`.
7. **DELETE `/api/tasks/:id`**: Elimina la tarea y comprueba código `204 No Content`.
8. **GET `/api/tasks/:id` (Post-eliminación)**: Comprueba que el recurso ya no exista (`404 Not Found`).

---

## 🚀 Ejecución con Newman (Línea de Comandos)

Con el backend en ejecución (`http://localhost:8080`), ejecuta desde la raíz del repositorio:

```bash
npx newman run qa/automation/postman/taskflow-api.postman_collection.json -e qa/automation/postman/taskflow-local.postman_environment.json
```

Para generar un reporte HTML ejecutable en CI:
```bash
npx newman run qa/automation/postman/taskflow-api.postman_collection.json -e qa/automation/postman/taskflow-local.postman_environment.json -r cli,htmlextra
```
