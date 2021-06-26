package com.PFE.Backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.Categorie;



public interface CategorieRepository extends JpaRepository<Categorie,Long> {

	Categorie findByNom(String nom);
	public Categorie findById(long id);

}
