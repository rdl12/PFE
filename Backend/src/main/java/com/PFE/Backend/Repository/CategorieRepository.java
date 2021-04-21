package com.PFE.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.Categorie;


public interface CategorieRepository extends JpaRepository<Categorie,Long> {

	Categorie findByNom(String nom);

}
