package com.prepaidgo.MobiComm.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.prepaidgo.MobiComm.DTO.TransactionDTO;
import com.prepaidgo.MobiComm.Model.Recharges;
import com.prepaidgo.MobiComm.Model.Transaction;
import com.prepaidgo.MobiComm.Model.Users;
import com.prepaidgo.MobiComm.Repository.PlansRepository;
import com.prepaidgo.MobiComm.Repository.RechargesRepository;
import com.prepaidgo.MobiComm.Repository.TransactionRepository;
import com.prepaidgo.MobiComm.Repository.UsersRepository;

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
		recharge.setUser(usersRepo.findById(recipientId).get());
		recharge.setPlan(plansRepo.findById(planId).get());
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
			Users user = usersRepo.findById(payerId).get();
			transaction.setPayer(user);
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
