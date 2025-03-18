package com.prepaidgo.MobiComm.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Recharges;

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


}
