package com.PFE.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.PFE.Backend.entities.Categorie;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Formation;

public interface FormationRepository extends JpaRepository<Formation,Long> {
	public Formation findById(long id);
	List<Formation> findByCategorie(Categorie categorie);
	@Query(value="select sum(CAST(nbr_inscrit as INTEGER)) AS \"Total Inscrits\"\r\n" + "from formation ",nativeQuery = true)
    Integer  stat();


}
