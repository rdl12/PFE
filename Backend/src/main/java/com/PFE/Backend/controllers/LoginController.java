package com.PFE.Backend.controllers;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Enum.AppUserRole;
import com.PFE.Backend.entities.AppUser;

import lombok.AllArgsConstructor;


@CrossOrigin(origins = "*",allowedHeaders = "*")
@AllArgsConstructor
@RestController
public class LoginController {

	
	 @GetMapping("/success_login")
		public AppUser success(HttpServletResponse request) {
		 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		 try {
			System.out.println(request.getOutputStream().toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		 String Authority = AppUserRole.ADMIN.toString();
//		 System.out.println(request.isUserInRole(Authority));
		    AppUser user =  new AppUser(
                   "name",
                   "lastname",
                    "email",
                    "Telephone",
                   "password",
                    AppUserRole.USER

            );
		    
		      
			return user;
		}
}
