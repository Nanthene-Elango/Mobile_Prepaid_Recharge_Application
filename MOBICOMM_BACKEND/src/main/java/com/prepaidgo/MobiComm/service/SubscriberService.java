package com.prepaidgo.MobiComm.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.prepaidgo.MobiComm.DTO.ActivePlanDTO;
import com.prepaidgo.MobiComm.DTO.PlansDTO;
import com.prepaidgo.MobiComm.DTO.RechargesDTO;
import com.prepaidgo.MobiComm.DTO.SubscriberDTO;
import com.prepaidgo.MobiComm.DTO.SubscriberExpiryDTO;
import com.prepaidgo.MobiComm.DTO.TransactionDTO;
import com.prepaidgo.MobiComm.entity.Recharges;
import com.prepaidgo.MobiComm.entity.Transaction;
import com.prepaidgo.MobiComm.exceptions.NoUserFoundException;
import com.prepaidgo.MobiComm.repository.RechargesRepository;
import com.prepaidgo.MobiComm.repository.TransactionRepository;
import com.prepaidgo.MobiComm.repository.UsersRepository;

@Service
public class SubscriberService {

	UsersRepository userRepo;
	TransactionRepository transactionRepo;
	RechargesRepository rechargeRepo;

	public SubscriberService(UsersRepository userRepo, TransactionRepository transactionRepo,
			RechargesRepository rechargeRepo) {
		this.userRepo = userRepo;
		this.transactionRepo = transactionRepo;
		this.rechargeRepo = rechargeRepo;
	}

	public SubscriberDTO getSubscriberByPhoneNumber(String phoneNumber) {
		return new SubscriberDTO(userRepo.findByPhoneNumber(phoneNumber).orElseThrow(() -> {
			throw new NoUserFoundException("No User Found in this number!");
		}));
	}

	public boolean validatePhoneNumber(String phoneNumber) {
		return userRepo.existsByPhoneNumber(phoneNumber);
	}

	public List<TransactionDTO> getTransactionDetailByPayerId(int payerId) {
		return transactionRepo.findAllByPayerId(payerId).stream().map(TransactionDTO::new).collect(Collectors.toList());
	}

	public List<RechargesDTO> getRechargeDetailByUserId(int subscriberId) {
		return rechargeRepo.findAllByUser(subscriberId).stream().map(RechargesDTO::new).collect(Collectors.toList());
	}

	public Optional<Transaction> getTransactionByTransactionNumber(String transactionNumber) {
		return transactionRepo.findByTransactionNumber(transactionNumber);
	}

	public ActivePlanDTO getActivePlan(int userId) {
		List<Recharges> recharges = rechargeRepo.findAllByUser(userId);

		Optional<Recharges> activeRecharge = recharges.stream()
				.filter(x -> x.getDateOfExpiry().isAfter(LocalDateTime.now()))
				.sorted(Comparator.comparing(Recharges::getDateOfExpiry))
				.findFirst();

		return activeRecharge
				.map(recharge -> 
				new ActivePlanDTO(
						new PlansDTO(recharge.getPlan()) , recharge.getDateOfRecharge() , recharge.getDateOfExpiry()
						)
				).orElse(null); 
	}

	public List<SubscriberExpiryDTO> getExpiringSubscribers() {
		return rechargeRepo.findAllExpiringSubscribers().stream().map(SubscriberExpiryDTO::new).collect(Collectors.toList());
	}

	public List<SubscriberDTO> getAllsubscribers() {
		List<SubscriberDTO> subscribers = userRepo.findAllSubscribers().stream().map(SubscriberDTO::new).collect(Collectors.toList());
		return subscribers;
	}

	public SubscriberDTO getSubscriberById(int userId){
		if (userRepo.existsById(userId)) {
			return new SubscriberDTO(userRepo.findById(userId).get());
		}
		else {
			return null;
		}
	}

	public String getSubscriberName(int userId) {
		String name = userRepo.getSubscriberFullName(userId);
		System.out.println(name);
		return name;
	}

}
