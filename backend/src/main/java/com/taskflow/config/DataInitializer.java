package com.taskflow.config;

import com.taskflow.model.Task;
import com.taskflow.model.TaskPriority;
import com.taskflow.model.TaskStatus;
import com.taskflow.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TaskRepository taskRepository;

    public DataInitializer(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... args) {
        if (taskRepository.count() == 0) {
            taskRepository.save(new Task(
                "Configurar entorno de desarrollo local",
                "Verificar instalación de JDK 21+ y Node.js para el monorepo.",
                TaskPriority.HIGH,
                TaskStatus.COMPLETED
            ));
            taskRepository.save(new Task(
                "Diseñar esquema relacional y restricciones",
                "Validaciones de estados y prioridades en la base de datos.",
                TaskPriority.HIGH,
                TaskStatus.COMPLETED
            ));
            taskRepository.save(new Task(
                "Construir API REST con Spring Boot",
                "Implementar controladores, servicios y repositorios JPA para las operaciones CRUD.",
                TaskPriority.HIGH,
                TaskStatus.IN_PROGRESS
            ));
            taskRepository.save(new Task(
                "Diseñar componentes visuales en React",
                "Maquetar Dashboard de métricas, formulario reactivo y listado con filtros en tiempo real.",
                TaskPriority.MEDIUM,
                TaskStatus.IN_PROGRESS
            ));
            taskRepository.save(new Task(
                "Redactar casos de prueba funcionales en QA",
                "Definir matriz de pruebas manuales con caminos felices, valores límite y validaciones negativas.",
                TaskPriority.MEDIUM,
                TaskStatus.PENDING
            ));
            taskRepository.save(new Task(
                "Automatizar pruebas E2E con Playwright",
                "Crear scripts automatizados para el flujo completo de creación, edición y eliminación de tareas.",
                TaskPriority.LOW,
                TaskStatus.PENDING
            ));
        }
    }
}
