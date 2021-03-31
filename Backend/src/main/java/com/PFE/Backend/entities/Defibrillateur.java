package com.PFE.Backend.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "defib")
public class Defibrillateur {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id_defib", unique = true,nullable = false)
    private long Id;
	@Column(name = "date")
    private LocalDateTime date;
	@Column(name = "description")
    private String description;
	@Column(name = "latitude")
    private float latitude;
	@Column(name = "longitude")
    private float longitude;
	@Column(name = "photo")
    private String photo;
	@Column(name = "motif")
    private String motif;
	@Column(name = "marque_defib")
    private String marque_defib;
	@Column(name = "geom")
    private String geom;
	@Column(name = "type_electrode")
    private String type_electrode;
	@Column(name = "accesibillité")
    private String accesibillité;
	@Column(name = "nom")
    private String nom;
	@Column(name = "telephone")
    private Integer telephone;
	@Column(name = "adresse")
    private String adresse;
	@Column(name = "ville")
    private String ville;
	@Column(name = "province")
    private String province;
	
    @ManyToOne
    private Etat etat;
    
    @ManyToOne
    private AppUser user;

    @ManyToOne
    private Province prov;
}
