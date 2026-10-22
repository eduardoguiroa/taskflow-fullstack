package com.taskflow.dto;

public record TaskMetricsDTO(
    long total,
    long pending,
    long inProgress,
    long completed
) {
}
