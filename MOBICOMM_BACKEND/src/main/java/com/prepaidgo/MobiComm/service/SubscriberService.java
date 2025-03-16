package com.prepaidgo.MobiComm.service;


import java.security.SecureRandom;

import org.springframework.stereotype.Service;

import com.prepaidgo.MobiComm.DTO.SubscriberDTO;
import com.prepaidgo.MobiComm.Model.Users;
import com.prepaidgo.MobiComm.Repository.UsersRepository;
import com.prepaidgo.MobiComm.exceptions.NoUserFoundException;

@Service
public class SubscriberService {

	UsersRepository userRepo;
	
	public SubscriberService(UsersRepository userRepo) {
		this.userRepo = userRepo;
	}

	public SubscriberDTO getSubscriberByPhoneNumber(String phoneNumber) {
		return new SubscriberDTO(userRepo.findByPhoneNumber(phoneNumber).orElseThrow(()->{
			throw new NoUserFoundException("No User Found in this number!");
		}));	
	}
	
	public boolean validatePhoneNumber(String phoneNumber) {
		return userRepo.existsByPhoneNumber(phoneNumber);
	}
}
