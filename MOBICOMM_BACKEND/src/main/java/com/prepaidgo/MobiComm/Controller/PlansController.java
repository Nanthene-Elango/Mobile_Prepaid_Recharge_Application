package com.prepaidgo.MobiComm.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.DTO.CategoriesDTO;
import com.prepaidgo.MobiComm.DTO.PlansDTO;
import com.prepaidgo.MobiComm.Repository.CategoriesRepository;
import com.prepaidgo.MobiComm.Repository.PlansRepository;
import com.prepaidgo.MobiComm.exceptions.PlanNotFoundException;

@RestController
public class PlansController {

	@Autowired
	PlansRepository plansRepo;
	
	@Autowired 
	CategoriesRepository categoriesRepo;
	
	@GetMapping("/plans")
	public List<PlansDTO> getAllPlans() {
		List<PlansDTO> plans =  plansRepo.findAll().stream().map(PlansDTO::new).collect(Collectors.toList());
		if (plans.isEmpty()) {
			throw new PlanNotFoundException("No Plans Found!");
		}
		return plans;
	}
	
	@GetMapping("/plans/category")
	public List<PlansDTO> getPlansByCategory(@RequestParam String name){
		
		List<PlansDTO> plans = plansRepo.findByCategory(name).stream().map(PlansDTO::new).collect(Collectors.toList());
		if (plans.isEmpty()) {
			throw new PlanNotFoundException("No Plans Found on this Category");
		}
		return plans;
	}

	@GetMapping("/categories")
	public List<CategoriesDTO> getAllCategory() {
		List<CategoriesDTO> categories =  categoriesRepo.findAll().stream().map(CategoriesDTO::new).collect(Collectors.toList());
		if (categories.isEmpty()) {
			throw new PlanNotFoundException("No Categories Found!");
		}
		return categories;
	}
}
