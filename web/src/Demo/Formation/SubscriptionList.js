import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Table,Badge,Dropdown,DropdownButton,Form} from 'react-bootstrap';

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

    return (
        <Aux>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Personnes Inscrites</Card.Title>
                </Card.Header>
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
               </Card>
            </Col>
         </Row>
      </Aux>           
     
    )
}


export default SubscriptionList

