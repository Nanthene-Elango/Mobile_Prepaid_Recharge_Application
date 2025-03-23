package com.prepaidgo.MobiComm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepaidgo.MobiComm.entity.Roles;

public interface RolesRepository extends JpaRepository<Roles , Integer>{

//	public Optional<Roles> findByRoleId(int id);
}
