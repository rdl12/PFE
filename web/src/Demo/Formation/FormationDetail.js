import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button, Badge , FormControl, DropdownButton, Modal,Table,Tab,Tabs} from 'react-bootstrap';
import {
    useParams
  } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Aux from "../../hoc/_Aux";
import {Delete_Formation,Add_Date, Fetch_Formation_ById,Fetch_Subscribed_people,Fetch_date_Formation,Delete_DateFormation,Delete_Subscription,Modify_subs,Set_Formation_byId} from '../../store/actions'


function FormationDetail() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const detail = useSelector(state => state.formationDetail)
    const people_subbed = useSelector(state => state.personnes_inscrites)
    const arrDate = useSelector(state => state.date_formation)
    const [value, onChange] = useState(new Date());
    const [dateAdded, setdateAdded] = useState([])
    const [inscrits, setinscrits] = useState([])
    const [Description, setDescription] = useState("")
    const [Formation, setFormation] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () =>{
        setdateAdded([])
        setShow(false)
    };
    const handleShow = () => setShow(true);


useEffect(() => {
 
    dispatch(Fetch_Formation_ById(id))
    dispatch(Fetch_Subscribed_people())
    dispatch(Fetch_date_Formation(id))
   

    if(detail != {}) { setFormation(detail)
        const filter_subbed =  people_subbed.filter(
          (sub) => sub.formation.nom === detail.nom 
        );
        setinscrits(filter_subbed)

    }

    setTimeout(() => { 
        {typeof inscrits !== "undefined" &&  inscrits.map((item) =>{ if (item.etat!="Traité")
        {item.etat="Traité"
         Modify_subs(item)}})}

    },500)

   return () => {dispatch(Set_Formation_byId({formationDetail:{}}))}
         
    }, [])

    const Modify = () => {
        handleShow()
    }
    const Delete = () => {
        dispatch(Delete_Formation(id))
        
    }

    const Delete_subs = (id) => {
      
        dispatch(Delete_Subscription(id))
        //window.location.href = "/Formation/Inscrit"
    }
    
    const Save = () => {
        dateAdded.map(item =>{
            
            let object = {
               "date":item,
               "formation":detail
                 
            }
            dispatch(Add_Date(object))
          })
          handleClose()
      
      
    }

    let entrprise = inscrits.filter((item) => item.entreprise !== null)
    let users = inscrits.filter((item) => item.entreprise === null)
    
    return (
        <div>
          {detail !== {}? 
          (<div className="row">
               <img className="col-sm4" src={detail.image} width ="200" height = "250"/>
               <div className="col-sm" style ={{margin:20, marginTop : 0}} >
                    <h3 className="font-weight-bold" > {detail.nom}</h3>
                    <Card style={{padding:10}}>
                        <p className="font-italic" >{detail.desription}</p>
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
                                        <h3 className="f-w-300">{detail.nbr_inscrit} / {detail.nbr_max}</h3>
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
                                        <h3 className="f-w-300">{detail.nbr_entreprise}</h3>
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
          {detail !== {} ? 
          (<Tabs defaultActiveKey="home">
    <Tab eventKey="home" title="Individus">
            <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>prenom</th>
                            <th>email</th>
                            <th>Telephone</th>
                            <th>Formation</th>
                            <th>date d'inscription</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {typeof inscrits !== "undefined" &&  users.map(item => 
                        <tr key = {item.id}  >
                            <td>{item.user.firstName}</td>
                            <td>{item.user.lastName}</td>
                            <td>{item.user.email}</td>
                            <td>{item.user.telephone}</td>
                            <td>{item.formation.nom}</td>
                            <td>{item.date_inscription}</td>
                            <td key = "supprimer" value={item.id} style={{cursor:"pointer", color:'red', fontSize:'bold'}} onClick={()=> Delete_subs(item.id)}>supprimer</td>
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
                            <th>Telephone</th>
                            <th>Entreprise</th>
                            <th>Tel entreprise</th>
                            <th>Formation</th>
                            <th>date d'inscription</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {typeof inscrits !== "undefined" && detail.nbr_entreprise !== 0 && entrprise.map(item => 
                        <tr key = {item.id}  onClick={()=> Delete_subs(item.id)}>
                            <td>{item.user.firstName}</td>
                            <td>{item.user.email}</td>
                            <td>{item.user.telephone}</td>
                            <td>{item.entreprise.nom}</td>
                            <td>{item.entreprise.telephone}</td>
                            <td>{item.formation.nom}</td>
                            <td>{item.date_inscription}</td>
                            <td key = "supprimer" value={item.id} style={{cursor:"pointer", color:'red', fontSize:'bold'}}>supprimer</td>
                        </tr>
                        )
                        }
                    </tbody>
            </Table>    
    </Tab>     
    </Tabs>) 
          : null}

    {Formation ? (  <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formBasicNom">
            <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows={9} value={Formation.desription}  onChange={e => setDescription(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicTelephone">
            <Row >
                <Col  xs={6}>
                    <Form.Label>Date</Form.Label>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        
                        onClickDay = {(value) => {  
                           
                            dateAdded.push(new Date(value.getTime() - (value.getTimezoneOffset() * 60000)).toISOString())}  }
                    />
                </Col>
                <Col  xs={6}>    {typeof arrDate !== "undefined" &&  arrDate.map((item,index) => {
                     let date = item.date.split('T')[0]
                    return <Badge key = {index} variant="light" className="mb-1 f-20 p-3" style={{borderRadius:20}}>
                      {date}<i className="feather icon-x text-c-black f-20 ml-3" onClick={()=>dispatch(Delete_DateFormation(item.id))}/>
                        </Badge>
                }) }
                 {typeof dateAdded !== "undefined" &&  dateAdded.map((item,index) => {
                   
                   return <Badge key = {index} variant="success" className="mb-1 f-20 p-3" style={{borderRadius:20}}>
                    {item.split('T')[0]} <i className="feather icon-x text-c-black f-20 ml-3" onClick={()=>dateAdded.pop(index)}/>
                       </Badge>
               }) }
                </Col>
              
             </Row>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={Save}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>):null}
           
        </div>
    )
}

export default FormationDetail