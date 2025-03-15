package com.prepaidgo.MobiComm.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prepaidgo.MobiComm.Model.Categories;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories,Integer>{

}
