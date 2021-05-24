package com.PFE.Backend.Services;

import java.util.List;
import java.util.Optional;

import org.locationtech.jts.geom.Point;
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
    
    public String getGeom(Float lat,Float lng) {
    	return defibrillateurRepository.getGeom(lat,lng);
    }
    
    public List<Defibrillateur> findDefibwithin100(Float lat,Float lng,Float d) {
    	return defibrillateurRepository.findDefibWithin100(lat,lng,d);
    }

    public List Defib_stat_etat() {
        return defibrillateurRepository.Defib_etat_stat();
    }
    
    public List Defib_stat_province() {
        return defibrillateurRepository.Defib_province_stat();
    }


	public List<Defibrillateur> findByVille(String ville) {
		return defibrillateurRepository.findByVille(ville);
	}
}
