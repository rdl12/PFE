package com.PFE.Backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.PFE.Backend.Services.EntrepriseService;
import com.PFE.Backend.entities.Entreprise;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RequestMapping(value = "Entreprise")
@AllArgsConstructor
@RestController
public class EntrepriseController {
	private final EntrepriseService entrepriseService;
	
	 @GetMapping(value = "/find/all")
	    public List<Entreprise> findAll( ){
	        return entrepriseService.findAll();
	    }
	 @PostMapping(value = "/add")
	    public void save(@RequestBody Entreprise entreprise){
		    entrepriseService.save(entreprise);
	    }
}
