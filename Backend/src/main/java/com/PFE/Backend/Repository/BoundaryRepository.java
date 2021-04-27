package com.PFE.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.Boundary;
import com.PFE.Backend.entities.Defibrillateur;


public interface BoundaryRepository extends JpaRepository<Boundary,Long>  {
	
	public Boundary findById(long Id);
}
