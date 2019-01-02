package com.demo.main.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

import com.demo.main.entity.Role;
import com.demo.main.service.RoleService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/hrsolapp/role")
public class RoleController {


    @Autowired
    private RoleService roleService;
    
//    @PostMapping(path="/create", consumes=MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<List<Role>> createRole(@RequestBody List<Role> roleList,HttpServletResponse response){
//    		List<Role> roles = null;
//        try {
//    		roles = roleService.save(roleList);
//    		response.addHeader("status", "200");
//    		return new ResponseEntity<List<Role>>(roles, HttpStatus.CREATED);
//        }catch(Exception e) {
//    		response.addHeader("status", "409");
//        }
//        return new ResponseEntity<List<Role>>(roles, HttpStatus.INTERNAL_SERVER_ERROR);
//        
//    }
    
    @PostMapping(path="/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Role> createEmployee(@RequestBody Role role, HttpServletResponse response){
    	Role roleRes = null; 
        try {
        	roleRes = roleService.save(role);
        	return new ResponseEntity<Role>(roleRes, HttpStatus.CREATED);
        }catch(Exception e) {
    		e.printStackTrace();
        }
        return new ResponseEntity<Role>(roleRes, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    
    @GetMapping(path = "/{id}")
    public Role findOne(@PathVariable("id") int id){
		return roleService.findById(id);
    }

    @PutMapping(path = "/update")
    public Role update(@RequestBody Role user){
        return roleService.update(user);
    }

    @DeleteMapping(path="/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") int id) {
        roleService.delete(id);
        if(roleService.findById(id) == null) {
        	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping(path="/roles", consumes=MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Role> findAll(){
        return roleService.findAll();
    }
    

	
}
