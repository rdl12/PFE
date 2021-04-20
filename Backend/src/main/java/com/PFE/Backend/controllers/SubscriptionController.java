package com.PFE.Backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Repository.SubscriptionRepository;
import com.PFE.Backend.Services.SubscriptionService;
import com.PFE.Backend.entities.Subcription;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RequestMapping(value = "Subscription")
@AllArgsConstructor
@RestController
public class SubscriptionController {
	private final SubscriptionService subscriptionService;

	 @GetMapping(value = "/find/all")
	    public List<Subcription> findAll( ){
	        return subscriptionService.findAll();
	    }
}
