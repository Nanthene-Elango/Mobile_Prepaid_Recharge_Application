package com.prepaidgo.MobiComm.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Categories;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories,Integer>{

	public Optional<Categories> findByCategory(String category);

	public boolean existsByCategory(String category);
}
