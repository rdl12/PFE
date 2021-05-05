import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button, Image , FormControl, DropdownButton, Dropdown,Table,Tab,Tabs} from 'react-bootstrap';
import {
    useParams
  } from "react-router-dom";

import Aux from "../../hoc/_Aux";
import {Fetch_Formation_ById,Fetch_Subscribed_people} from '../../store/actions'


function FormationDetail() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const detail = useSelector(state => state.formationDetail)
    const people_subbed = useSelector(state => state.personnes_inscrites)
    const [inscrits, setinscrits] = useState([])
    const [Formation, setFormation] = useState(null)

    useEffect(() => {
      dispatch(Fetch_Formation_ById(id))
      dispatch(Fetch_Subscribed_people())
      setFormation(detail)
      const filter_subbed =  people_subbed.filter(
        (sub) => sub.formation.nom === Formation.nom 
      );
      setinscrits(filter_subbed)
    }, [detail,people_subbed,Formation])

    const Modify = () => {
        console.log('modify')
    }
    const Delete = () => {
        console.log('delete')
    }
    return (
        <div>
          {Formation ? 
          (<div style = {{ display:'flex',flexDirection:'row', justifyContent: 'space-between'}}>
               <img src={Formation.image} width ="150px" height = "200px"/>
               <div style ={{margin:20, marginTop : 0}} >
                   <span > {Formation.nom}</span>
                   {Formation.desription}
                </div>
                <div>
                    <div>{Formation.nbr_inscrit}</div>
                    <div>test</div>
                    <div>{Formation.date_debut}</div>
                </div>
                <Button variant="primary" onClick = {Modify}>
                         Modifier
                </Button>
                <Button variant="primary" onClick = {Delete}>
                         supprimer
                </Button>
          </div>
          ) 
          : null}
           <Table striped responsive>
                <thead>
                        <tr>
                            <th>Nom</th>
                            <th>prenom</th>
                            <th>email</th>
                            <th>Formation</th>
                            <th>date d'inscription</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeof inscrits !== "undefined" &&  inscrits.map(item => 
                        <tr key = {item.id}>
                        <td>{item.user.firstName}</td>
                        <td>{item.user.lastName}</td>
                        <td>{item.user.email}</td>
                        <td>{item.formation.nom}</td>
                        <td>{item.date_inscription}</td>
                    
                    
                    </tr>)
                        }
                            
             </tbody>
             </Table>    
        </div>
    )
}

export default FormationDetail
