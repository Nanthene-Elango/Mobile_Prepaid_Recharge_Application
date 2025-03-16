package com.prepaidgo.MobiComm.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.DTO.ConfirmRechargeDTO;
import com.prepaidgo.MobiComm.DTO.TransactionDTO;
import com.prepaidgo.MobiComm.service.RechargeService;

@RestController
@RequestMapping("recharge/")
public class RechargeController {
	
	RechargeService rechargeService;
	
	public RechargeController(RechargeService rechargeService) {
		this.rechargeService = rechargeService;
	}

	@PostMapping("confirm")
	public ResponseEntity<?> confirmRecharge(@RequestBody ConfirmRechargeDTO request){
		System.out.println("plan id: " + request.getPlanId());
		System.out.println("payer id: " + request.getPayerId());
		System.out.println("recepient id: " + request.getRecipientId());
		System.out.println("payment method: " + request.getPaymentMethod());
		TransactionDTO transactionDetail = rechargeService.confirmRecharge(request.getPlanId() 
				, request.getRecipientId() , request.getPayerId() , request.getPaymentMethod());
		return ResponseEntity.ok(transactionDetail);
	}
}
