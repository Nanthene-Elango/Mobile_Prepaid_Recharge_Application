package com.prepaidgo.MobiComm.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.prepaidgo.MobiComm.DTO.CategoriesDTO;
import com.prepaidgo.MobiComm.DTO.PlanAddDTO;
import com.prepaidgo.MobiComm.DTO.PlansDTO;
import com.prepaidgo.MobiComm.Model.Categories;
import com.prepaidgo.MobiComm.Model.Plans;
import com.prepaidgo.MobiComm.Repository.CategoriesRepository;
import com.prepaidgo.MobiComm.Repository.PlansRepository;
import com.prepaidgo.MobiComm.exceptions.PlanNotFoundException;

@Service
public class PlansService {

	PlansRepository plansRepo;
	CategoriesRepository categoriesRepo;

	public PlansService(PlansRepository plansRepo, CategoriesRepository categoryRepo) {
		this.categoriesRepo = categoryRepo;
		this.plansRepo = plansRepo;
	}

	public List<PlansDTO> getAllPlans() {
		return plansRepo.findAll().stream().map(PlansDTO::new).collect(Collectors.toList());
	}

	public List<PlansDTO> getAllActivePlans() {
		List<PlansDTO> plans = plansRepo.findAllActivePlans().stream().map(PlansDTO::new).collect(Collectors.toList());
		return plans;
	}

	public boolean addNewPlan(PlanAddDTO newPlan) {

		Plans plan = new Plans();
		Categories category = categoriesRepo.findByCategory(newPlan.getCategory()).get();
		plan.setCategory(category);
		plan.setValidity(newPlan.getValidity());
		plan.setData(newPlan.getData());
		plan.setPrice(newPlan.getPrice());
		plan.setBenefits(newPlan.getBenefits());
		plan.setCalls(newPlan.getCalls());
		plan.setSms(newPlan.getSms());
		plan.setStatus("ACTIVE");
		try {
			plansRepo.save(plan);
			return true;
		} catch (Exception ex) {
			return false;
		}
	}

	public Plans getPlanById(int id) {
		return plansRepo.findById(id).get();
	}

	public List<PlansDTO> getPlanByCategory(String name) {
		return plansRepo.findByCategory(name).stream().map(PlansDTO::new).collect(Collectors.toList());
	}

	public List<CategoriesDTO> getAllCategories() {
		return categoriesRepo.findAll().stream().map(CategoriesDTO::new).collect(Collectors.toList());
	}

	public Categories getCategoryByName(String name) {
		Categories category = categoriesRepo.findByCategory(name).get();
		if (category != null) {
			return category;
		} else {
			throw new PlanNotFoundException("No Category found in this category name");
		}
	}

	public boolean updatePlan(PlansDTO updatedPlan) {
		Plans plan = getPlanById(updatedPlan.getPlanId());
		if (plan != null) {
			try {
				plan.setCategory(getCategoryByName(updatedPlan.getCategory()));
				plan.setValidity(updatedPlan.getValidity());
				plan.setBenefits(updatedPlan.getBenefits());
				plan.setCalls(updatedPlan.getCalls());
				plan.setSms(updatedPlan.getSms());
				plan.setData(updatedPlan.getData());
				plan.setPrice(updatedPlan.getPrice());
				plansRepo.save(plan);
				return true;
			} catch (Exception ex) {
				return false;
			}
		} else {
			throw new PlanNotFoundException("Plan Not Found!");
		}
	}

	public boolean deletePlanById(int id) {

		Plans plan = plansRepo.findById(id).get();
		if (plan != null) {
			plan.setStatus("INACTIVE");
			plansRepo.save(plan);
			return true;
		} else {
			throw new PlanNotFoundException("No Plans Found on this id!");
		}
	}

	public boolean activatePlanById(int id) {

		Plans plan = plansRepo.findById(id).get();
		if (plan != null) {
			plan.setStatus("ACTIVE");
			plansRepo.save(plan);
			return true;
		} else {
			throw new PlanNotFoundException("No Plans Found on this id!");
		}
	}

}
