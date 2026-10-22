package com.taskflow.dto;

import java.time.OffsetDateTime;
import java.util.Map;

public record ErrorResponseDTO(
    OffsetDateTime timestamp,
    int status,
    String error,
    String message,
    String path,
    Map<String, String> validationErrors
) {
    public ErrorResponseDTO(int status, String error, String message, String path) {
        this(OffsetDateTime.now(), status, error, message, path, null);
    }

    public ErrorResponseDTO(int status, String error, String message, String path, Map<String, String> validationErrors) {
        this(OffsetDateTime.now(), status, error, message, path, validationErrors);
    }
}
