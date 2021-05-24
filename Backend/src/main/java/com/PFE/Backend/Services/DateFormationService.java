package com.PFE.Backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.DateFormationRepository;
import com.PFE.Backend.entities.DateFormation;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Formation;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DateFormationService {
	private final DateFormationRepository dateRepo;
	
	  public List<DateFormation> findAll() {
	        return dateRepo.findAll();
	    }

	public void save(DateFormation date) {
		  dateRepo.save(date);
	}
	
	 public List<DateFormation> findByFormation(Formation formation) {
	        return  dateRepo.findByFormation(formation);
	    }

	public DateFormation findById(long id) {
		return  dateRepo.findById(id);
	}

	public void delete(DateFormation date) {
		dateRepo.delete(date);
		
	}
		
}
