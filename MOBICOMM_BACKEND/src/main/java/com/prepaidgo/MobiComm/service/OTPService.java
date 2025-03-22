package com.prepaidgo.MobiComm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

@Service
public class OTPService {

	private final SecureRandom random = new SecureRandom();

	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	private static final long OTP_EXPIRY = 60;

	public String generateOTP(String phoneNumber) {
		String otp = String.valueOf(100_000 + random.nextInt(900_000));
		String key = "OTP_" + phoneNumber;

		redisTemplate.opsForValue().set(key, otp, OTP_EXPIRY, TimeUnit.SECONDS);
		return otp;
	}

	public boolean verifyOTP(String phoneNumber, String enteredOtp) {
		String key = "OTP_" + phoneNumber;
		String storedOtp = (String) redisTemplate.opsForValue().get(key);

		if (storedOtp != null && storedOtp.equals(enteredOtp)) {
			redisTemplate.delete(key);
			return true;
		}
		return false;
	}

}
