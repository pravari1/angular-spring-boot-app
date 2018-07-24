package com.demo.main.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.demo.main.entity.User;
import com.demo.main.service.UserService;
import com.demo.main.service.UserServiceImpl;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/demoHCLAPP")
public class UserController {

    @Autowired
    private UserService userService;
    
//    @GetMapping(path = "/user")
//    public @ResponseBody String findOne1(){
//        System.out.println("Hiiiiiiiiiiiiii-----------");
//    		return "Saved";
////    		return userService.findById(id);
//    }
    @PostMapping(path="/user", consumes=MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public void create(@RequestBody List<User> userList,HttpServletResponse response){
    		List<User> users = null; 
        try {
        		System.out.println("I am heree");
        		users = ((UserServiceImpl)userService).saveAll(userList);
        		response.addHeader("status", "200");
        }catch(Exception e) {
        		response.addHeader("status", "409");
        }
//        return userList;
    }

    @GetMapping(path = "/user/{id}")
    public User findOne(@PathVariable("id") int id){
//    		return "Hi";
    		return userService.findById(id);
    }

    @PutMapping
    public User update(@RequestBody User user){
        return userService.update(user);
    }

    @DeleteMapping(path ={"/{id}"})
    public User delete(@PathVariable("id") int id) {
        return userService.delete(id);
    }

    @GetMapping
    public List findAll(){
        return userService.findAll();
    }
}
