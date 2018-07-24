package com.demo.main.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.transaction.Transactional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.demo.main.entity.User;
import com.demo.main.repo.UserRepository;

@Configuration
@PropertySource("classpath:application.properties")
@Service("UserService")
public class UserServiceImpl implements UserService {
	@Autowired
    private Environment env;
	
	@Autowired
    private UserRepository userRepository;
	
    @Override
    public User create(User user) {
        return userRepository.save(user);
    }
    
    public List<User> saveAll(List<User> userList){
    		boolean completeRollBack = new Boolean(env.getProperty("demoHCLApp.completeRollback"));
    		if(completeRollBack) {
    			Iterable<User> userItr =  save(userList);
        		return userList;
    		}else {
    			return saveWithoutRollBack(userList);
    		}
    }	
    
    @Transactional(rollbackOn= {Error.class,RuntimeException.class})
    public List<User> save(List<User> userList) {
    		boolean completeRollBack = new Boolean(env.getProperty("demoHCLApp.completeRollback"));
    		System.out.println("completeRollBack"+completeRollBack);
    		List<User> users = new ArrayList<>();
    		
    		Iterable<User> userItr= userRepository.saveAll(userList);
    		

//    		}
    		return users;
    }
    
    
 
    public List<User> saveWithoutRollBack(List<User> userList) {
    		System.out.println("No completeRollBack");
    		List<User> users = new ArrayList<>();
    		for(User user: userList) {
	    		try {
	    			User temp = create(user);
	    			users.add(temp);
	    			
	    		}catch(Exception e) {
	    			System.out.println("completeRollBack== In exception");
	    		}
    		}
    		
    		return users;
    }
    
    
    @Override
    public User delete(int id) {
        User user = findById(id);
        if(user != null){
            userRepository.delete(user);
        }
        return user;
    }

  
    @Override
    public User update(User user) {
        return null;
    }

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User findById(int id) {
		userRepository.findById((long)id);
		// TODO Auto-generated method stub
		return null;
	}}
