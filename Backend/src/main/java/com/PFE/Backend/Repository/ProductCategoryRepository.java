package com.PFE.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {

	

}
