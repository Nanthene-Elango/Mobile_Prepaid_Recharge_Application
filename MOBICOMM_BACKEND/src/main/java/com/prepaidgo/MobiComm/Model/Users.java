package com.prepaidgo.MobiComm.Model;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;

	@Column(nullable=false)
	private String fullName;
	
	@Column(nullable=false, unique=true, length=10)
	private String phoneNumber;
	
	@Column(name="email" , nullable=false, unique=true)
	private String email;
	
	@Column(length=10)
	private LocalDate dob;
	
	@CreationTimestamp 
	@Column(length=10)
	private LocalDate dateOfRegistration;
	
	@Column(name="gender",length=10)
	private String gender;
	
	@Embedded
	private Address address;
	
	@Column(name="username" , unique=true , nullable=true)
	private String username;
	
	@Column(name="password" , nullable=true)
	private String password;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="roleId" , referencedColumnName="roleId" , nullable=false)
	private Roles role;
	
	@Column(name="status" , nullable=false , columnDefinition = "VARCHAR(20) DEFAULT 'ACTIVE'")
	private String status;
	
	@JsonIgnore
	@OneToMany(mappedBy = "payer", cascade = CascadeType.ALL)
	private List<Transaction> transactions;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Recharges> recharge;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	private List<Support> supportTickets;

	
	public Users() {
		super();
	}

	public Users(int userId, String fullName, String phoneNumber, String email, LocalDate dob,
			LocalDate dateOfRegistration, String gender, Address address, String username, String password, Roles role,
			String status) {
		super();
		this.userId = userId;
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.dob = dob;
		this.dateOfRegistration = dateOfRegistration;
		this.gender = gender;
		this.address = address;
		this.username = username;
		this.password = password;
		this.role = role;
		this.status = status;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public LocalDate getDateOfRegistration() {
		return dateOfRegistration;
	}

	public void setDateOfRegistration(LocalDate dateOfRegistration) {
		this.dateOfRegistration = dateOfRegistration;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Roles getRole() {
		return role;
	}

	public void setRole(Roles role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	public List<Recharges> getRecharge() {
		return recharge;
	}

	public void setRecharge(List<Recharges> recharge) {
		this.recharge = recharge;
	}

	public List<Support> getSupportTickets() {
		return supportTickets;
	}

	public void setSupportTickets(List<Support> supportTickets) {
		this.supportTickets = supportTickets;
	}

	@Override
	public String toString() {
		return "Users [userId=" + userId + ", fullName=" + fullName + ", phoneNumber=" + phoneNumber + ", email="
				+ email + ", dob=" + dob + ", dateOfRegistration=" + dateOfRegistration + ", gender=" + gender
				+ ", address=" + address + ", username=" + username + ", password=" + password + ", role=" + role
				+ ", status=" + status + "]";
	}
	
}

