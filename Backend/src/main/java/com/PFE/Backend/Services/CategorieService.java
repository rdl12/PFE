package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.CategorieRepository;
import com.PFE.Backend.entities.Categorie;
import com.PFE.Backend.entities.Defibrillateur;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Formation;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategorieService {
	private final CategorieRepository categorieRepo;
	    
	    public List<Categorie> findAll() {
	        return categorieRepo.findAll();
	    }
	    
	    public Categorie findByNom(String nom) {
	        return categorieRepo.findByNom(nom);
	    }
	    public void save(Categorie category) {
	    	categorieRepo.save(category);
		
	}

		public Categorie findById(long id) {
			 return categorieRepo.findById(id);
		}
}
