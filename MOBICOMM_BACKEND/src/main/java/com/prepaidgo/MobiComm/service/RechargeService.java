package com.prepaidgo.MobiComm.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.prepaidgo.MobiComm.DTO.TransactionDTO;
import com.prepaidgo.MobiComm.entity.Recharges;
import com.prepaidgo.MobiComm.entity.Transaction;
import com.prepaidgo.MobiComm.entity.Users;
import com.prepaidgo.MobiComm.exceptions.NoUserFoundException;
import com.prepaidgo.MobiComm.exceptions.PlanNotFoundException;
import com.prepaidgo.MobiComm.repository.PlansRepository;
import com.prepaidgo.MobiComm.repository.RechargesRepository;
import com.prepaidgo.MobiComm.repository.TransactionRepository;
import com.prepaidgo.MobiComm.repository.UsersRepository;

@Service
public class RechargeService {

	UsersRepository usersRepo;
	RechargesRepository rechargeRepo;
	PlansRepository plansRepo;
	TransactionRepository transactionRepo;

	public RechargeService(UsersRepository usersRepo, RechargesRepository rechargeRepo, PlansRepository plansRepo , TransactionRepository transactionRepo) {
		this.rechargeRepo = rechargeRepo;
		this.usersRepo = usersRepo;
		this.plansRepo = plansRepo;
		this.transactionRepo = transactionRepo;
	}

	public TransactionDTO confirmRecharge(int planId, int recipientId, Integer payerId , String paymentMode) {

		Recharges recharge = new Recharges();
		if (usersRepo.existsById(recipientId)) {
			recharge.setUser(usersRepo.findById(recipientId).get());
		}
		else {
			throw new NoUserFoundException("No User Found on this recipient Id!");
		}
		if (plansRepo.existsById(planId)) {
			recharge.setPlan(plansRepo.findById(planId).get());
		}
		else {
			throw new PlanNotFoundException("No plans found in this plan Id!");
		}
		
		recharge.setDateOfRecharge(LocalDateTime.now());
		recharge.setDateOfExpiry(recharge.getDateOfRecharge().plusDays(extractDays(recharge.getPlan().getValidity())));

		rechargeRepo.save(recharge);
		Recharges savedRecharge = rechargeRepo
				.findByPlanAndUserAndRechargeDate(planId, recipientId, recharge.getDateOfRecharge()).get();
		
		return processTransaction(savedRecharge , payerId , paymentMode);

	}

	private TransactionDTO processTransaction(Recharges recharge , Integer payerId , String paymentMode) {
		
		Transaction transaction = new Transaction();
		transaction.setTransactionNumber(generateTransactionNumber());
		transaction.setAmount(recharge.getPlan().getPrice());
		
		if (payerId == null)
		{
			transaction.setPayer(null);
		}
		else {
			if (usersRepo.existsById(payerId)) {
				Users user = usersRepo.findById(payerId).get();
				transaction.setPayer(user);
			}
			else {
				throw new NoUserFoundException("No User Found on this payer Id!");
			}
		}
		
		transaction.setTransactionDate(recharge.getDateOfRecharge());
		transaction.setPaymentMode(paymentMode);
		transaction.setRecharge(recharge);
		transaction.setStatus("SUCCESS");
		transactionRepo.save(transaction);
		
		return new TransactionDTO(transactionRepo.findByTransactionNumber(transaction.getTransactionNumber()).get());
	}

	public String generateTransactionNumber() {
        long timestamp = System.currentTimeMillis(); 
        int randomNumber = (int) (Math.random() * 10000);
        return "TXN-" + timestamp + "-" + randomNumber;
    }

	public static long extractDays(String validity) {

		String number = validity.replaceAll("[^0-9]", "");
		return Long.parseLong(number);
	}

}
