package com.prepaidgo.MobiComm.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otp_store")
public class OTP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private int userId;

    @Column(nullable = false)
    private String otp;

    @Column(nullable = false)
    private LocalDateTime expiryTime;

    public OTP() {}

    public OTP(int userId, String otp, LocalDateTime expiryTime) {
        this.userId = userId;
        this.otp = otp;
        this.expiryTime = expiryTime;
    }

    public Long getId() { 
    	return id; 
    }
    public void setId(Long id) { 
    	this.id = id; 
    }

    public int getUserId() {
    	return userId; 
    }
    public void setUserId(int userId) { 
    	this.userId = userId; 
    }

    public String getOtp() { 
    	return otp; 
    }
    public void setOtp(String otp) { 
    	this.otp = otp; 
    }

    public LocalDateTime getExpiryTime() { 
    	return expiryTime; 
    }
    public void setExpiryTime(LocalDateTime expiryTime) { 
    	this.expiryTime = expiryTime; 
    }
}
