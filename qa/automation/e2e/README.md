# 🎭 Pruebas End-to-End (E2E) con Playwright — TaskFlow

Suite de pruebas automatizadas en el navegador utilizando **Playwright**, diseñada para validar los flujos de usuario reales de TaskFlow de punta a punta.

---

## 🧪 Casos de Prueba E2E Automatizados

1. **TC-E2E-01**: Carga inicial del Dashboard, Navbar y 4 tarjetas de métricas en tiempo real.
2. **TC-E2E-02**: Validación negativa en cliente: rechazo de formulario con título vacío y despliegue de mensaje de error.
3. **TC-E2E-03**: Flujo de usuario completo:
   - Apertura de modal y registro de tarea con título único.
   - Verificación de aparición en el grid y badges de prioridad y estado.
   - Búsqueda textual reactiva.
   - Transición de estado (`Iniciar ▶` ➔ `En Progreso`).
   - Apertura de modal de confirmación de eliminación y borrado permanente.
4. **TC-E2E-04**: Búsqueda sin coincidencias y visualización del componente `EmptyState` con botón para restablecer filtros.

---

## 🚀 Instalación y Ejecución

### 1. Precondiciones
El backend y el frontend deben estar en ejecución:
* Backend: `http://localhost:8080` (`./mvnw.cmd spring-boot:run` en `backend/`)
* Frontend: `http://localhost:5173` (`npm run dev` en `frontend/`)

### 2. Instalar dependencias de Playwright
Desde el directorio `qa/automation/e2e/`:
```bash
npm install
npx playwright install chromium
```

### 3. Ejecutar las pruebas
* **Modo Headless (consola)**:
  ```bash
  npm test
  ```
* **Modo Interactivo (UI Mode)**:
  ```bash
  npm run test:ui
  ```
* **Modo Visual (Headed - con ventana de navegador abierta)**:
  ```bash
  npm run test:headed
  ```
* **Ver Reporte HTML**:
  ```bash
  npm run report
  ```
