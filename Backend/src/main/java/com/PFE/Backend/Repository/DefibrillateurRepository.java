package com.PFE.Backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PFE.Backend.entities.AppUser;
import com.PFE.Backend.entities.Defibrillateur;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Province;

public interface DefibrillateurRepository extends JpaRepository<Defibrillateur,Long> {
	public Defibrillateur findById(long Id);
	List<Defibrillateur> findByEtat(Etat etat);
    List<Defibrillateur> findByProvince(Province province);
    List<Defibrillateur> findByUser(Optional<AppUser> user);
    

}
