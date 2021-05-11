package com.PFE.Backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;


import com.PFE.Backend.Repository.SubscriptionRepository;
import com.PFE.Backend.entities.Boundary;
import com.PFE.Backend.entities.Subcription;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SubscriptionService {
	private final SubscriptionRepository SubsriptionRepo;
    
    public List<Subcription> findAll() {
        return SubsriptionRepo.findAll();
    }
    public void save(Subcription subscription) {
    	SubsriptionRepo.save(subscription);

    }
}
