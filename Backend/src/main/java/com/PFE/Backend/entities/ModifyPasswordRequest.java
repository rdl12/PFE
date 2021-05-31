package com.PFE.Backend.entities;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ModifyPasswordRequest {
	 private   String email ;
	 private   String password ;
	 private   String ancienpassword;
	  
	 
}
