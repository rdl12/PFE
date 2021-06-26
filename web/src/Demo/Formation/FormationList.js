import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Form, Col, Card,Dropdown,DropdownButton, Spinner} from 'react-bootstrap';
import { Link } from 'react-router-dom';


import Aux from "../../hoc/_Aux";
import {Fetch_Formations,Fetch_Categories,FetchFormationByCategorie} from '../../store/actions'
import List from './List'


function FormationList() {
 const dispatch = useDispatch()
 const formation = useSelector(state => state.formations)
 const categories = useSelector(state => state.categories)
 const [category,setCategory] = useState("")


    useEffect(() => {
       dispatch(Fetch_Formations())
       dispatch(Fetch_Categories())
    }, [])
    return (
        <Aux> 
        <Card>
               <Card.Header>
               <Card.Title as="h5"> Liste des Formations </Card.Title>
               <DropdownButton
                                title='filtrer par Categorie'
                                variant='primary'
                                drop='left'
                                id={`dropdown-variants-primary`}
                                style = {{float:'right'}}
                            >
                        {typeof categories !== "undefined" &&  categories.map((item,index) => 
                        <Dropdown.Item key= {index} eventKey={index}  onSelect = {(e) => {
                           dispatch(FetchFormationByCategorie(categories[e]))
                           setCategory(categories[e])
                              }} > <Form.Check
                              custom
                              type="radio"
                              label={item.nom}
                              value = {item.nom}
                              name="supportedRadios"
                              id="supportedRadio3"
                             checked = {category === categories[index]}
                           
                        />
                     </Dropdown.Item>)
                  }
                 <Dropdown.Divider />
            </DropdownButton>
               </Card.Header>
                  
                 {categories.length !== 0 && formation !== undefined ?( <Card.Body className='border-bottom' >
                 <div className="row" >
                                {
                              categories.map(item => {
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
                </Card.Body>):
                (<Spinner animation="border" variant="primary" style={{margin:20, display:'flex',alignSelf:'center' ,justifyContent:'center'}}/>)}
        
      </Card>
               
        </Aux>
    )
}

export default FormationList
