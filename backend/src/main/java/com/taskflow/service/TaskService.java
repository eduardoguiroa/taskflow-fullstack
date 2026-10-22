package com.taskflow.service;

import com.taskflow.dto.TaskMetricsDTO;
import com.taskflow.dto.TaskRequestDTO;
import com.taskflow.dto.TaskResponseDTO;
import com.taskflow.model.TaskPriority;
import com.taskflow.model.TaskStatus;

import java.util.List;

public interface TaskService {
    List<TaskResponseDTO> getAllTasks(TaskStatus status, TaskPriority priority, String search);

    TaskResponseDTO getTaskById(Long id);

    TaskResponseDTO createTask(TaskRequestDTO request);

    TaskResponseDTO updateTask(Long id, TaskRequestDTO request);

    void deleteTask(Long id);

    TaskMetricsDTO getMetrics();
}
