package com.prepaidgo.MobiComm.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.DTO.ActivePlanDTO;
import com.prepaidgo.MobiComm.DTO.PlansDTO;
import com.prepaidgo.MobiComm.DTO.RechargesDTO;
import com.prepaidgo.MobiComm.DTO.SubscriberDTO;
import com.prepaidgo.MobiComm.DTO.TransactionDTO;
import com.prepaidgo.MobiComm.Model.RevokedToken;
import com.prepaidgo.MobiComm.Model.Transaction;
import com.prepaidgo.MobiComm.Repository.RevokedTokenRepository;
import com.prepaidgo.MobiComm.service.SubscriberService;

@RestController
public class SubscriberController {

	SubscriberService subscriberService;
	RevokedTokenRepository revokedTokenRepo;

	public SubscriberController(SubscriberService subscriberService , RevokedTokenRepository revokedTokenRepository) {
		this.subscriberService = subscriberService;
		this.revokedTokenRepo = revokedTokenRepository;
	}

	@PostMapping("auth/validate/number")
	public ResponseEntity<?> validatePhoneNumber(@RequestBody Map<String, String> request) {
		Map<String, String> response = new HashMap<>();
		if (subscriberService.validatePhoneNumber(request.get("phoneNumber"))) {
			response.put("success", "Number is valid");
		} else {
			response.put("error", "Number is Invalid");
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping("auth/subscriber/number")
	public ResponseEntity<?> getSubscriberByPhoneNumber(@RequestBody Map<String, String> request) {
		Map<String, SubscriberDTO> response = new HashMap<>();
		SubscriberDTO subscriber = subscriberService.getSubscriberByPhoneNumber(request.get("phoneNumber"));
		if (subscriber != null) {
			response.put("user", subscriber);
		} else {
			response.put("error", null);
		}
		return ResponseEntity.ok(response);
	}

	@PreAuthorize("hasAuthority('SUBSCRIBER')")
	@PostMapping("subscriber/profile/transactions")
	public ResponseEntity<?> getTransactionDetailsByPayerId(@RequestBody Map<String, Integer> user) {
		List<TransactionDTO> transactions = subscriberService.getTransactionDetailByPayerId(user.get("userId"));
		if (!transactions.isEmpty()) {
			return ResponseEntity.ok(transactions);
		} else {
			 return ResponseEntity.notFound().build(); 
		}
	}

	@PreAuthorize("hasAuthority('SUBSCRIBER')")
	@PostMapping("subscriber/profile/recharges")
	public ResponseEntity<?> getRechargeDetailsByUserId(@RequestBody Map<String, Integer> user) {
		List<RechargesDTO> recharges = subscriberService.getRechargeDetailByUserId(user.get("userId"));
		if (!recharges.isEmpty()) {
			return ResponseEntity.ok(recharges);
		} else {
			 return ResponseEntity.notFound().build(); 
		}
	}

	@PreAuthorize("hasAuthority('SUBSCRIBER') or hasAuthority('ADMIN')")
	@PostMapping("subscriber/transaction")
	public ResponseEntity<?> getTransactionByTransactionNumber(@RequestBody Map<String,String> request){
		Optional<Transaction> transaction = subscriberService.getTransactionByTransactionNumber(request.get("transactionNumber"));
		if (transaction.isPresent()) {
			return ResponseEntity.ok(new TransactionDTO(transaction.get()));
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PreAuthorize("hasAuthority('SUBSCRIBER')")
	@PostMapping("subscriber/active-plan")
	public ResponseEntity<?> getActivePlan(@RequestBody Map<String, Integer> user) {
	    ActivePlanDTO activePlan = subscriberService.getActivePlan(user.get("userId"));
	    if (activePlan == null) {
	        return ResponseEntity.notFound().build(); 
	    }
	    return ResponseEntity.ok(activePlan);
	}
	
	@PreAuthorize("hasAuthority('SUBSCRIBER')")
	@PostMapping("subscriber/logout")
	public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
		token = token.substring(7);
		revokedTokenRepo.save(new RevokedToken(token));
		return ResponseEntity.ok("Logged out successfully.");
	}

}
