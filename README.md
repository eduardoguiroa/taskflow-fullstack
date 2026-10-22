# 🚀 TaskFlow Full Stack

[![CI Pipeline](https://github.com/usuario/taskflow-fullstack/actions/workflows/ci.yml/badge.svg)](https://github.com/usuario/taskflow-fullstack/actions)
[![Java 21+](https://img.shields.io/badge/Java-21%2B%20%2F%2023-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.x%20%2F%203.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18%20%2F%2019-61dafb.svg)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B%20%2F%2017-blue.svg)](https://www.postgresql.org/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E%20Testing-green.svg)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **TaskFlow** es una aplicación web full-stack para la organización y seguimiento de actividades personales y profesionales, desarrollada dentro de un **único repositorio de GitHub** que integra de forma integral **Backend**, **Frontend**, **Base de Datos** y **Aseguramiento de Calidad (QA)**.

El propósito central de este proyecto no es crear otro gestor de tareas saturado de opciones, sino demostrar **excelencia en ingeniería de software**: cómo construir, estructurar, conectar y probar exhaustivamente un sistema desacoplado, modular y listo para producción.

---

## 🏛️ 1. Arquitectura del Sistema

```mermaid
graph TD
    User(["👤 Usuario"]) -->|Interacción en navegador| Frontend["🖥️ Frontend (React 18 + Vite)<br>Puerto: 5173"]
    Frontend -->|HTTP / JSON (REST API)| Backend["⚙️ Backend (Spring Boot 4 / Java 23)<br>Puerto: 8080"]
    Backend -->|Spring Data JPA / JDBC| Database[("🗄️ PostgreSQL (taskflow_db)<br>Puerto: 5432")]
    
    subgraph Calidad & CI
        JUnit["🧪 JUnit 5 + Mockito"] -.->|Unit & MockMvc Tests| Backend
        Postman["📮 Postman + Newman"] -.->|API Contract Tests| Backend
        Playwright["🎭 Playwright E2E"] -.->|Browser Automation| Frontend
        CI["⚙️ GitHub Actions CI"] -->|Build & Test Pipeline| Backend
        CI -->|Build & Test Pipeline| Frontend
    end
```

---

## 📁 2. Estructura del Repositorio

El proyecto sigue una arquitectura de monorepo donde cada carpeta tiene una responsabilidad única y claramente delimitada:

```text
taskflow-fullstack/
├── .github/workflows/          # Integración Continua (CI Pipeline con GitHub Actions)
├── backend/                    # API REST desarrollada en Java con Spring Boot
│   ├── src/main/java/          # Capas: Controller, Service, Repository, Model, DTO, Exception, Config
│   ├── src/test/java/          # Pruebas unitarias e integración (JUnit 5 + Mockito + H2)
│   ├── pom.xml                 # Configuración de dependencias Maven
│   └── README.md               # Documentación técnica de la API y endpoints
├── frontend/                   # Interfaz de usuario SPA desarrollada con React y Vite
│   ├── src/components/         # Navbar, MetricsGrid, FilterBar, TaskCard, TaskModal, etc.
│   ├── src/api/                # Cliente HTTP para consumo de endpoints REST
│   ├── src/styles/             # Estilos modulares CSS con tema oscuro (Slate theme)
│   └── README.md               # Documentación de la UI, componentes y scripts
├── database/                   # Modelado relacional en PostgreSQL
│   ├── schema.sql              # Definición DDL de tablas, índices, checks y triggers
│   ├── data.sql                # Datos iniciales (seeds) para validación inmediata
│   └── README.md               # Diccionario de datos y diagrama ERD
├── qa/                         # Portafolio completo de aseguramiento de calidad
│   ├── manual/                 # Plan de pruebas, matriz de 20 casos y reportes de defectos
│   ├── automation/             # Automatización de API (Postman/Newman) y E2E (Playwright)
│   └── README.md               # Métricas de ejecución y estrategia de calidad
├── docs/                       # Documentación extendida para reclutadores y diagramas C4
│   ├── architecture/           # Diagramas de secuencia y especificación técnica
│   └── screenshots/            # Galería de capturas de la aplicación
├── PROJECT_CONTEXT.md          # Bitácora de persistencia y contexto técnico del monorepo
└── README.md                   # Presentación maestra del proyecto
```

---

## ✨ 3. Funcionalidades del Sistema

1. **Dashboard en Tiempo Real**: Cálculo dinámico de métricas consolidadas (Total de tareas, Pendientes, En Progreso y Completadas).
2. **Gestión Integral de Tareas (CRUD)**: Creación con validación reactiva, consulta de detalle, edición de todos los atributos y eliminación permanente.
3. **Control de Estados y Prioridades**:
   - **Estados**: `PENDIENTE` (`PENDING`), `EN PROGRESO` (`IN_PROGRESS`), `COMPLETADA` (`COMPLETED`).
   - **Prioridades**: `BAJA` (`LOW`), `MEDIA` (`MEDIUM`), `ALTA` (`HIGH`).
   - Botón de transición rápida de estado en la propia tarjeta con un solo clic.
4. **Búsqueda y Filtros Combinados**: Barra de búsqueda textual optimizada con debounce (250 ms) y filtrado simultáneo por estado y prioridad.
5. **Experiencia de Usuario (UX)**: Diálogos modales con backdrop blur, confirmación segura de eliminación, notificaciones flotantes contextuales (toasts) y componente para estados sin resultados (`EmptyState`).
6. **Validación en Doble Capa**:
   - En cliente: Bloqueo de envíos vacíos y longitud máxima de 100 caracteres.
   - En servidor: Anotaciones Bean Validation (`@NotBlank`, `@Size`, `@NotNull`) y restricciones nativas `CHECK` en PostgreSQL.

---

## 🛠️ 4. Tecnologías Utilizadas

| Capa / Módulo | Tecnologías | Propósito |
|---|---|---|
| **Frontend** | React 18/19, JavaScript (ES6+), Vite, Lucide Icons, CSS3 | Interfaz de usuario reactiva, modular y responsiva. |
| **Backend** | Java 21/23, Spring Boot 4/3, Spring Data JPA, Hibernate, Bean Validation | Reglas de negocio, API RESTful y transaccionalidad. |
| **Base de Datos** | PostgreSQL 15+/17, PL/pgSQL | Almacenamiento relacional, índices y triggers. |
| **Testing Backend** | JUnit 5, Mockito, MockMvc, H2 Database | Pruebas unitarias de servicios y de integración en controladores. |
| **Testing API** | Postman, Newman CLI | Pruebas de contrato HTTP automatizadas en consola. |
| **Testing E2E** | Playwright (Chromium) | Automatización de flujos de usuario en el navegador. |
| **CI / DevOps** | GitHub Actions | Automatización de compilación y ejecución de pruebas en cada commit. |

---

## 🚀 5. Guía de Instalación y Ejecución Local

### Prerrequisitos
* **Java JDK 21 o 23** instalado.
* **Node.js (v20 o superior)** y **npm** instalados.
* **PostgreSQL** instalado y en ejecución en el puerto `5432`.

---

### Paso 1: Configurar la Base de Datos (PostgreSQL)

1. Abre tu gestor de base de datos (o la consola `psql`) y crea la base de datos:
   ```sql
   CREATE DATABASE taskflow_db;
   ```
2. Aplica el esquema y los datos iniciales desde la raíz del proyecto:
   ```bash
   psql -U postgres -d taskflow_db -f database/schema.sql
   psql -U postgres -d taskflow_db -f database/data.sql
   ```

---

### Paso 2: Iniciar el Backend (Spring Boot)

1. Dirígete a la carpeta `backend/`:
   ```bash
   cd backend
   ```
2. Ejecuta la suite de pruebas unitarias para validar el entorno:
   ```bash
   # En Windows:
   .\mvnw.cmd test
   
   # En Linux / macOS:
   ./mvnw test
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   # En Windows:
   .\mvnw.cmd spring-boot:run
   
   # En Linux / macOS:
   ./mvnw spring-boot:run
   ```
El backend iniciará en: `http://localhost:8080`.

---

### Paso 3: Iniciar el Frontend (React)

1. En una nueva terminal, dirígete a `frontend/`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```
Abre en tu navegador: `http://localhost:5173`.

---

## 🧪 6. Ejecución de Pruebas Automatizadas

### A. Pruebas Unitarias del Backend (JUnit 5 + Mockito)
```bash
cd backend
.\mvnw.cmd test
```
*13 pruebas ejecutadas y aprobadas (Servicios, Controladores MockMvc y contexto Spring).*

### B. Pruebas de API REST con Newman
Con el backend en ejecución (`http://localhost:8080`), corre en la raíz del proyecto:
```bash
npx newman run qa/automation/postman/taskflow-api.postman_collection.json -e qa/automation/postman/taskflow-local.postman_environment.json
```

### C. Pruebas End-to-End con Playwright
Con backend y frontend encendidos:
```bash
cd qa/automation/e2e
npm install
npm test
```

---

## 🎯 7. Cómo Presentar este Proyecto según la Vacante

Una de las ventajas competitivas de **TaskFlow** es que puedes enfocar la entrevista técnica según el perfil al que aplicas:

* **Para vacantes Backend (Java / Spring Boot)**:
  - Destaca la arquitectura en capas ([`TaskController`](file:///D:/task.portafoli0/taskflow-fullstack/backend/src/main/java/com/taskflow/controller/TaskController.java) ➔ [`TaskService`](file:///D:/task.portafoli0/taskflow-fullstack/backend/src/main/java/com/taskflow/service/TaskService.java) ➔ [`TaskRepository`](file:///D:/task.portafoli0/taskflow-fullstack/backend/src/main/java/com/taskflow/repository/TaskRepository.java)).
  - Explica el uso de Java Records para DTOs inmutables y Bean Validation declarativo.
  - Muestra el manejo centralizado de excepciones con [`GlobalExceptionHandler`](file:///D:/task.portafoli0/taskflow-fullstack/backend/src/main/java/com/taskflow/exception/GlobalExceptionHandler.java) (`@RestControllerAdvice`).
  - Demuestra las 13 pruebas unitarias y de integración con perfil H2.

* **Para vacantes Frontend / Full Stack**:
  - Presenta la interfaz reactiva desarrollada en React con Vite.
  - Explica la orquestación del estado, el debounce en la búsqueda textual y el consumo desacoplado en [`taskApi.js`](file:///D:/task.portafoli0/taskflow-fullstack/frontend/src/api/taskApi.js).
  - Destaca la experiencia de usuario: modales accesibles, confirmación segura de borrado y toasts flotantes.

* **Para vacantes QA / Testing / Automation**:
  - Muestra el [Plan Maestro de Pruebas (`test-plan.md`)](file:///D:/task.portafoli0/taskflow-fullstack/qa/manual/test-plan.md) y la matriz de 20 casos de prueba en [test-cases.md](file:///D:/task.portafoli0/taskflow-fullstack/qa/manual/test-cases.md).
  - Enseña los [Reportes de Defectos (`bug-reports/`)](file:///D:/task.portafoli0/taskflow-fullstack/qa/manual/bug-reports/) documentando el ciclo de vida completo de corrección (*Reported -> Fixed -> Retested -> Closed*).
  - Ejecuta en vivo la colección de Postman/Newman y la suite E2E de Playwright.

---

## 🗺️ 8. Estado de la Hoja de Ruta (Checklist de Fases)

- [x] **Fase 01**: Preparar entorno y estructura del repositorio.
- [x] **Fase 02**: Diseñar y preparar la base de datos PostgreSQL (`database/`).
- [x] **Fase 03**: Construir la API REST con Spring Boot (`backend/`).
- [x] **Fase 04**: Construir la interfaz de usuario con React (`frontend/`).
- [x] **Fase 05**: Ejecución y documentación de QA manual (`qa/manual/`).
- [x] **Fase 06**: Automatización de pruebas backend, API y E2E (`qa/automation/`).
- [x] **Fase 07**: Documentación final, capturas y pipeline de GitHub Actions (`.github/workflows/`).

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia [MIT](LICENSE).
