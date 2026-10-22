# 🧪 Módulo de Aseguramiento de Calidad (QA) — TaskFlow

Este directorio contiene la estrategia integral de aseguramiento de la calidad de software implementada para **TaskFlow**, combinando **pruebas manuales exhaustivas** con **automatización de pruebas en API y End-to-End (E2E)**.

---

## 📁 1. Estructura del Módulo QA

```text
qa/
├── manual/                              # Pruebas Manuales
│   ├── test-plan.md                     # Plan Maestro de Pruebas (alcance, criterios, riesgos)
│   ├── test-cases.md                    # Matriz de 20 casos de prueba (CP-001 a CP-020)
│   └── bug-reports/                     # Reportes formales de defectos encontrados y resueltos
│       ├── BUG-001-desbordamiento-texto-largo-tarjeta.md
│       └── BUG-002-validacion-espacios-en-blanco-backend.md
├── automation/                          # Pruebas Automatizadas
│   ├── postman/                         # Colección API + Runner Newman
│   └── e2e/                             # Scripts automatizados de navegador (Playwright)
└── README.md                            # Resumen y presentación del módulo QA
```

---

## 📊 2. Métricas de Calidad de las Pruebas Manuales

* **Total de Casos Diseñados y Ejecutados**: 20
* **Casos Aprobados (PASS)**: 19 (95%)
* **Defectos Detectados y Documentados**: 2
* **Defectos Resueltos y Cerrados (CLOSED)**: 2 (100% resueltos)
* **Tasa de Éxito de la Suite (Post-fix)**: **100%**

### Distribución por Tipo de Caso:
| Categoría | Cantidad | Casos |
|---|---|---|
| **Funcional (Happy Path & CRUD)** | 9 | CP-001, CP-006, CP-007, CP-008, CP-010, CP-012, CP-013, CP-014, CP-015 |
| **Validaciones Negativas** | 2 | CP-002, CP-003 |
| **Análisis de Valores Límite (BVA)** | 2 | CP-004, CP-005 |
| **Usabilidad y Manejo de UI/UX** | 4 | CP-009, CP-011, CP-017, CP-018 |
| **Integridad y Persistencia** | 3 | CP-016, CP-019, CP-020 |

---

## 📑 3. Documentos Clave de QA Manual

1. **[Plan de Pruebas (`test-plan.md`)](file:///D:/task.portafoli0/taskflow-fullstack/qa/manual/test-plan.md)**:
   Define los objetivos del ciclo de pruebas, alcance funcional, entornos de ejecución (navegadores y resoluciones), criterios de aceptación de entrada/salida y matriz de severidad.

2. **[Matriz de Casos de Prueba (`test-cases.md`)](file:///D:/task.portafoli0/taskflow-fullstack/qa/manual/test-cases.md)**:
   Contiene el detalle paso a paso de cada caso de prueba, precondiciones, datos de entrada, resultado esperado, resultado obtenido y estado.

3. **[Reportes de Defectos (`bug-reports/`)](file:///D:/task.portafoli0/taskflow-fullstack/qa/manual/bug-reports/)**:
   Formato estructurado que refleja el ciclo de vida real de los defectos reportados, con causa raíz, evidencias y resultado del re-test tras la corrección.

---

## 🤖 4. Próximo Paso: Automatización de Pruebas (`qa/automation/`)

La **Fase 06** extenderá este módulo incorporando:
1. **API Testing**: Colección exportada de Postman con assertions para validar endpoints, códigos HTTP y payloads JSON ejecutada headless con **Newman**.
2. **E2E Testing**: Suite de pruebas con **Playwright** para simular la navegación real del usuario.
