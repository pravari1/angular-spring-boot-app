package com.demo.main.service;

import java.util.List;

import com.demo.main.entity.Employee;

public interface EmployeeService {

    Employee create(Employee user);

    List<Employee> findAll();

    Employee update(Employee user);
    public List<Employee> save(List<Employee> userList) throws Exception;

	Employee save(Employee employee);

	Employee delete(long id);

	Employee findById(long id);
}