// @ts-check
import { test, expect } from '@playwright/test';

test.describe('TaskFlow E2E Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Navegar a la página principal de TaskFlow
    await page.goto('/');
  });

  test('TC-E2E-01: El Dashboard y las métricas se cargan correctamente', async ({ page }) => {
    // Verificar encabezado y marca
    await expect(page.locator('.brand-title')).toHaveText('TaskFlow');
    await expect(page.locator('.brand-badge')).toHaveText('Full Stack');

    // Verificar visibilidad de las 4 tarjetas métricas
    await expect(page.locator('#metric-total')).toBeVisible();
    await expect(page.locator('#metric-pending')).toBeVisible();
    await expect(page.locator('#metric-in-progress')).toBeVisible();
    await expect(page.locator('#metric-completed')).toBeVisible();

    // Verificar presencia del botón para crear tarea
    await expect(page.locator('#btn-new-task')).toBeVisible();
  });

  test('TC-E2E-02: Validación negativa - Formulario rechaza título vacío', async ({ page }) => {
    // Abrir modal de creación
    await page.click('#btn-new-task');
    await expect(page.locator('.modal-content')).toBeVisible();

    // Intentar enviar sin título
    await page.click('#btn-submit-task');

    // Verificar mensaje de error de validación inline
    const errorMessage = page.locator('.form-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('El título de la tarea es obligatorio.');

    // Verificar que el modal continúa abierto
    await expect(page.locator('.modal-content')).toBeVisible();
  });

  test('TC-E2E-03: Flujo Completo: Crear, Buscar, Transicionar Estado y Eliminar Tarea', async ({ page }) => {
    const uniqueTitle = `Tarea Playwright E2E ${Date.now()}`;
    const description = 'Prueba automatizada de punta a punta.';

    // 1. Crear Tarea
    await page.click('#btn-new-task');
    await page.fill('#task-title-input', uniqueTitle);
    await page.fill('#task-desc-input', description);
    await page.selectOption('#task-priority-select', 'HIGH');
    await page.selectOption('#task-status-select', 'PENDING');
    await page.click('#btn-submit-task');

    // Verificar que el modal se cierre
    await expect(page.locator('.modal-content')).not.toBeVisible();

    // 2. Verificar que la tarea aparezca en la lista
    const createdCard = page.locator('.task-card', { hasText: uniqueTitle });
    await expect(createdCard).toBeVisible();
    await expect(createdCard.locator('.badge-status-pending')).toBeVisible();
    await expect(createdCard.locator('.badge-priority-high')).toBeVisible();

    // 3. Probar Búsqueda reactiva
    await page.fill('#search-tasks', uniqueTitle);
    await expect(createdCard).toBeVisible();

    // 4. Transicionar estado en tarjeta (Iniciar ▶ -> En Progreso)
    const statusBtn = createdCard.locator('button', { hasText: 'Iniciar ▶' });
    await statusBtn.click();
    await expect(createdCard.locator('.badge-status-in_progress')).toBeVisible();

    // 5. Eliminar tarea con diálogo de confirmación
    const deleteBtn = createdCard.locator('.btn-icon.delete');
    await deleteBtn.click();

    // Verificar modal de confirmación
    const confirmModal = page.locator('.modal-content', { hasText: '¿Eliminar Tarea?' });
    await expect(confirmModal).toBeVisible();

    // Confirmar eliminación
    await page.click('#btn-confirm-delete');

    // Verificar que la tarea ya no exista en el listado
    await expect(page.locator('.task-card', { hasText: uniqueTitle })).not.toBeVisible();
  });

  test('TC-E2E-04: Búsqueda sin coincidencias muestra EmptyState', async ({ page }) => {
    await page.fill('#search-tasks', 'STRING_COMPLETAMENTE_INEXISTENTE_XYZ_999');

    // Verificar visualización del componente EmptyState
    const emptyState = page.locator('.empty-state');
    await expect(emptyState).toBeVisible();
    await expect(emptyState.locator('.empty-title')).toHaveText('No se encontraron tareas coincidentes');

    // Limpiar búsqueda
    await page.click('#btn-reset-filters');
    await expect(emptyState).not.toBeVisible();
  });
});
