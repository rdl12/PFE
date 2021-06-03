package com.PFE.Backend.controllers;

import java.util.List;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Repository.SubscriptionRepository;
import com.PFE.Backend.Services.SubscriptionService;
import com.PFE.Backend.entities.Boundary;
import com.PFE.Backend.entities.Formation;
import com.PFE.Backend.entities.Subcription;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RequestMapping(value = "Subscription")
@AllArgsConstructor
@RestController
public class SubscriptionController {
	private final SubscriptionService subscriptionService;

	 @GetMapping(value = "/find/all")
	    public List<Subcription> findAll( ){
	        return subscriptionService.findAll();
	    }
	 @PostMapping(value = "/add")
	    public void save(@RequestBody Subcription subscription){
		 subscription.setEtat("non traiter");
		 subscriptionService.save(subscription);
	    }
	 @DeleteMapping(value = "/delete/{id}")
	   public void Delete(@PathVariable long id ){
		 Subcription subcription = subscriptionService.findbyId(id);
		 Formation formation = subcription.getFormation();
		 if(subcription.getEntreprise() == null  ) {
			 formation.setNbr_inscrit(formation.getNbr_inscrit() - 1);
		 }
		 else {
			 formation.setNbr_entreprise(formation.getNbr_entreprise() - 1);
		 }
		 subscriptionService.delete(subcription);
	    }
	 @PatchMapping("/update")//replace an existing Resource entirely  // @PatchMapping partial update
	    public String update(@RequestBody  Subcription subcription) {
		 subscriptionService.save(subcription);
	        return "updated  success";
	    }
}
