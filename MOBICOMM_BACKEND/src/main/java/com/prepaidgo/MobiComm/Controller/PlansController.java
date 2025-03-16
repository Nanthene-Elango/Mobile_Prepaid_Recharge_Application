package com.prepaidgo.MobiComm.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.prepaidgo.MobiComm.DTO.CategoriesDTO;
import com.prepaidgo.MobiComm.DTO.PlanAddDTO;
import com.prepaidgo.MobiComm.DTO.PlansDTO;
import com.prepaidgo.MobiComm.Model.Plans;
import com.prepaidgo.MobiComm.exceptions.PlanNotFoundException;
import com.prepaidgo.MobiComm.service.PlansService;

@RestController
public class PlansController {

	PlansService plansService;

	public PlansController(PlansService plansService) {
		this.plansService = plansService;
	}

	@GetMapping("/plans/active")
	public ResponseEntity<List<PlansDTO>> getAllActivePlans() {

		List<PlansDTO> plans = plansService.getAllActivePlans();
		if (plans.isEmpty()) {
			throw new PlanNotFoundException("No Plans Found!");
		}
		return ResponseEntity.status(HttpStatus.OK).body(plans);
	}

	@GetMapping("/plans/all")
	public List<PlansDTO> getAllPlans() {
		List<PlansDTO> plans = plansService.getAllPlans();
		if (plans.isEmpty()) {
			throw new PlanNotFoundException("No Plans Found!");
		}
		return plans;
	}

	@PostMapping("/plans/add")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<?> addPlan(@RequestBody PlanAddDTO newPlan) {
		if (plansService.addNewPlan(newPlan)) {
			return ResponseEntity.status(HttpStatus.OK).body("Plan Saved Successfully!");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Failed to add Plan");
		}

	}

	@PostMapping("plans/update")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<?> updatePlan(@RequestBody PlansDTO updatedPlan) {

		if (plansService.updatePlan(updatedPlan)) {
			return ResponseEntity.status(HttpStatus.OK).body("Plan Updated Successfully!");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to Update Plan");
		}

	}

	@PostMapping("plans/activate/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<?> activatePlanById(@PathVariable int id) {
		if (plansService.activatePlanById(id)) {
			return ResponseEntity.status(HttpStatus.OK).body("Plan Activated Successfully!");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to Activate Plan");
		}
	}

	@PostMapping("plans/delete/{id}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<?> deletePlanById(@PathVariable int id) {
		if (plansService.deletePlanById(id)) {
			return ResponseEntity.status(HttpStatus.OK).body("Plan Deleted Successfully!");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to Delete Plan");
		}
	}

	@GetMapping("/plans/{id}")
	public ResponseEntity<PlansDTO> getPlanById(@PathVariable int id) {
		Plans plan = plansService.getPlanById(id);
		if (plan != null) {
			return ResponseEntity.status(HttpStatus.OK).body(new PlansDTO(plan));
		} else {
			throw new PlanNotFoundException("No Plans Found in this Id!");
		}
	}

	@GetMapping("/plans/category/{category}")
	public ResponseEntity<List<PlansDTO>> getPlansByCategory(@PathVariable String category) {

		List<PlansDTO> plans = plansService.getPlanByCategory(category);
		if (plans.isEmpty()) {
			throw new PlanNotFoundException("No Plans Found on this Category");
		}
		return ResponseEntity.status(HttpStatus.FOUND).body(plans);
	}

	@GetMapping("/categories")
	public List<CategoriesDTO> getAllCategory() {
		List<CategoriesDTO> categories = plansService.getAllCategories();
		if (categories.isEmpty()) {
			throw new PlanNotFoundException("No Categories Found!");
		}
		return categories;
	}
}
