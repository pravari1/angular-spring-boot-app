package com.demo.main.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.demo.main.entity.Employee;
import com.demo.main.service.EmployeeService;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/hrsolapp/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    
//    @PostMapping(path="/employees/create", consumes=MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
//    public List<Employee> createEmployees(@RequestBody List<Employee> employeeList,HttpServletResponse response){
//    		List<Employee> employees = null; 
//        try {
//    		employees = ((EmployeeServiceImpl)employeeService).saveAll(employeeList);
//    		response.addHeader("status", "201");
//        }catch(Exception e) {
//    		response.addHeader("status", "409");
//        }
//        return employees;
//    }
    
    
    @PostMapping(path="/create", consumes=MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee createEmployee(@RequestBody Employee employee,HttpServletResponse response){
    		Employee employeeRes = null; 
        try {
        	System.out.println(employee.getId());
        	System.out.println(employee.getFirstName());
        	System.out.println(employee.getLastName());
        	System.out.println(employee.getEmail());
        	System.out.println(employee.getDob());
        	employeeRes = employeeService.save(employee);
    		response.addHeader("status", "200");
        }catch(Exception e) {
    		response.addHeader("status", "409");
        }
        return employeeRes;
    }

    
    @GetMapping(path = "/{id}")
    public Employee findOne(@PathVariable("id") int id){
		return employeeService.findById(id);
    }

    @PutMapping(path = "/update")
    public Employee update(@RequestBody Employee employee){
        return employeeService.update(employee);
    }

    @DeleteMapping(path="/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") long id) {
        employeeService.delete(id);
        if(employeeService.findById(id) == null)  {
        	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        
    }

    @GetMapping(path="/employees", consumes=MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Employee> findAll(){
        return employeeService.findAll();
    }
    
    @GetMapping(path="/employees", consumes=MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_XML_VALUE)
    public List<Employee> findAll1(){
        return employeeService.findAll();
    }
    
}
