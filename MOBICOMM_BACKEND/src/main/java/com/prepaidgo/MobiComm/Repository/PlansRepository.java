package com.prepaidgo.MobiComm.Repository;

import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Plans;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PlansRepository extends JpaRepository<Plans,Integer>{

	@Query("SELECT p FROM Plans p WHERE p.category.category = :name AND p.status = 'ACTIVE'")
	List<Plans> findByCategory(String name);

	@Query("Select p from Plans p where p.status = 'ACTIVE'")
	List<Plans> findAllActivePlans();

}
