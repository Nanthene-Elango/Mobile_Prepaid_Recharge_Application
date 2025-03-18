package com.prepaidgo.MobiComm.service;

import org.springframework.stereotype.Service;

import com.prepaidgo.MobiComm.Model.OTP;
import com.prepaidgo.MobiComm.Repository.OTPRepository;

import jakarta.transaction.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OTPService {

    private static final int EXPIRATION_MINUTES = 5;

    private final SecureRandom random = new SecureRandom();
    private final OTPRepository otpRepository;
    
    public OTPService(OTPRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

    @Transactional
    public String generateOTP(int userId) {

        int otp = 100_000 + random.nextInt(900_000);
        String otpString = String.valueOf(otp);

        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES);

        otpRepository.deleteByUserId(userId);

        OTP newOtp = new OTP(userId, otpString, expiryTime);
        otpRepository.save(newOtp);

        return otpString;
    }

    @Transactional
    public boolean verifyOTP(int userId, String enteredOTP) {
        Optional<OTP> storedOtpOpt = otpRepository.findByUserId(userId);
        System.out.println("Returned OTP: " + storedOtpOpt.orElse(null)); 
        if (!storedOtpOpt.isPresent()) {
            return false; 
        }

        OTP storedOtp = storedOtpOpt.get();
        System.out.println("Returned OTP: " + storedOtp); 
        if (LocalDateTime.now().isAfter(storedOtp.getExpiryTime())) {
            otpRepository.deleteByUserId(userId); 
            return false;
        }

        System.out.print("StoredOTP: " + storedOtp.getOtp());
        System.out.println("Entered OTP: " + enteredOTP);
        if (storedOtp.getOtp().equals(enteredOTP)) {
            otpRepository.deleteByUserId(userId); 
            return true;
        }

        return false;
    }
}
