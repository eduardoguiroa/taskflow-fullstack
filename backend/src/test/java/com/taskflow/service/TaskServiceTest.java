package com.taskflow.service;

import com.taskflow.dto.TaskMetricsDTO;
import com.taskflow.dto.TaskRequestDTO;
import com.taskflow.dto.TaskResponseDTO;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.model.Task;
import com.taskflow.model.TaskPriority;
import com.taskflow.model.TaskStatus;
import com.taskflow.repository.TaskRepository;
import com.taskflow.service.impl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task sampleTask;

    @BeforeEach
    void setUp() {
        sampleTask = new Task("Test Task", "Description", TaskPriority.HIGH, TaskStatus.PENDING);
        sampleTask.setId(1L);
    }

    @Test
    @DisplayName("Debe crear una tarea correctamente y retornar su DTO")
    void createTask_Success() {
        TaskRequestDTO request = new TaskRequestDTO("Nueva Tarea", "Detalles", TaskPriority.MEDIUM, TaskStatus.PENDING);
        when(taskRepository.save(any(Task.class))).thenReturn(sampleTask);

        TaskResponseDTO result = taskService.createTask(request);

        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.title()).isEqualTo("Test Task");
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    @DisplayName("Debe retornar la tarea por ID cuando existe")
    void getTaskById_Success() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(sampleTask));

        TaskResponseDTO result = taskService.getTaskById(1L);

        assertThat(result).isNotNull();
        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.title()).isEqualTo("Test Task");
    }

    @Test
    @DisplayName("Debe lanzar ResourceNotFoundException cuando el ID no existe")
    void getTaskById_NotFound() {
        when(taskRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> taskService.getTaskById(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    @DisplayName("Debe actualizar una tarea existente")
    void updateTask_Success() {
        TaskRequestDTO updateRequest = new TaskRequestDTO("Título Actualizado", "Nueva desc", TaskPriority.LOW, TaskStatus.COMPLETED);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(sampleTask));
        when(taskRepository.save(any(Task.class))).thenReturn(sampleTask);

        TaskResponseDTO result = taskService.updateTask(1L, updateRequest);

        assertThat(result).isNotNull();
        verify(taskRepository).save(sampleTask);
    }

    @Test
    @DisplayName("Debe eliminar la tarea si existe")
    void deleteTask_Success() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(sampleTask));
        doNothing().when(taskRepository).delete(sampleTask);

        taskService.deleteTask(1L);

        verify(taskRepository, times(1)).delete(sampleTask);
    }

    @Test
    @DisplayName("Debe calcular y retornar las métricas del dashboard")
    void getMetrics_Success() {
        when(taskRepository.count()).thenReturn(10L);
        when(taskRepository.countByStatus(TaskStatus.PENDING)).thenReturn(4L);
        when(taskRepository.countByStatus(TaskStatus.IN_PROGRESS)).thenReturn(3L);
        when(taskRepository.countByStatus(TaskStatus.COMPLETED)).thenReturn(3L);

        TaskMetricsDTO metrics = taskService.getMetrics();

        assertThat(metrics.total()).isEqualTo(10L);
        assertThat(metrics.pending()).isEqualTo(4L);
        assertThat(metrics.inProgress()).isEqualTo(3L);
        assertThat(metrics.completed()).isEqualTo(3L);
    }
}
