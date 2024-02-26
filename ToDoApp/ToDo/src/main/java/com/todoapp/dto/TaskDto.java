package com.todoapp.dto;

//Define a DTO (Data Transfer Object) class for Task


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Annotate the class with Lombok annotations for generating getters, setters, constructors, and hashCode/equals methods
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {

	// Define fields for task id, title, description, and completion status
	private Long id;
	private String title;
	private String description;
	private String completed;
}
