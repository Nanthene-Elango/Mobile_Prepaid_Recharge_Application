package com.prepaidgo.MobiComm.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.DTO.SubscriberDTO;
import com.prepaidgo.MobiComm.service.SubscriberService;

@RestController
public class SubscriberController {

	SubscriberService subscriberService;
	
	public SubscriberController(SubscriberService subscriberService) {
		this.subscriberService = subscriberService;
	}
	
	@PostMapping("/validate/number")
	public ResponseEntity<?> validatePhoneNumber(@RequestBody Map<String, String> request){
		Map<String,String> response = new HashMap<>();
		if (subscriberService.validatePhoneNumber(request.get("phoneNumber"))) {
			response.put("success", "Number is valid");
		}
		else {
			response.put("error", "Number is Invalid");
		}
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/subscriber/number")
	public ResponseEntity<?> getSubscriberByPhoneNumber(@RequestBody Map<String, String> request){
		Map<String,SubscriberDTO> response = new HashMap<>();
		SubscriberDTO subscriber = subscriberService.getSubscriberByPhoneNumber(request.get("phoneNumber"));
		if (subscriber != null) {
			response.put("user", subscriber);
		}
		else {
			response.put("error", null);
		}
		return ResponseEntity.ok(response);
	}
	
}
