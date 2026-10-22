# 🚀 TaskFlow Full Stack

> Aplicación web integral para la gestión y seguimiento de tareas personales y profesionales, diseñada como proyecto demostrativo de ingeniería de software full-stack con enfoque formal en aseguramiento de la calidad (QA).

---

## 📌 1. Acerca del Proyecto

**TaskFlow** demuestra el ciclo de vida completo de desarrollo de software en un único repositorio:
- **Backend robusto** desarrollado en Java con Spring Boot siguiendo arquitectura en capas.
- **Frontend interactivo** desarrollado en React centrado en la experiencia de usuario (UX).
- **Base de datos relacional** normalizada con PostgreSQL.
- **Estrategia formal de QA** con pruebas manuales (planes, casos, reportes de bugs) y automatizadas (JUnit, Mockito, Newman, Playwright).
- **Integración continua (CI)** configurada con GitHub Actions.

---

## 🏗️ 2. Arquitectura del Sistema

```mermaid
graph TD
    User(["👤 Usuario"]) -->|Interacción en navegador| Frontend["🖥️ Frontend (React)"]
    Frontend -->|Solicitudes HTTP / JSON (REST)| Backend["⚙️ Backend (Spring Boot API)"]
    Backend -->|JPA / Consultas SQL| Database[("🗄️ PostgreSQL (taskflow_db)")]
    
    subgraph Calidad & CI
        QA["🧪 QA (Manual & Automatizado)"] -.->|E2E / Browser| Frontend
        QA -.->|API & Unit Testing| Backend
        CI["⚙️ GitHub Actions CI"] -.->|Build & Test Pipeline| Backend
        CI -.->|Build & Test Pipeline| Frontend
    end
```

---

## 📁 3. Estructura del Repositorio

```text
taskflow-fullstack/
├── .github/workflows/   # Flujos de Integración Continua (GitHub Actions)
├── backend/             # API REST con Java 21+ y Spring Boot 3
├── frontend/            # Interfaz de usuario con React y CSS
├── database/            # Scripts DDL/DML y modelo relacional PostgreSQL
├── qa/                  # Estrategia de calidad: planes, casos manuales y automatización
├── docs/                # Diagramas arquitectónicos, evidencias y capturas
└── README.md            # Documentación principal del proyecto
```

---

## ⚙️ 4. Funcionalidades Principales

1. **Panel Principal (Dashboard)**: Conteo en tiempo real de tareas totales, pendientes, en progreso y completadas.
2. **Gestión de Tareas (CRUD)**: Creación, lectura detallada, edición y eliminación de tareas.
3. **Control de Estados y Prioridades**:
   - **Estados**: `PENDIENTE` (`PENDING`), `EN PROGRESO` (`IN_PROGRESS`), `COMPLETADA` (`COMPLETED`).
   - **Prioridades**: `BAJA` (`LOW`), `MEDIA` (`MEDIUM`), `ALTA` (`HIGH`).
4. **Búsqueda y Filtros**: Búsqueda textual y filtrado combinado por estado y prioridad.
5. **Aseguramiento de Calidad**: Validación integral de datos tanto en cliente como en servidor y suite de pruebas manuales y automatizadas.

---

## 🗺️ 5. Hoja de Ruta de Desarrollo

- [x] **Fase 01**: Preparar entorno y estructura del repositorio.
- [x] **Fase 02**: Diseñar y preparar la base de datos PostgreSQL (`database/`).
- [x] **Fase 03**: Construir la API REST con Spring Boot (`backend/`).
- [x] **Fase 04**: Construir la interfaz de usuario con React (`frontend/`).
- [x] **Fase 05**: Ejecución y documentación de QA manual (`qa/manual/`).
- [x] **Fase 06**: Automatización de pruebas backend, API y E2E (`qa/automation/`).
- [ ] **Fase 07**: Documentación final, capturas y pipeline de GitHub Actions (`.github/workflows/`).

---

## 🛠️ 6. Tecnologías Utilizadas

| Capa | Tecnologías |
|---|---|
| **Frontend** | React, JavaScript (ES6+), CSS3, Vite |
| **Backend** | Java 21/23, Spring Boot 3 (Spring Web, Spring Data JPA, Bean Validation) |
| **Base de Datos** | PostgreSQL |
| **Testing Backend** | JUnit 5, Mockito |
| **Testing API** | Postman, Newman |
| **Testing E2E** | Playwright |
| **CI/CD** | GitHub Actions |

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia MIT.
