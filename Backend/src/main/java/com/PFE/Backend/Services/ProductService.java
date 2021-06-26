package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;
import com.PFE.Backend.Repository.ProductRepository;
import com.PFE.Backend.entities.Formation;
import com.PFE.Backend.entities.Product;
import com.PFE.Backend.entities.ProductCategory;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class ProductService {
private final ProductRepository ProductRepo;
	
    public List<Product> findAll() {
        return ProductRepo.findAll();
    }

	public Product findbyId(long id) {
		return  ProductRepo.findById(id);	}
	
	public void save(Product product) {
		ProductRepo.save(product);	
}

	public void delete(Product product) {
		ProductRepo.delete(product);
	}

	public List<Product> findbyCategorie(ProductCategory categorie) {
		return ProductRepo.findByCategorie(categorie);
	}

}
