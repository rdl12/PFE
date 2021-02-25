package com.PFE.Backend.Services;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.PFE.Backend.Repository.AppUserRepository;
import com.PFE.Backend.entities.AppUser;
import com.PFE.Backend.entities.ConfirmationToken;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;



@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService  {

	 private final static String USER_NOT_FOUND_MSG =
	            "user with email %s not found";

	 private final AppUserRepository appUserRepository;
	 private final BCryptPasswordEncoder bCryptPasswordEncoder;
	 private final ConfirmationTokenService confirmationTokenService;
	 
	 
	  @Override
	    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		  return appUserRepository.findByEmail(email)
	                .orElseThrow(() ->
	                        new UsernameNotFoundException(
	                                String.format(USER_NOT_FOUND_MSG, email)));
	    }
	  
	  
	  public String signUpUser(AppUser appUser) {
		    System.out.println("-------------"+appUser.getEmail());
		   boolean userExists = appUserRepository.findByEmail(appUser.getEmail())
	                                             .isPresent();

	        if (userExists) {
	            //  check of attributes are the same and
	            // if email not confirmed send confirmation email.
	        	  AppUser appUserOld = appUserRepository.findByEmail(appUser.getEmail()).get();
	              Boolean enabled = appUserOld.getEnabled();

	              if (!enabled) {

	                  String token = UUID.randomUUID().toString();

	                  saveConfirmationToken(appUserOld, token);

	                  return token;
	              }

	            throw new IllegalStateException("email already taken");
	        }
	        
	        String encodedPassword = bCryptPasswordEncoder
	                .encode(appUser.getPassword());
	        appUser.setPassword(encodedPassword);
	        appUserRepository.save(appUser);
	        
            //Send Confirmation Token to user
            String token = UUID.randomUUID().toString();
            saveConfirmationToken(appUser, token);

            return token;
        }

        private void saveConfirmationToken(AppUser appUser, String token) {

            ConfirmationToken confirmationToken = new ConfirmationToken(
                    token,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    appUser
            );
            
            confirmationTokenService.saveConfirmationToken(confirmationToken);
           
	  }
	  
	  public int enableAppUser(String email) {
	        return appUserRepository.enableAppUser(email);
	    }


	public Optional<AppUser> findByEmail(String email) {
		// TODO Auto-generated method stub
		return appUserRepository.findByEmail(email);
	}
	  
	  
	  
}
