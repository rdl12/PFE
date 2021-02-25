package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.EtatRepository;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Province;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EtatService {
	
	private final EtatRepository etatRepository;
	
	 public Etat findByID(long id) {
	        return  etatRepository.findById(id);
	    }
	    
	    
	    public List<Etat> findAll() {
	        return etatRepository.findAll();
	    }

}
