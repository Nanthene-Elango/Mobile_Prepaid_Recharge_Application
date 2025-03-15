package com.prepaidgo.MobiComm.Repository;

import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.DTO.PlansDTO;
import com.prepaidgo.MobiComm.Model.Plans;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface PlansRepository extends JpaRepository<Plans,Integer>{

	@Query("SELECT p FROM Plans p WHERE p.category.category = :name")
	List<Plans> findByCategory(String name);


}
