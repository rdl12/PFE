package com.PFE.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.Entreprise;

public interface EntrepriseRepository extends JpaRepository<Entreprise, Long>  {

}
