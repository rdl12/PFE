package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.EntrepriseRepository;
import com.PFE.Backend.entities.Entreprise;


import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EntrepriseService {
	private final EntrepriseRepository entrepriseRepo;
	
	public void save(Entreprise entreprise) {
		    entrepriseRepo.save(entreprise);
		
	}

	public List<Entreprise> findAll() {
		 return  entrepriseRepo.findAll();
	}
}
