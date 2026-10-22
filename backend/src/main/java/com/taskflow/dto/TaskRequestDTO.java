package com.taskflow.dto;

import com.taskflow.model.TaskPriority;
import com.taskflow.model.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record TaskRequestDTO(
    @NotBlank(message = "El título de la tarea es obligatorio")
    @Size(max = 100, message = "El título no puede superar los 100 caracteres")
    String title,

    String description,

    @NotNull(message = "La prioridad es obligatoria (LOW, MEDIUM, HIGH)")
    TaskPriority priority,

    @NotNull(message = "El estado es obligatorio (PENDING, IN_PROGRESS, COMPLETED)")
    TaskStatus status
) {
}
