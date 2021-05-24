package com.PFE.Backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Services.ProductService;
import com.PFE.Backend.entities.Formation;
import com.PFE.Backend.entities.Product;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RequestMapping(value = "Product")
@AllArgsConstructor
@RestController
public class ProductController {
	private final ProductService productService;
	
	 @GetMapping(value = "/find/all")
	    public List<Product> findAll( ){
	        return productService.findAll();
	    }
	 @GetMapping(value = "/find/{id}")
	    public Product findById(@PathVariable long id  ){
	        return  productService.findbyId(id);
	    }
	 @PostMapping(value = "/add")
	    public void save(@RequestBody   Product product){
		 productService.save(product);
	    }
	 @DeleteMapping(value = "/delete/{id}")
	   public void Delete(@PathVariable long id ){
		 Product product = productService.findbyId(id);
		 productService.delete(product);
	    }
}
