package com.PFE.Backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Services.ProductCategorieService;
import com.PFE.Backend.entities.ProductCategory;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RequestMapping(value = "ProductCategory")
@AllArgsConstructor
@RestController
public class ProductCategoryController {
	private final ProductCategorieService categorieService;
	
	
	 @GetMapping(value = "/find/all")
	    public List<ProductCategory> findAll( ){
	        return categorieService.findAll();
	    }
}