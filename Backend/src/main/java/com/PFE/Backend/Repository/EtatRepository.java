package com.PFE.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.Etat;

public interface EtatRepository extends JpaRepository<Etat,Long> {
	public Etat findById(long id);
}
