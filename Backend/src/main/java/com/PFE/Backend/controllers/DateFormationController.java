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


import com.PFE.Backend.Services.DateFormationService;
import com.PFE.Backend.Services.FormationService;
import com.PFE.Backend.entities.DateFormation;
import com.PFE.Backend.entities.Defibrillateur;
import com.PFE.Backend.entities.Formation;
import com.PFE.Backend.entities.Product;

import lombok.AllArgsConstructor;

@RequestMapping(value = "DateFormation")
@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class DateFormationController {
	
	private final DateFormationService dateFormationService;
	private final FormationService formationService;
	
	 @GetMapping(value = "/find/all")
	    public List<DateFormation> findAll( ){
	        return dateFormationService.findAll();
	    }
	 
	 @PostMapping(value = "/addDate")
	    public void save(@RequestBody   DateFormation date){
		 dateFormationService.save(date);
	    }
	 

	 @GetMapping(value = "/find/{id}")
	    public List<DateFormation> findByFormation(@PathVariable long id ){
		    Formation formation = formationService.findbyId(id);
	        return dateFormationService.findByFormation(formation);
	    }
	 @GetMapping(value = "/findDate/{id}")
	    public DateFormation findById(@PathVariable long id ){
	        return dateFormationService.findById(id);
	    }
	 

	  @PatchMapping("/update")//replace an existing Resource entirely  // @PatchMapping partial update
	    public String update(@RequestBody DateFormation date) {
		    dateFormationService.save(date);
	        return "updated  success";
	    }
	  @DeleteMapping(value = "/delete/{id}")
	   public void Delete(@PathVariable long id ){
		 DateFormation date = dateFormationService.findById(id);
		 dateFormationService.delete(date);
	    }
}
