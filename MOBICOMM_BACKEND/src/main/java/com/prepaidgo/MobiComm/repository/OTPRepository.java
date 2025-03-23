package com.prepaidgo.MobiComm.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.OTP;

import java.util.Optional;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long> {

	Optional<OTP> findByUserId(int userId);

	void deleteByUserId(int userId);

}
