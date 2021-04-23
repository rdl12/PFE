package com.PFE.Backend.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Services.BoundaryService;
import com.PFE.Backend.entities.Boundary;
import com.PFE.Backend.entities.Defibrillateur;
import com.PFE.Backend.entities.Etat;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RequestMapping(value = "Boundary")
@AllArgsConstructor
@RestController
public class BoundaryController {
	
	private final BoundaryService boundaryService;

	 @GetMapping(value = "/find/all")
	    public List<Boundary> findAll( ){
	        return boundaryService.findAll();
	    }
	 @PostMapping(value = "/add_Boundary")
	    public void save(@RequestBody Boundary boundary){
	        boundaryService.save(boundary);
	    }
}
