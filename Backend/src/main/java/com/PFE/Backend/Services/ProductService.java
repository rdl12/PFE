package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;
import com.PFE.Backend.Repository.ProductRepository;
import com.PFE.Backend.entities.Product;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class ProductService {
private final ProductRepository ProductRepo;
	
    public List<Product> findAll() {
        return ProductRepo.findAll();
    }

}
