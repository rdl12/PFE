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
            lat:0,
            lng:0
        },
        Access:'Inconnue'

    };

    Suivant = () => {
      
        this.props.Adress(this.state.coords);
         this.setState({
             isActive:false
         })   
    }
    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                    { this.state.isActive ? ( <Card>
                            <Card.Header>
                                <Card.Title as="h5">Basic Component</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5>Form controls</h5>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form>
                                            <Form.Group controlId="formBasicNom">
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control type="email" placeholder="Text"  onChange={e => this.setState({Nom:e.target.value})}/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicTelephone">
                                            <Form.Label>Telephone</Form.Label>
                                            <Form.Control type="email" placeholder="Text" onChange={e => this.setState({Telephone:e.target.value})}/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="email" placeholder="Text" onChange={e => this.setState({Description:e.target.value})}/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicMarque">
                                            <Form.Label>Marque</Form.Label>
                                            <Form.Control type="email" placeholder="Text" onChange={e => this.setState({Marque:e.target.value})} />
                                            </Form.Group>
                                         
                                        </Form>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.Latitude">
                                            <Form.Label>Latitude</Form.Label>
                                            <Form.Control type="email" placeholder="Text" onChange={e => this.setState({coords:{lat:e.target.value}})}/>
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.Longitude">
                                            <Form.Label>Longitude</Form.Label>
                                            <Form.Control type="email" placeholder="Text"  onChange={e => this.setState({coords:{...this.state.coords,lng:e.target.value}})}/>
                                        </Form.Group>
                                        <Form.Group>
                                        <Form.Label >Accessibilite</Form.Label>
                                            <Form.Check
                                                custom
                                                type="radio"
                                                label="Privee"
                                                name="supportedRadios"
                                                value = 'Privee'
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
                                                value = 'Inconuue'
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
                    Marque = {this.state.marque}
                    coords = {this.state.coords}
                    Access = {this.state.Access}
                    photo = {this.state.image}
                    google = {this.props.google}
                    Adresse = {this.props.Adresse}
                    Pays = {this.props.Pays}
                    Ville = {this.props.Ville}
                    Province = {this.props.Province}
                    dispatch = {(e) =>{this.props.Add_Defib_Posted(e)}}
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
    apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'
})(AddDefib));
