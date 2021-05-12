import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button, Image , FormControl, DropdownButton, Dropdown,Modal,Tabs} from 'react-bootstrap';



import Aux from "../../hoc/_Aux";
import UcFirst from "../../App/components/UcFirst";
import {Fetch_Produits,Fetch_Product_Categories,Add_Product} from '../../store/actions'
import { Link } from 'react-router-dom';


function ProduitList() {
    const dispatch = useDispatch()
    const [Nom, setNom] = useState('')
    const [Description, setDescription] = useState('')
    const [Image, setImage] = useState('')
    const produits = useSelector(state => state.produits)
    const produits_categories = useSelector(state => state.product_categories)
    const [CategorieChoosed, setCategorieChoosed] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
       useEffect(() => {
          dispatch(Fetch_Produits())
          dispatch(Fetch_Product_Categories())
       }, [])

      const Save = () => {
         let categorie_filterd = produits_categories.filter(
            (category) => category.nom === CategorieChoosed 
          );
       var object = {
         "nom":Nom,
         "image":Image,
         "desription":Description,
          "categorie":categorie_filterd[0]
       }
       dispatch(Add_Product(object))
       handleClose()
      }
       return (
          <Aux>
              <Card>
                     <Card.Header>
                     <Card.Title as="h5"> Liste des Produits </Card.Title>
                     <Button variant={'outline-info'} style = {{float:'right'}} onClick = {handleShow}><UcFirst text='Ajouter Produit'/></Button>
                     </Card.Header>
            
                        <Card.Body className='border-bottom' >
                        <div className="row" >
                     {produits.length != 0  && produits.map((item) =>
                     <Link to={`/Produit/Detail/${item.id}`} style={{ textDecoration: 'none' }} Key = {item.id}>
                     <div style={{margin:10}} class="col-sm">
                           <img src={item.image} width="200" height="200"  style = {{borderRadius:20}}/>
                           <p className="font-weight-bold" style={{margin:3, width:200}}>{item.nom}</p>
                        </div>
                        </Link>
                           )
                           }
                  </div>
                </Card.Body>
               </Card>
               
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Ajouter Une Categorie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Form.Group controlId="formBasicNom">
                    <Form.Label>Nom Produit</Form.Label>
                    <Form.Control type="email" placeholder="Nom de produit" value={Nom}  onChange={e => setNom(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicNom">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="email" placeholder="description" value={Description}  onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="Categories">
                        <Form.Label>Categorie</Form.Label>
                           <Form.Control as="select"  onChange={e => setCategorieChoosed(e.target.value)}>
                              <option  key={'choisir'} value='choisissez votre categorie'> choisissez la categorie de la formation  </option>
                              {produits_categories.map((item) => <option  key={item.id} value={item.nom}> {item.nom} </option>)}
                              <option  key={'ajouter'} value='Ajouter Categorie'  > Ajouter Categorie </option>
                           </Form.Control>
                        </Form.Group>


                    <Form.Group controlId="formBasicTelephone">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="email" placeholder="Image" value={Image} onChange={e => setImage(e.target.value)}/>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={Save}>
                    Save Changes
                </Button>
                </Modal.Footer>
         </Modal>
          </Aux>

       )
   }

export default ProduitList
