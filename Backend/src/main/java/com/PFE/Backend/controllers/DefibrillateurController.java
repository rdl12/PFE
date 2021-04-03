package com.PFE.Backend.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.locationtech.jts.geom.Point;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Services.AppUserService;
import com.PFE.Backend.Services.DefibrillateurService;
import com.PFE.Backend.Services.EtatService;
import com.PFE.Backend.Services.ProvinceService;
import com.PFE.Backend.entities.AppUser;
import com.PFE.Backend.entities.Defibrillateur;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Province;

import lombok.AllArgsConstructor;


@RequestMapping(value = "Defibrillateur")
@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class DefibrillateurController {
	
	private final DefibrillateurService defibrillateurService;
	private final ProvinceService provinceService;
	private final EtatService etatService;
	private final AppUserService appUserService;
	
	 @GetMapping(value = "/find/{id}")
	    public Defibrillateur findByID(@PathVariable long id ){
	        return defibrillateurService.findByID(id);
	    }
	 @GetMapping(value = "/find/all")
	    public List<Defibrillateur> findAll( ){
	        return defibrillateurService.findAll();
	    }
	 @GetMapping(value = "/find/province/{id}")
	    public List<Defibrillateur> findProvince(@PathVariable long id) {
	        Province province=provinceService.findByID(id);
	        return defibrillateurService.findByProvince(province);
	    }
	 @GetMapping(value = "/find/etat/{id}")
	    public List<Defibrillateur> findEtat(@PathVariable long id) {
	        Etat etat=etatService.findByID(id);
	        return defibrillateurService.findByEtat(etat);
	    }
	 @GetMapping(value = "/find/user/{email}")
	    public List<Defibrillateur> findUser(@PathVariable String email) {
	        Optional<AppUser> user=appUserService.findByEmail(email);
	        return defibrillateurService.findByUser(user);
	    }
	 @PostMapping(value = "/add")
	    public void save(@RequestBody   Defibrillateur defibrillateur){
	        
		    defibrillateur.setDate(LocalDateTime.now());
	        Etat s = new Etat(1,"signalé");
	        Float lat= (Float) defibrillateur.getLatitude();
	        Float lng= (Float) defibrillateur.getLongitude();
	        String geom = defibrillateurService.getGeom(lat,lng);
	        System.out.println(""+geom);
	        defibrillateur.setGeom(geom);
	        //defibrillateur.setEtat(s);
	        defibrillateurService.save(defibrillateur);
	    }
	
	  @PatchMapping("/update")//replace an existing Resource entirely  // @PatchMapping partial update
	    public String update(@RequestBody Defibrillateur defibrillateur) {
            defibrillateurService.save(defibrillateur);
	        return "updated  success";
	    }
	
	 @GetMapping(value = "/findDefibIn100/lat={lat}&lng={lng}")
	 public List<Defibrillateur> findDefibin100(@PathVariable Float lat,@PathVariable Float lng ){
		 return defibrillateurService.findDefibwithin100(lat,lng);
	 }
	 
	 @GetMapping(value = "/etat/Statistique")
	    public List findIncidentsStatut () {
	        return defibrillateurService.Defib_stat_etat();
	    }
	 
	 @GetMapping(value = "/province/Statistique")
	    public List findIncidentsProvince () {
	        return defibrillateurService.Defib_stat_province();
	    }
}
