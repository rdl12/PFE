import React, { Component } from 'react'
import {Row, Col, Card, Form, Button, Image , FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import {Etape2} from './Etape2'
import { GoogleApiWrapper,}  from 'google-maps-react';
import { connect } from 'react-redux';

import Aux from "../../hoc/_Aux";
import {Adress,Add_Defib_Posted} from '../../store/actions'

export class AddDefib extends Component {
   
    state = {
        isActive: true,
        Nom:'',
        Telephone:'',
        image:'',
        Description:'',
        Marque:'',
        coords:{
            lat:'',
            lng:''
        },
        Access:'Inconnue'

    };

    Suivant = () => {
      
        this.props.Adress(this.state.coords);
         this.setState({
             isActive:false
         })   
    }

    Precedent = () => {
      
         this.setState({
             isActive:true
         })   
    }

    submit = () =>{
        let defib = {  
            "description" : this.state.Description,
            "latitude" :this.state.coords.lat,
            "longitude" : this.state.coords.lng,
            "photo" : "photo",
            "motif" : "motif",
            "marque_defib" :this.state.Marque,
            "etat":{
                id : 2,
                etat : 'validé'
            },
            "accesibillité": this.state.Access,
            "nom": this.state.Nom,
            "telephone" : this.state.Telephone,
            "adresse" :this.props.Adresse,
            "ville" : this.props.Ville,
            "province" : this.props.Province
            
          }
          this.props.Add_Defib_Posted(defib)
      
     }
    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                    { this.state.isActive ? ( <Card>
                            <Card.Header>
                                <Card.Title as="h5">Ajouter un defibrillateur</Card.Title>
                                <span className="d-block m-t-8">appuyer sur detail pour pouvoir valider ou rejetter un defibrillateur</span>
                            </Card.Header>
                            <Card.Body>
                                
                                
                                <Row>
                                    <Col md={6}>
                                        <Form>
                                            <Form.Group controlId="formBasicNom">
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control type="email" placeholder="Nom du proprietaire" value={this.state.Nom}  onChange={e => this.setState({Nom:e.target.value})}/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicTelephone">
                                            <Form.Label>Telephone</Form.Label>
                                            <Form.Control type="email" placeholder="Telephone" value={this.state.Telephone} onChange={e => this.setState({Telephone:e.target.value})}/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="email" placeholder="description" value={this.state.Description} onChange={e => this.setState({Description:e.target.value})}/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicMarque">
                                            <Form.Label>Marque</Form.Label>
                                            <Form.Control type="email" placeholder="marque du defib" value={this.state.Marque} onChange={e => this.setState({Marque:e.target.value})} />
                                            </Form.Group>
                                         
                                        </Form>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.Latitude">
                                            <Form.Label>Latitude</Form.Label>
                                            <Form.Control type="email" placeholder="0" value={this.state.coords.lat} required onChange={e => this.setState({coords:{lat:e.target.value}})}/>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.Longitude">
                                            <Form.Label>Longitude</Form.Label>
                                            <Form.Control type="email" placeholder="0"  value={this.state.coords.lng} onChange={e => this.setState({coords:{...this.state.coords,lng:e.target.value}})}/>
                                        </Form.Group>
                                        <Form.Group>
                                        <Form.Label >Accessibilite</Form.Label>
                                            <Form.Check
                                                custom
                                                type="radio"
                                                label="Privee"
                                                name="supportedRadios"
                                                value = 'Privée'
                                                id="prive"
                                                onChange={e => this.setState({Access:e.target.value})}
                                            />
                                            <Form.Check
                                                custom
                                                type="radio"
                                                label="Public"
                                                name="supportedRadios"
                                                value = 'Public'
                                                id="public"
                                                onChange={e => this.setState({Access:e.target.value})}
                                            />
                                              <Form.Check
                                                custom
                                                type="radio"
                                                label="Inconnue"
                                                value = 'Inconnue'
                                                name="supportedRadios"
                                                id="inconnue"
                                                onChange={e => this.setState({Access:e.target.value})}
                                            />
                                             <Image src="#" rounded />
                                        </Form.Group>
                                       
                                        <Button variant="primary" onClick = {this.Suivant}>
                                                Suivant
                                        </Button>
                                    </Col>
                                   
                                </Row>
                            </Card.Body>
                    </Card>) : 
                    <Etape2
                    Nom = {this.state.Nom} 
                    Telephone = {this.state.Telephone} 
                    Description = {this.state.Description}
                    Marque = {this.state.Marque}
                    coords = {this.state.coords}
                    Access = {this.state.Access}
                    photo = {this.state.image}
                    google = {this.props.google}
                    Adresse = {this.props.Adresse}
                    Pays = {this.props.Pays}
                    Ville = {this.props.Ville}
                    Province = {this.props.Province}
                    click = {this.submit}
                    precedent = {this.Precedent}
                    />}
                       
                </Col>
          </Row>
     </Aux>
        )
    }
}


const mapStateToProps = (state) => {
    const { addrese,pays,ville,province } = state
    
    return { Adresse: addrese, Pays:pays,Ville:ville,Province:province  }
  }

const mapDispatchToProps = (dispatch) => {

    return {
        Adress: (coords) => dispatch(Adress(coords)),
        Add_Defib_Posted: (defib) => dispatch(Add_Defib_Posted(defib)),
    }
};


export default  connect(mapStateToProps,mapDispatchToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyDqu6YcU_kt61cA0mKh2dCBe4KO8-Aq6a8'
})(AddDefib));
