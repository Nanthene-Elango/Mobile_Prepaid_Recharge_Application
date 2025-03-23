package com.prepaidgo.MobiComm.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class Roles {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int roleId;
	
	@Column(name="role" , nullable=false , unique=true)
	private String role;
	
	@OneToMany(mappedBy="role" , fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Users> users;
	
	public Roles() {
		super();
	}

	public Roles(int roleId, String role) {
		super();
		this.roleId = roleId;
		this.role = role;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Users> getUsers() {
		return users;
	}

	public void setUsers(List<Users> users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "Roles [role=" + role + "]";
	}
	
}
