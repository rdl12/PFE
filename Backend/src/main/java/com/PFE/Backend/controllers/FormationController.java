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

import com.PFE.Backend.Services.CategorieService;
import com.PFE.Backend.Services.FormationService;
import com.PFE.Backend.entities.Categorie;
import com.PFE.Backend.entities.DateFormation;
import com.PFE.Backend.entities.Defibrillateur;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Formation;
import com.PFE.Backend.entities.Product;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RequestMapping(value = "Formation")
@AllArgsConstructor
@RestController
public class FormationController {
	private final FormationService formationservice;
	private final CategorieService categorieService;
	
	 @GetMapping(value = "/find/all")
	    public List<Formation> findAll( ){
	        return formationservice.findAll();
	    }

	 @GetMapping(value = "/find/categorie/{nom}")
	    public List<Formation>  findByCategorie(@PathVariable String nom ){
		    Categorie categorie =  categorieService.findByNom(nom);
	        return  formationservice.findByCategorie(categorie);
	    }
	 @GetMapping(value = "/find/{id}")
	    public Formation findById(@PathVariable long id  ){
	        return  formationservice.findbyId(id);
	    }
	 @PostMapping(value = "/add")
	    public long save(@RequestBody  Formation formation){
		   return formationservice.save(formation);
	    }
     
	 @GetMapping(value = "/Statistique")
	    public Integer findIncidentsStatut () {
	        return formationservice.stat();
	    }
	 @DeleteMapping(value = "/delete/{id}")
	   public void Delete(@PathVariable long id ){
		 Formation formation = formationservice.findbyId(id);
		 formationservice.delete(formation);
	    }
	  @PatchMapping("/update")//replace an existing Resource entirely  // @PatchMapping partial update
	    public String update(@RequestBody  Formation formation) {
		  formationservice.save(formation);
	        return "updated  success";
	    }
}
