package com.demo.main.repo;

import org.springframework.data.repository.CrudRepository;
import com.demo.main.entity.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}