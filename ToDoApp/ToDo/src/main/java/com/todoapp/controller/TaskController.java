package com.todoapp.controller;

//Import necessary libraries and classes


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todoapp.dto.TaskDto;
import com.todoapp.service.TaskService;

import lombok.AllArgsConstructor;

//Enable cross-origin requests, inject dependency, and define controller class
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/todoapp/tasks")
public class TaskController {
	// Dependency injection
	private TaskService taskService;

	// Endpoint for creating a new task
	@PostMapping
	public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
		TaskDto savedtask = taskService.createTask(taskDto);
		return new ResponseEntity<>(savedtask, HttpStatus.CREATED);
	}

	// Endpoint for retrieving a task by its id
	@GetMapping("{id}")
	public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long taskId) {
		TaskDto taskDto = taskService.getTaskById(taskId);
		return ResponseEntity.ok(taskDto);
	}

	// Endpoint for retrieving all tasks
	@GetMapping
	public ResponseEntity<List<TaskDto>> getAllTasks() {
		List<TaskDto> tasks = taskService.getAllTasks();
		return ResponseEntity.ok(tasks);
	}

	// Endpoint for updating a task by its id
	@PutMapping("{id}")
	public ResponseEntity<TaskDto> updateTask(@PathVariable("id") Long taskId, @RequestBody TaskDto updatedTask) {
		TaskDto taskDto = taskService.updateTask(taskId, updatedTask);
		return ResponseEntity.ok(taskDto);
	}

	// Endpoint for deleting a task by its id
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteTask(@PathVariable("id") Long taskId) {
		taskService.deleteTask(taskId);
		return ResponseEntity.ok("Task deleted successfully");
	}

}