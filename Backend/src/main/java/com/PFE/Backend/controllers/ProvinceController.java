package com.PFE.Backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Services.ProvinceService;
import com.PFE.Backend.Services.RegistrationService;
import com.PFE.Backend.entities.Province;

import lombok.AllArgsConstructor;

@RequestMapping(value = "Province")
@AllArgsConstructor
@RestController
public class ProvinceController {

	private final ProvinceService provinceService;
	 @GetMapping(value = "/find/{id}")
	    public Province findByID(@PathVariable long id ){
	        return provinceService.findByID(id);
	    }
	 @GetMapping(value = "/find/all")
	    public List<Province> findAll( ){
	        return provinceService.findAll();
	    }
}
