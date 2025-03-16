package com.prepaidgo.MobiComm.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.prepaidgo.MobiComm.DTO.PlansDTO;
import com.prepaidgo.MobiComm.DTO.RechargesDTO;
import com.prepaidgo.MobiComm.DTO.SubscriberDTO;
import com.prepaidgo.MobiComm.DTO.TransactionDTO;
import com.prepaidgo.MobiComm.Model.Plans;
import com.prepaidgo.MobiComm.Model.Recharges;
import com.prepaidgo.MobiComm.Model.Transaction;
import com.prepaidgo.MobiComm.Repository.RechargesRepository;
import com.prepaidgo.MobiComm.Repository.TransactionRepository;
import com.prepaidgo.MobiComm.Repository.UsersRepository;
import com.prepaidgo.MobiComm.exceptions.NoUserFoundException;

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

	public PlansDTO getActivePlan(int userId) {
		List<Recharges> recharges = rechargeRepo.findAllByUser(userId);

		Optional<Recharges> activeRecharge = recharges.stream()
				.filter(x -> x.getDateOfExpiry().isAfter(LocalDateTime.now()))
				.sorted(Comparator.comparing(Recharges::getDateOfExpiry))
				.findFirst();

		return activeRecharge.map(recharge -> new PlansDTO(recharge.getPlan())).orElse(null); 
	}

}
