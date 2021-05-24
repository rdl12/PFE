package com.PFE.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.Entreprise;
import com.PFE.Backend.entities.Etat;

public interface EntrepriseRepository extends JpaRepository<Entreprise, Long>  {
	public Entreprise findById(long id);
}
