package com.PFE.Backend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "formation")
public class Formation {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id", unique = true,nullable = false)
    private long id;
	@Column(name = "nom")
    private String nom;
	@Column(name = "desription")
    private String desription;
	@Column(name = "date_debut")
    private String date_debut;
	@Column(name = "date_fin")
    private String date_fin;
	@Column(name = "nbr_inscrit")
    private String nbr_inscrit;
	@Column(name = "nbr_max")
    private String nbr_max;
	@Column(name = "image")
    private String image;
   @ManyToOne
	private Categorie categorie;

}
