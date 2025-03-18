package com.prepaidgo.MobiComm.Repository;

import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Plans;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PlansRepository extends JpaRepository<Plans,Integer>{

	@Query("SELECT p FROM Plans p WHERE p.category.category = :name")
	List<Plans> findByCategory(String name);

	@Query("Select p from Plans p where p.status = 'ACTIVE'")
	List<Plans> findAllActivePlans();

	@Query("SELECT p FROM Plans p WHERE p.price BETWEEN :minPrice AND :maxPrice AND p.validity BETWEEN :minValidity AND :maxValidity AND p.data BETWEEN :minData AND :maxData")
	List<Plans> findFilteredPlans(
	    @Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,
	    @Param("minValidity") Integer minValidity, @Param("maxValidity") Integer maxValidity,
	    @Param("minData") Integer minData, @Param("maxData") Integer maxData);



}
