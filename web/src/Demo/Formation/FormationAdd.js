import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button, Image , FormControl, DropdownButton, Dropdown,Tab,Tabs} from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Aux from "../../hoc/_Aux";
import {Add_Formation,Fetch_Categories} from '../../store/actions'

function FormationAdd() {
    const [Nom, setNom] = useState("")
    const [Description, setDescription] = useState("")
    const [Categorie, setCategorie] = useState("")
    const [nbrmax, setnbrmax] = useState(0)
    const [Image, setImage] = useState("")
    const [value, onChange] = useState(new Date());
    const [Categories, setCategories] = useState([])
    const [CategorieChoosed, setCategorieChoosed] = useState("")
    const formation_categories = useSelector(state => state.categories)
    const dispatch = useDispatch()
     

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
        "date_debut":value,
        "nbr_inscrit":0,
        "nbr_max":nbrmax,
        "image":Image,
        "categorie":categorie_filterd[0],
    }
    dispatch(Add_Formation(formation))

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
                        <Form.Control type="email" placeholder="Description" value={Description} onChange={e => setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="Categories">
                        <Form.Label>Categorie</Form.Label>
                        <Form.Control as="select" onChange = {(e) => setCategorieChoosed(e.target.value)} >
                        {Categories.map((item) => <option  key={item.id} value={item.nom}> {item.nom} </option>)}
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
                        <Calendar
                            onChange={onChange}
                            value={value}
                            
                        
                        />
                       </Form.Group>
                        
                      </Form>
                      <Button variant="primary" onClick = {submit}>
                         Submit
                     </Button>
                    </Card.Body>
            </Card>
               
        </Col>
  </Row>
</Aux>
    )
}

export default FormationAdd
