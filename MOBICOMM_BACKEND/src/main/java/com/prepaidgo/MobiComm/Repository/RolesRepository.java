package com.prepaidgo.MobiComm.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prepaidgo.MobiComm.Model.Roles;

public interface RolesRepository extends JpaRepository<Roles , Integer>{

//	public Optional<Roles> findByRoleId(int id);
}
