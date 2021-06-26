package com.PFE.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.PFE.Backend.entities.Product;
import com.PFE.Backend.entities.ProductCategory;

public interface ProductRepository extends JpaRepository<Product,Long> {
	public Product findById(long id);

	public List<Product> findByCategorie(ProductCategory categorie);
}
