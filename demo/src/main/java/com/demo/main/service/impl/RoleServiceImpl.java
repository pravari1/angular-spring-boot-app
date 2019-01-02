package com.demo.main.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.demo.main.entity.Role;
import com.demo.main.repo.RoleRepository;
import com.demo.main.service.RoleService;

@Configuration
public class RoleServiceImpl implements RoleService{
	@Autowired
    private RoleRepository roleRepository;
	
	@Override
	public Role create(Role role) {
		// TODO Auto-generated method stub
		return roleRepository.save(role);
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		Role role = new Role();
		role.setId(id);
		roleRepository.delete(role);
	}

	@Override
	public List<Role> findAll() {
		// TODO Auto-generated method stub
		return (List<Role>) roleRepository.findAll();
	}

	@Override
	public Role findById(long id) {
		// TODO Auto-generated method stub
		Optional<Role> role = roleRepository.findById(id);
		if(role.isPresent()) {
			return role.get();
		}
		return null;
	}

	@Override
	public Role update(Role user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Role> save(List<Role> roleList) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Role save(Role Role) {
		// TODO Auto-generated method stub
		return roleRepository.save(Role);
	}


}
