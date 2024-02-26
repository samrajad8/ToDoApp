package com.todoapp.repository;

//Import necessary Spring libraries and Task entity


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todoapp.entity.Task;

//Define a repository interface for managing tasks
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
