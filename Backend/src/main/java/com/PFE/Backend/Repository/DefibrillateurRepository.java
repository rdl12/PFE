package com.PFE.Backend.Repository;

import java.util.List;
import java.util.Optional;

import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.PFE.Backend.entities.AppUser;
import com.PFE.Backend.entities.Defibrillateur;
import com.PFE.Backend.entities.Etat;
import com.PFE.Backend.entities.Province;

public interface DefibrillateurRepository extends JpaRepository<Defibrillateur,Long> {
	public Defibrillateur findById(long Id);
	List<Defibrillateur> findByEtat(Etat etat);
    List<Defibrillateur> findByProvince(Province province);
    List<Defibrillateur> findByUser(Optional<AppUser> user);
    List<Defibrillateur> findByVille(String ville);
    
    @Query( value="Select CAST (ST_SetSRID(ST_MakePoint(?2,?1),4326) AS varchar(255))", nativeQuery = true)
  	public String  getGeom(@Param("lat") Float lat,@Param("lon") Float lon); 
    
    @Query( value="SELECT * FROM defib\r\n" + "WHERE ST_DWithin(geom,ST_SetSRID(ST_MakePoint(?2,?1),4326), ?3*0.01);", nativeQuery = true)
    public List<Defibrillateur> findDefibWithin100(@Param("lat") Float lat,@Param("lon") Float lon,@Param("d") Float d);
    
    @Query(value="select etat ,count(*) from defib i join etat e  on i.etat_id = e.id group by etat",nativeQuery = true)
    List  Defib_etat_stat();
    
    @Query(value="select ville ,count(*) from defib group by ville",nativeQuery = true)
    List  Defib_province_stat();
	
}
