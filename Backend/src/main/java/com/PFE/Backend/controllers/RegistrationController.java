package com.PFE.Backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.PFE.Backend.Services.RegistrationService;
import com.PFE.Backend.entities.RegistrationRequest;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {
	
	
	private final RegistrationService registrationService ;


    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }
    
    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }


}
