package com.demo.main.repo;




import org.springframework.data.repository.CrudRepository;

import com.demo.main.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
	
    
}