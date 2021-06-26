import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button,Dropdown,DropdownButton,Spinner,Modal,Badge} from 'react-bootstrap';



import Aux from "../../hoc/_Aux";
import UcFirst from "../../App/components/UcFirst";
import {Fetch_Produits,Fetch_Product_Categories,Add_Product,add_CategoryProduct,FetchProductsByCategorie} from '../../store/actions'
import { Link } from 'react-router-dom';
import List from '../Formation/List'


function ProduitList() {
    const dispatch = useDispatch()
    const [Nom, setNom] = useState('')
    const [Description, setDescription] = useState('')
    const [NomCat, setNomCat] = useState('')
    const [DescriptionCat, setDescriptionCat] = useState('')
    const [Image, setImage] = useState('')
    const produits = useSelector(state => state.produits)
    const produits_categories = useSelector(state => state.product_categories)
    const [CategorieChoosed, setCategorieChoosed] = useState(null)
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false)
    const [category,setCategory] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
   
    const remove_filter = () =>{
      dispatch(Fetch_Produits())
      dispatch(Fetch_Product_Categories())
      setCategory("")
  }
       useEffect(() => {
          dispatch(Fetch_Produits())
          dispatch(Fetch_Product_Categories())
       }, [])

       const SaveCategory = () => {
         setShow2(false)
         const object = {
             "nom":NomCat,
             "description":DescriptionCat
         }
          dispatch(add_CategoryProduct(object))
          setShow(true);
     
     };
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
       
       if(Nom=="" || categorie_filterd[0] == undefined)
         {
            alert('veuiller entrer au moins le nom et la categorie du produit')
         }
      else {
         dispatch(Add_Product(object))
         handleClose()
         window.location.reload(false)
      }
       
      }
      const change = (e) => {
         setCategorieChoosed(e.target.value)
         if(e.target.value == 'Ajouter Categorie'){
            handleClose()
            handleShow2()
         }
        }
       return (
          <Aux>
              <Card>
                     <Card.Header>
                     <Card.Title as="h5"> Liste des Produits </Card.Title>
                     <Button variant={'outline-info'} style = {{float:'right'}} onClick = {handleShow}><UcFirst text='Ajouter Produit'/></Button>
                     <DropdownButton
                                title='filtrer par Categorie'
                                variant='primary'
                                drop='left'
                                id={`dropdown-variants-primary`}
                                style = {{float:'right'}}
                            >
                        {typeof produits_categories !== "undefined" &&  produits_categories.map((item,index) => 
                        <Dropdown.Item key= {index} eventKey={index}  onSelect = {(e) => {
                           dispatch(FetchProductsByCategorie(produits_categories[e]))
                           setCategory(produits_categories[e])
                              }} > <Form.Check
                              custom
                              type="radio"
                              label={item.nom}
                              value = {item.nom}
                              name="supportedRadios"
                              id="supportedRadio3"
                             checked = {category === produits_categories[index]}
                           
                        />
                     </Dropdown.Item>)
                  }
                 <Dropdown.Divider />
            </DropdownButton>
                     </Card.Header>
                     
                     {category !== "" ? (<Badge variant="light" className="mb-1 f-20 p-3" style={{borderRadius:20, width:'fit-content',margin:10}}>{category.nom}<i className="feather icon-x text-c-black f-20 ml-3" onClick={remove_filter}/></Badge>): null }
            
                        {produits_categories.length !== 0 && produits.length !== 0 ? (<Card.Body className='border-bottom' >
                       
                        <div className="row" >
                     
                           {
                               produits_categories.map(item => {
                                 let produits_categories = typeof produits !== "undefined" &&  produits.filter(
                                       (produit) => produit.categorie.nom === item.nom
                                       );
                                       if (produits_categories.length != 0)
                                       {
                                       return <List key = {item.id} items={produits_categories} title={item.nom} to='/Produit/Detail/' width='200' height='200'  />
                                       }
                                    }
                                       )
                                 } 
                        </div>
                </Card.Body>):
                (<Spinner animation="border" variant="primary" style={{margin:20, display:'flex',alignSelf:'center' ,justifyContent:'center'}}/>)}
               </Card>
               
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Ajouter Un Produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Form.Group controlId="formBasicNom">
                    <Form.Label>Nom Produit</Form.Label>
                    <Form.Control type="email" placeholder="Nom de produit" value={Nom}  onChange={e => setNom(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicNom">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textarea' type="email" placeholder="description" value={Description}  onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="Categories">
                        <Form.Label>Categorie</Form.Label>
                           <Form.Control as="select"  onChange={e => change(e)}>
                              <option  key={'choisir'} value='choisissez votre categorie'> choisissez la categorie du produit </option>
                              {produits_categories.map((item) => <option  key={item.id} value={item.nom}> {item.nom} </option>)}
                              <option  key={'ajouter'} value='Ajouter Categorie'   > Ajouter Categorie </option>
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
                    Enregistrer
                </Button>
                </Modal.Footer>
         </Modal>

         <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                <Modal.Title>Ajouter Une Categorie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Form.Group controlId="formBasicNom">
                    <Form.Label>Nom Categorie</Form.Label>
                    <Form.Control type="email" placeholder="Nom de produit" value={NomCat}  onChange={e => setNomCat(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicNom">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="email" placeholder="description" value={DescriptionCat}  onChange={e => setDescriptionCat(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                    Close
                </Button>
                <Button variant="primary" onClick={SaveCategory}>
                    Enregistrer
                </Button>
                </Modal.Footer>
         </Modal>
          </Aux>

       )
   }

export default ProduitList
