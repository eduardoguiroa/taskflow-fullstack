package com.taskflow.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskflow.dto.TaskMetricsDTO;
import com.taskflow.dto.TaskRequestDTO;
import com.taskflow.dto.TaskResponseDTO;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.model.TaskPriority;
import com.taskflow.model.TaskStatus;
import com.taskflow.service.TaskService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.OffsetDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

    @MockitoBean
    private TaskService taskService;

    @Test
    @DisplayName("GET /api/tasks debe retornar 200 OK con lista de tareas")
    void getAllTasks_ReturnsList() throws Exception {
        TaskResponseDTO dto = new TaskResponseDTO(
                1L, "Test", "Desc", TaskPriority.HIGH, TaskStatus.PENDING,
                OffsetDateTime.now(), OffsetDateTime.now()
        );
        when(taskService.getAllTasks(null, null, null)).thenReturn(List.of(dto));

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].title").value("Test"));
    }

    @Test
    @DisplayName("POST /api/tasks con datos válidos debe retornar 201 Created")
    void createTask_Valid_ReturnsCreated() throws Exception {
        TaskRequestDTO request = new TaskRequestDTO("Nueva Tarea", "Desc", TaskPriority.HIGH, TaskStatus.PENDING);
        TaskResponseDTO response = new TaskResponseDTO(
                1L, "Nueva Tarea", "Desc", TaskPriority.HIGH, TaskStatus.PENDING,
                OffsetDateTime.now(), OffsetDateTime.now()
        );

        when(taskService.createTask(any(TaskRequestDTO.class))).thenReturn(response);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Nueva Tarea"));
    }

    @Test
    @DisplayName("POST /api/tasks con título vacío debe retornar 400 Bad Request")
    void createTask_Invalid_ReturnsBadRequest() throws Exception {
        TaskRequestDTO request = new TaskRequestDTO("", "Desc", TaskPriority.HIGH, TaskStatus.PENDING);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.validationErrors.title").exists());
    }

    @Test
    @DisplayName("GET /api/tasks/{id} no existente debe retornar 404 Not Found")
    void getTaskById_NotFound_Returns404() throws Exception {
        when(taskService.getTaskById(999L)).thenThrow(new ResourceNotFoundException("No se encontró la tarea con ID: 999"));

        mockMvc.perform(get("/api/tasks/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("No se encontró la tarea con ID: 999"));
    }

    @Test
    @DisplayName("DELETE /api/tasks/{id} debe retornar 204 No Content")
    void deleteTask_Returns204() throws Exception {
        mockMvc.perform(delete("/api/tasks/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("GET /api/tasks/metrics debe retornar 200 OK con conteos")
    void getMetrics_Returns200() throws Exception {
        when(taskService.getMetrics()).thenReturn(new TaskMetricsDTO(10, 4, 3, 3));

        mockMvc.perform(get("/api/tasks/metrics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total").value(10))
                .andExpect(jsonPath("$.pending").value(4))
                .andExpect(jsonPath("$.inProgress").value(3))
                .andExpect(jsonPath("$.completed").value(3));
    }
}
