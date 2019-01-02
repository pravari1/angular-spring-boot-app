package com.demo.main.service;

import java.util.List;

import com.demo.main.entity.Role;

public interface RoleService {
	Role create(Role role);

	void delete(int id);

    List<Role> findAll();

    Role update(Role role);
    
    public List<Role> save(List<Role> roleList) throws Exception;

    Role save(Role role);

	Role findById(long id);

}
