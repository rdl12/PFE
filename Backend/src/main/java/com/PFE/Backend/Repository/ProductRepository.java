package com.PFE.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.PFE.Backend.entities.Product;

public interface ProductRepository extends JpaRepository<Product,Long> {
	public Product findById(long id);
}
