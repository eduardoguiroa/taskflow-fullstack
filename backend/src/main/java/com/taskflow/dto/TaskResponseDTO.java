package com.taskflow.dto;

import com.taskflow.model.Task;
import com.taskflow.model.TaskPriority;
import com.taskflow.model.TaskStatus;
import java.time.OffsetDateTime;

public record TaskResponseDTO(
    Long id,
    String title,
    String description,
    TaskPriority priority,
    TaskStatus status,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
    public static TaskResponseDTO fromEntity(Task task) {
        return new TaskResponseDTO(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.getPriority(),
            task.getStatus(),
            task.getCreatedAt(),
            task.getUpdatedAt()
        );
    }
}
