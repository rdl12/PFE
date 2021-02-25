package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.ProvinceRepository;
import com.PFE.Backend.entities.Province;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProvinceService {

	 private final ProvinceRepository provinceRepository;
	
	 
	    public Province findByID(long id) {
	        return  provinceRepository.findById(id);
	    }
	    
	    
	    public List<Province> findAll() {
	        return provinceRepository.findAll();
	    }

}
