package com.prepaidgo.MobiComm.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.DTO.RechargeDTO;
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
	public ResponseEntity<?> confirmRecharge(@RequestBody RechargeDTO request){
		TransactionDTO transactionDetail = rechargeService.confirmRecharge(request.getPlanId() , request.getRecipientId() , request.getPayerId() , request.getPaymenMode());
		return ResponseEntity.ok(transactionDetail);
	}
}
