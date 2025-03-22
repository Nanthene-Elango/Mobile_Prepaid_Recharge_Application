package com.prepaidgo.MobiComm.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.prepaidgo.MobiComm.DTO.ConfirmRechargeDTO;
import com.prepaidgo.MobiComm.DTO.RechargesDTO;
import com.prepaidgo.MobiComm.DTO.SubscriberDTO;
import com.prepaidgo.MobiComm.DTO.TransactionDTO;
import com.prepaidgo.MobiComm.Repository.RechargesRepository;
import com.prepaidgo.MobiComm.Repository.UsersRepository;
import com.prepaidgo.MobiComm.exceptions.NoUserFoundException;
import com.prepaidgo.MobiComm.service.EmailService;
import com.prepaidgo.MobiComm.service.RechargeService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("plans/recharge/")
public class RechargeController {
	
	RechargeService rechargeService;
	EmailService emailService;
	UsersRepository userRepo;
	RechargesRepository rechargeRepo;
	
	public RechargeController(RechargeService rechargeService , EmailService emailService 
			, UsersRepository userRepo , RechargesRepository rechargeRepo) {
		this.rechargeService = rechargeService;
		this.emailService = emailService;
		this.userRepo = userRepo;
		this.rechargeRepo = rechargeRepo;
	}

	@PostMapping("confirm")
	public ResponseEntity<?> confirmRecharge(@Valid @RequestBody ConfirmRechargeDTO request){
		
		System.out.println("plan id: " + request.getPlanId());
		System.out.println("payer id: " + request.getPayerId());
		System.out.println("recepient id: " + request.getRecipientId());
		System.out.println("payment method: " + request.getPaymentMethod());
		
		TransactionDTO transactionDetail = rechargeService.confirmRecharge(request.getPlanId() 
				, request.getRecipientId() , request.getPayerId() , request.getPaymentMethod());
		
		return ResponseEntity.ok(transactionDetail);
	}
	
	@PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestParam("toUser") int userId, 
                            @RequestParam("file") MultipartFile file) {
        try {
        	if (userRepo.existsById(userId)) {
        		SubscriberDTO user = new SubscriberDTO(userRepo.findById(userId).get());
        		RechargesDTO recharge = new RechargesDTO(rechargeRepo.findLastRecharge(userId).get());
        		emailService.sendEmail(user, recharge , file);
                return ResponseEntity.ok().body("Email sent successfully!");
        	}
        	else {
        		throw new NoUserFoundException("No Users Found!");
        	}
        } catch (MessagingException e) {
            return ResponseEntity.badRequest().body("Failed to send email: " + e.getMessage());
        }
    }
}
