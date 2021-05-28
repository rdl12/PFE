package com.PFE.Backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Services.AppUserService;
import com.PFE.Backend.Services.RegistrationService;
import com.PFE.Backend.entities.AppUser;
import com.PFE.Backend.entities.Boundary;
import com.PFE.Backend.entities.Province;

import lombok.AllArgsConstructor;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "User")
@AllArgsConstructor
public class AppUserController {
	
	private final AppUserService appUserService;
	 @GetMapping(value = "/find/{email}")
	    public Optional<AppUser>  findByEmail(@PathVariable String email){
	        return appUserService.findByEmail(email);
	    }
	 @PostMapping(value = "/forgot-password/{email}")
	    public String forgotPassword(@RequestBody String email){
		 return appUserService.ResetPassword(email);
	    }
	 @GetMapping(value = "/resetPassword")
	    public String Reset(){
	        return "Reset";
	    }
}
