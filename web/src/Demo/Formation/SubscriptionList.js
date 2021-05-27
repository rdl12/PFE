import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card,Badge,Dropdown,DropdownButton,Form,Table,Tab,Tabs} from 'react-bootstrap';

import { Fetch_Subscribed_people } from '../../store/actions';
import Aux from "../../hoc/_Aux";

function SubscriptionList() {

    const  dispatch = useDispatch()
    const people_subbed = useSelector(state => state.personnes_inscrites)
    const [inscrits, setinscrits] = useState([])

     useEffect(() => {
        dispatch(Fetch_Subscribed_people())
        setinscrits(people_subbed)
     }, [people_subbed])


     let entreprise = typeof inscrits !== "undefined" && inscrits.filter((item) => item.entreprise !== null)
     let users = typeof inscrits !== "undefined" && inscrits.filter((item) => item.entreprise === null)
    return (
        <Aux>
        <Row>
            <Col>
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
                                {typeof users !== "undefined" &&  users.map(item => 
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
                            <th>Email</th>
                            <th>Entreprise</th>
                            <th>Tel entreprise</th>
                            <th>Formation</th>
                            <th>date d'inscription</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeof entreprise !== "undefined" && entreprise.map(item => 
                            <tr key = {item.id}>
                                <td>{item.user.firstName}</td>
                                <td>{item.user.email}</td>
                                <td>{item.entreprise.nom}</td>
                                <td>{item.entreprise.telephone}</td>
                                <td>{item.formation.nom}</td>
                                <td>{item.date_inscription}</td>
                            </tr>)
                            }
                        </tbody>
                </Table>    
        </Tab>     
        </Tabs>    
          </Col>
         </Row>
      </Aux>           
     
    )
}


export default SubscriptionList

