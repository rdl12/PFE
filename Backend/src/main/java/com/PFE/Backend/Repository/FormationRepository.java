package com.PFE.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.Categorie;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Formation;

public interface FormationRepository extends JpaRepository<Formation,Long> {
	public Formation findById(long id);
	List<Formation> findByCategorie(Categorie categorie);

}
