package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.ProductCategoryRepository;
import com.PFE.Backend.entities.Categorie;
import com.PFE.Backend.entities.ProductCategory;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductCategorieService {
	private final ProductCategoryRepository categorieRepo;
    
    public List<ProductCategory> findAll() {
        return categorieRepo.findAll();
    }
    public void save(ProductCategory category) {
    	categorieRepo.save(category);
	
}
}
