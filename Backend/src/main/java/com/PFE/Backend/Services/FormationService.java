package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;


import com.PFE.Backend.Repository.FormationRepository;
import com.PFE.Backend.entities.Categorie;
import com.PFE.Backend.entities.Formation;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FormationService {
	private final FormationRepository FormationRepo;
	
    public List<Formation> findAll() {
        return FormationRepo.findAll();
    }

	public List<Formation> findByCategorie(Categorie categorie) {
		
		 return FormationRepo.findByCategorie(categorie);
	}

	public Formation findbyId(long id) {
		return  FormationRepo.findById(id);	}
}
