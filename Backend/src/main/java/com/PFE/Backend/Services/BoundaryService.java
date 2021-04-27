package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.BoundaryRepository;
import com.PFE.Backend.entities.Boundary;
import com.PFE.Backend.entities.Defibrillateur;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoundaryService {
	private final BoundaryRepository boundaryRepo;
    
    public List<Boundary> findAll() {
        return boundaryRepo.findAll();
    }
    
    public void save(Boundary boundary) {
    	boundaryRepo.save(boundary);

    }

	public Boundary findByID(long id) {
		 return  boundaryRepo.findById(id);
	}

}
