package com.PFE.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.PFE.Backend.entities.DateFormation;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Formation;

public interface DateFormationRepository extends JpaRepository<DateFormation,Long>  {
	
	
	public List<DateFormation> findByFormation(Formation formation);
	public DateFormation findById(long id);
}
