package com.PFE.Backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Services.CategorieService;
import com.PFE.Backend.Services.FormationService;
import com.PFE.Backend.entities.Categorie;
import com.PFE.Backend.entities.Defibrillateur;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Formation;

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
     
}
