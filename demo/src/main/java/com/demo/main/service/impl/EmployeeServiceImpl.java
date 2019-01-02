package com.demo.main.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.demo.main.entity.Employee;
import com.demo.main.repo.EmployeeRepository;
import com.demo.main.service.EmployeeService;

@Configuration
@PropertySource("classpath:application.properties")
@Service("EmployeeService")
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private Environment env;

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public Employee create(Employee user) {
		return employeeRepository.save(user);
	}

//	public List<Employee> saveAll(List<Employee> userList) {
//		boolean completeRollBack = new Boolean(env.getProperty("demoHCLApp.completeRollback"));
//		if (completeRollBack) {
//			Iterable<Employee> userItr = save(userList);
//			return userList;
//		} else {
//			return saveWithoutRollBack(userList);
//		}
//	}

	@Transactional(rollbackOn = { Error.class, RuntimeException.class })
	public List<Employee> save(List<Employee> userList) {
		boolean completeRollBack = new Boolean(env.getProperty("demoHCLApp.completeRollback"));
		System.out.println("completeRollBack" + completeRollBack);
		List<Employee> users = new ArrayList<>();

		Iterable<Employee> userItr = employeeRepository.saveAll(userList);
		return users;
	}

	@Override
	public Employee save(Employee employee) {
		Employee emp = employeeRepository.save(employee);
		return emp;
	}

	public List<Employee> saveWithoutRollBack(List<Employee> userList) {
		System.out.println("No completeRollBack");
		List<Employee> users = new ArrayList<>();
		for (Employee user : userList) {
			try {
				Employee temp = create(user);
				users.add(temp);

			} catch (Exception e) {
				System.out.println("completeRollBack== In exception");
			}
		}

		return users;
	}

	@Override
	public Employee delete(long id) {
		try {
			employeeRepository.delete(employeeRepository.findById(id).get());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Employee update(Employee employee) {
		try {
			Optional<Employee> emplOp = employeeRepository.findById(employee.getId());
			if (emplOp.isPresent()) {
				return employeeRepository.save(employee);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Employee> findAll() {
		// TODO Auto-generated method stub
		try {
			return (List<Employee>) employeeRepository.findAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Employee findById(long id) {
		try {
			Optional<Employee> emplOp = employeeRepository.findById((long) id);
			return emplOp.isPresent() ? emplOp.get() : null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
