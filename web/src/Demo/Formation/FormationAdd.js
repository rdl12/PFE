import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button, Badge , FormControl, InputGroup, Dropdown,Tab,Tabs,Toast,Modal} from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';

import Aux from "../../hoc/_Aux";
import {Add_Formation,Fetch_Categories,add_Category,Add_Date} from '../../store/actions'
import * as actionTypes from "../../store/actionsTypes";

function FormationAdd() {
    const [NomCategorie, setNomCategorie] = useState('')
    const [DescriptionCategorie, setDescriptionCategorie] = useState('')
    const [Nom, setNom] = useState("")
    const [Description, setDescription] = useState("")
    const [nbrmax, setnbrmax] = useState(0)
    const [Image, setImage] = useState("")
    const [value, onChange] = useState(new Date());
    const [Categories, setCategories] = useState([])
    const [arrDate, setarrDate] = useState([])
    const [i, seti] = useState(0)
    const [dateChoosed, setdateChoosed] = useState(false)
    const [CategorieChoosed, setCategorieChoosed] = useState("")
    const formation_categories = useSelector(state => state.categories)
    const showA = useSelector(state => state.showToast)
    let history = useHistory();
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const Save = () => {
        setShow(false)
        const object = {
            "nom":NomCategorie,
            "description":DescriptionCategorie
        }
        dispatch(add_Category(object))
    };
    useEffect(() => {
        dispatch(Fetch_Categories())
        setCategories(formation_categories)
    }, [formation_categories])
   
   const submit = () => {
    let categorie_filterd = Categories.filter(
        (category) => category.nom === CategorieChoosed 
      );
    const formation = {
        "nom":Nom,
        "desription":Description,
        "nbr_inscrit":0,
        "nbr_max":nbrmax,
        "image":Image,
        "categorie":categorie_filterd[0],
    }
    dispatch(Add_Formation(formation,arrDate))
    history.push('/Formation/Ajouter');
    setNom("")
    setDescription("")
    setnbrmax("")
    setImage("")
    
    dispatch({type: actionTypes.SHOW_TOAST,show:true})
   
   }
   const change = (e) => {
    setCategorieChoosed(e.target.value)
    if(e.target.value == 'Ajouter Categorie'){
        handleShow()
    }
   }
    return (
        <Aux>
        <Row>
            <Col>
         <Card>
                    <Card.Header>
                        <Card.Title as="h5">Ajouter une Formation</Card.Title>
                        <span className="d-block m-t-8"></span>
                    </Card.Header>
                    <Card.Body>
                    <Form>
                        <Form.Group controlId="formBasicNom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="email" placeholder="Nom de la formation" value={Nom}  onChange={e => setNom(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicTelephone">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Description" value={Description} onChange={e => setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="Categories">
                        <Form.Label>Categorie</Form.Label>
                        <Form.Control as="select" onChange = {(e) => change(e)} >
                            <option  key={'choisir'} value='choisissez votre categorie'> choisissez la categorie de la formation  </option>
                             {Categories.map((item) => <option  key={item.id} value={item.nom}> {item.nom} </option>)}
                             <option  key={'ajouter'} value='Ajouter Categorie' onClick={() => console.log('hello')} > Ajouter Categorie </option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicMarque">
                        <Form.Label>nbr max</Form.Label>
                        <Form.Control type="email" placeholder="nombre max" value={nbrmax} onChange={e => setnbrmax(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicMarque">
                        <Form.Label>image</Form.Label>
                        <Form.Control type="email" placeholder="image" value={Image} onChange={e => setImage(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicMarque">
                        <Form.Label>date de Formation</Form.Label>
                        <Row >
                            <Col  xs={6}>
                                <Calendar
                                    onChange={onChange}
                                    value={value}
                                    onClickDay = {(value) => {  arrDate.push(value)}  }
                                    style = {{margin:0}}
                                />
                            </Col>
                            <Col  xs={6}>    { arrDate.map((item,index) => {
                            return <Badge key = {index} variant="light" className="mb-1 f-20 p-3" style={{borderRadius:20}}>{item.getDate()}/{item.getDay()}/{item.getFullYear()}<i className="feather icon-x text-c-black f-20 ml-3" onClick={()=>arrDate.pop(index)}/></Badge>
                           }) }</Col>
                        </Row>
                       </Form.Group>
                        
                      </Form>
                      <Button variant="primary" onClick = {submit} style={{float : "right"}}>
                         Ajouter
                     </Button>
                    </Card.Body>
            </Card>
          
    

</Col> 
       </Row>
           <Toast show={showA} onClose={() =>  dispatch({type: actionTypes.SHOW_TOAST,show:false})}  style={{ position: 'absolute',top: 0,right: 50, }}>
                <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">DefibTech</strong>
                <small>Just now</small>
                </Toast.Header>
                <Toast.Body>Formation Ajouter avec succes</Toast.Body>
            </Toast>
      
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Ajouter Une Categorie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formBasicNom">
                    <Form.Label>Nom categorie</Form.Label>
                    <Form.Control type="email" placeholder="Nom de la categorie" value={NomCategorie}  onChange={e => setNomCategorie(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicTelephone">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="email" placeholder="Description" value={DescriptionCategorie} onChange={e => setDescriptionCategorie(e.target.value)}/>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={Save}>
                    Ajouter
                </Button>
                </Modal.Footer>
         </Modal>
</Aux>
    )
}

export default FormationAdd
