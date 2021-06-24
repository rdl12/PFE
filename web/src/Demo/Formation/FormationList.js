import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button, Image , FormControl, DropdownButton, Dropdown,Tab,Tabs} from 'react-bootstrap';
import { Link } from 'react-router-dom';


import Aux from "../../hoc/_Aux";
import {Fetch_Formations,Fetch_Categories} from '../../store/actions'
import List from './List'


function FormationList() {
 const dispatch = useDispatch()
 const formation = useSelector(state => state.formations)
 const categories = useSelector(state => state.categories)


    useEffect(() => {
       dispatch(Fetch_Formations())
       dispatch(Fetch_Categories())
    }, [])
    return (
        <Aux>
        <Card>
               <Card.Header>
               <Card.Title as="h5"> Liste des Formations </Card.Title>
               </Card.Header>
                  <Card.Body className='border-bottom' >
                  <div className="row" >
             {
          typeof categories !== "undefined" && categories.map(item => {
            let category = formation.filter(
              (formation) => formation.categorie.nom === item.nom
            );
            if (category.length != 0)
            {
              return <List key = {item.id} items={category} title={item.nom} to='/Formation/Detail/' width='200' height='200'  />
            }
          }
            )
        } 
        </div>
        </Card.Body>
      </Card>
               
        </Aux>
    )
}

export default FormationList
