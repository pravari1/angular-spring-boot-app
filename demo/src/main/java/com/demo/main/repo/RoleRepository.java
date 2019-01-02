package com.demo.main.repo;

import org.springframework.data.repository.CrudRepository;

import com.demo.main.entity.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {

}
