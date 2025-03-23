package com.prepaidgo.MobiComm.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.DTO.RechargesDTO;
import com.prepaidgo.MobiComm.entity.Recharges;

@Repository
public interface RechargesRepository extends JpaRepository<Recharges,Integer> {

	@Query("SELECT r FROM Recharges r WHERE r.plan.planId = :planId AND r.user.userId = :userId AND r.dateOfRecharge = :rechargeDate")
	Optional<Recharges> findByPlanAndUserAndRechargeDate(@Param("planId") int planId, 
	                                                     @Param("userId") int userId, 
	                                                     @Param("rechargeDate") LocalDateTime rechargeDate);

	@Query("SELECT r FROM Recharges r WHERE r.user.userId = :userId")
	List<Recharges> findAllByUser(@Param("userId") int subscriberId);

	@Query(value = "SELECT * FROM recharges r WHERE r.date_of_expiry BETWEEN CURRENT_DATE AND DATE_ADD(CURRENT_DATE, INTERVAL 3 DAY)", nativeQuery = true)
	List<Recharges> findAllExpiringSubscribers();

	@Query(value = "SELECT * FROM recharges WHERE user_id = :userId ORDER BY date_of_recharge DESC LIMIT 1", 
		       nativeQuery = true)
	Optional<Recharges> findLastRecharge(@Param("userId") int userId);

}
