package com.prepaidgo.MobiComm.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Recharges;

@Repository
public interface RechargesRepository extends JpaRepository<Recharges,Integer> {

	 @Query("SELECT r FROM Recharge r WHERE r.planId = :planId AND r.userId = :userId AND r.rechargeDate = :rechargeDate")
	 Optional<Recharges> findByPlanIdAndUserIdAndRechargeDate(@Param("planId") int planId, 
	                                                            @Param("userId") int userId, 
	                                                            @Param("rechargeDate") LocalDateTime rechargeDate);
}
