package com.todoapp.entity;

//Define an entity class for Task


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Annotate the class with Lombok annotations for generating getters, setters, constructors, and hashCode/equals methods
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//Annotate the class as a JPA entity
@Entity

//Specify the table name in the database
@Table(name = "tasks")
public class Task {

	// Define primary key field with auto-generation strategy
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Define fields for task title, description, and completion status
	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "completed")
	private String completed;
}
