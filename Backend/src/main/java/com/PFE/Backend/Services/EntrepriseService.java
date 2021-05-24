package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.EntrepriseRepository;
import com.PFE.Backend.entities.Entreprise;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Formation;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EntrepriseService {
	private final EntrepriseRepository entrepriseRepo;
	
	public long save(Entreprise entreprise) {
		    entrepriseRepo.save(entreprise);
		    return entreprise.getId();
	}

	public List<Entreprise> findAll() {
		 return  entrepriseRepo.findAll();
	}
	 public Entreprise findByID(long id) {
	        return  entrepriseRepo.findById(id);
	    }
	    
	
}
