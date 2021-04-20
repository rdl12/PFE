package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.CategorieRepository;
import com.PFE.Backend.entities.Categorie;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategorieService {
	private final CategorieRepository categorieRepo;
	    
	    public List<Categorie> findAll() {
	        return categorieRepo.findAll();
	    }

}
