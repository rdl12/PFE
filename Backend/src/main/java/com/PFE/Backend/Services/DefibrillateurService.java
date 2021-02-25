package com.PFE.Backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.DefibrillateurRepository;
import com.PFE.Backend.entities.AppUser;
import com.PFE.Backend.entities.Defibrillateur;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Province;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DefibrillateurService {
	
	private final DefibrillateurRepository defibrillateurRepository;
	public Defibrillateur findByID(long id) {
        return  defibrillateurRepository.findById(id);
    }
    
    
    public List<Defibrillateur> findAll() {
        return defibrillateurRepository.findAll();
    }
	
    public List<Defibrillateur> findByEtat(Etat etat) {
        return defibrillateurRepository.findByEtat(etat);
    }
	
    public List<Defibrillateur> findByProvince(Province province) {
        return defibrillateurRepository.findByProvince(province);
    }
    
    public List<Defibrillateur> findByUser(Optional<AppUser> user) {
    	return defibrillateurRepository.findByUser(user);
    }
    
    public void save(Defibrillateur defibrillateur) {
        defibrillateurRepository.save(defibrillateur);

    }

}
