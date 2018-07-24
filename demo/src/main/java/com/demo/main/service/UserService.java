package com.demo.main.service;

import java.util.List;

import com.demo.main.entity.User;

public interface UserService {

    User create(User user);

    User delete(int id);

    List<User> findAll();

    User findById(int id);

    User update(User user);
    public List<User> save(List<User> userList) throws Exception;
}