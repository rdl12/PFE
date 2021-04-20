package com.PFE.Backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.PFE.Backend.Services.FormationService;
import com.PFE.Backend.entities.Formation;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RequestMapping(value = "Formation")
@AllArgsConstructor
@RestController
public class FormationController {
	private final FormationService formationservice;
	
	 @GetMapping(value = "/find/all")
	    public List<Formation> findAll( ){
	        return formationservice.findAll();
	    }

}
