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

      setTimeout(() => { setFormation(detail)
        const filter_subbed =  people_subbed.filter(
          (sub) => sub.formation.nom === detail.nom 
        );
        setinscrits(filter_subbed)},200)
     
    }, [Formation])

    const Modify = () => {
        console.log('modify')
    }
    const Delete = () => {
        console.log('delete')
    }
    return (
        <div>
          {Formation ? 
          (<div className="row">
               <img className="col-sm4" src={Formation.image} width ="200" height = "250"/>
               <div className="col-sm" style ={{margin:20, marginTop : 0}} >
                    <h3 className="font-weight-bold" > {Formation.nom}</h3>
                    <Card style={{padding:10}}>
                        <p className="font-italic" >{Formation.desription}</p>
                    </Card>
                </div>
                <div className="col-sm4">
                        <Card>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-user-check f-30 text-c-green"/>
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{Formation.nbr_inscrit} / {Formation.nbr_max}</h3>
                                        <span className="d-block text-uppercase">Nombre d'inscription (Individu)</span>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-briefcase f-30 text-c-blue"/>
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">26</h3>
                                        <span className="d-block text-uppercase">Nombre d'inscription (Entreprise)</span>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col">
                                    <Button variant="primary" onClick = {Modify}>
                                        Modifier
                                    </Button>
                                    </div>
                                    <div className="col">
                                    <Button variant="primary" onClick = {Delete}>
                                            supprimer
                                    </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                </div>
                
          </div>
          ) 
          : null}
          <Tabs defaultActiveKey="home">
    <Tab eventKey="home" title="Individus">
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
    </Tab>
    <Tab eventKey="profile" title="Entreprise">
            <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Entreprise</th>
                            <th>Telephone</th>
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
    </Tab>     
    </Tabs>
           
        </div>
    )
}

export default FormationDetail
