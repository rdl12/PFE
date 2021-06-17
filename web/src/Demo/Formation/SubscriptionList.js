import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card,Badge,Dropdown,DropdownButton,Button,Table,Tab,Tabs,Pagination,Form} from 'react-bootstrap';

import { Fetch_Subscribed_people, Delete_Subscription } from '../../store/actions';
import Aux from "../../hoc/_Aux";

function SubscriptionList() {

    const  dispatch = useDispatch()
    const people_subbed = useSelector(state => state.personnes_inscrites)
    const [inscrits, setinscrits] = useState([])
    const [page, setpage] = useState(1)
    const [index, setindex] = useState(0)
    const [number_per_page, setnumber_per_page] = useState(5)
    const [Epage, setEpage] = useState(1)
    const [Eindex, setEindex] = useState(0)
    const [Enumber_per_page, setEnumber_per_page] = useState(5)

    const Delete = (id) => {
        console.log("ggggg")
        dispatch(Delete_Subscription(id))
        //window.location.href = "/Formation/Inscrit"
    }

    const PaginationHandler = (page) =>{
        console.log(page)
        setpage(page)
        setindex(page*number_per_page-number_per_page)
    }

    const E_PaginationHandler = (page) =>{
        console.log(page)
        setEpage(page)
        setEindex(page*number_per_page-number_per_page)
    }

     useEffect(() => {
        dispatch(Fetch_Subscribed_people())
        setinscrits(people_subbed)
     }, [people_subbed])



     let entreprise = typeof inscrits !== "undefined" && inscrits.filter((item) => item.entreprise !== null)
     let users = typeof inscrits !== "undefined" && inscrits.filter((item) => item.entreprise === null)
     let users_filtred  = users.slice(index,index+number_per_page)
     let entreprise_filtred  = entreprise.slice(Eindex,Eindex+Enumber_per_page)
     let active = page;
     let Eactive = Epage;
     let activeItems = [];
     let EactiveItems = [];
    for (let number = 1; number <= users.length/number_per_page+1; number++) {
            activeItems.push(
                <Pagination.Item key={number} active={number === active} onClick = {() => PaginationHandler(number)}>
                    {number}
                </Pagination.Item>
            );
        }
    
    for (let number = 1; number <= entreprise.length/Enumber_per_page+1; number++) {
            EactiveItems.push(
                <Pagination.Item key={number} active={number === Eactive} onClick = {() => E_PaginationHandler(number)}>
                    {number}
                </Pagination.Item>
            );
        }
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
                                {typeof users !== "undefined" &&  users_filtred.map(item => 
                                <tr key = {item.id} onClick={()=> Delete(item.id)}>
                                    <td>{item.user.firstName}</td>
                                    <td>{item.user.lastName}</td>
                                    <td>{item.user.email}</td>
                                    <td>{item.formation.nom}</td>
                                    <td>{item.date_inscription}</td>
                                    <td key = "supprimer" value={item.id} style={{cursor:"pointer", color:'red', fontSize:'bold'}}>supprimer</td>
                                </tr>
                                )
                                }
                            </tbody>
                            </Table>  
                            <hr/>
                            <Row>
                                     <Col  sm={10}>
                                        <Pagination  >
                                            <Pagination.First />
                                                <Pagination.Prev />
                                                    {activeItems}
                                                <Pagination.Next />
                                            <Pagination.Last />
                                        </Pagination>
                                        </Col>
                                    <Col  sm={2}>
                                        <Form.Control as="select"  onChange = {(e) =>{setnumber_per_page(e.target.value)}} >
                                        <option  key={'choisir'} value='choisissez le nombre d element par page'> {number_per_page}  </option>
                                        <option  key={1} value={5}> 5 </option>
                                        <option  key={2} value={10}> 10 </option>
                                        <option  key={3} value={20}> 20 </option>
                                        <option  key={4} value={30}> 30 </option>
                                    </Form.Control>
                                    </Col>
                               </Row>
                      
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
                            {typeof entreprise !== "undefined" && entreprise_filtred.map(item => 
                            <tr key = {item.id} onClick={()=> Delete(item.id)}>
                                <td>{item.user.firstName}</td>
                                <td>{item.user.email}</td>
                                <td>{item.entreprise.nom}</td>
                                <td>{item.entreprise.telephone}</td>
                                <td>{item.formation.nom}</td>
                                <td>{item.date_inscription}</td>
                                <td key = "supprimer" value={item.id} style={{cursor:"pointer", color:'red', fontSize:'bold'}}>supprimer</td>
                            </tr>)
                            }
                        </tbody>
                </Table> 
                                <Row>
                                     <Col  sm={10}>
                                        <Pagination  >
                                            <Pagination.First />
                                                <Pagination.Prev />
                                                    {EactiveItems}
                                                <Pagination.Next />
                                            <Pagination.Last />
                                        </Pagination>
                                        </Col>
                                    <Col  sm={2}>
                                        <Form.Control as="select"  onChange = {(e) =>{setEnumber_per_page(e.target.value)}} >
                                        <option  key={'choisir'} value='choisissez le nombre d element par page'> {Enumber_per_page}  </option>
                                        <option  key={1} value={5}> 5 </option>
                                        <option  key={2} value={10}> 10 </option>
                                        <option  key={3} value={20}> 20 </option>
                                        <option  key={4} value={30}> 30 </option>
                                    </Form.Control>
                                    </Col>
                               </Row>   
        </Tab>     
        </Tabs>    
          </Col>
         </Row>
      </Aux>           
     
    )
}


export default SubscriptionList

