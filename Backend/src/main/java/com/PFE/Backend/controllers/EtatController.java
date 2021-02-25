package com.PFE.Backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Services.EtatService;
import com.PFE.Backend.entities.Etat;

import lombok.AllArgsConstructor;

@RequestMapping(value = "Etat")
@AllArgsConstructor
@RestController
public class EtatController {
	
	private final EtatService etatService;
	 @GetMapping(value = "/find/{id}")
	    public Etat findByID(@PathVariable long id ){
	        return etatService.findByID(id);
	    }
	 @GetMapping(value = "/find/all")
	    public List<Etat> findAll( ){
	        return etatService.findAll();
	    }

}
