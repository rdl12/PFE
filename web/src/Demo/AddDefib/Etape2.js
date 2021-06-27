import React, { Component } from 'react'
import {Row, Col,Card,Button,FormControl,Form,ListGroup,Image } from 'react-bootstrap';
import {Map, Marker, GoogleApiWrapper, InfoWindow,}  from 'google-maps-react';
import { connect } from 'react-redux';

import Aux from "../../hoc/_Aux";
import defib_icon from '../../assets/images/pin/medical.png';
export class Etape2 extends Component {
    constructor(props){
        super(props)
   
    }
    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        position: null,
        Etat:"",
        center:{ lat: 0, lng: 0 }
        
        
    };
    componentDidMount() {

         setTimeout(() => {this.setState({
             center:{ lat: this.props.coords.lat, lng: this.props.coords.lng }
         })},200) 
     }
    
    onMarkerClick = (props, marker) =>
    this.setState({
        activeMarker: marker,
        selectedPlace: props,
        showingInfoWindow: true
    });
    onInfoWindowClose = () =>
    this.setState({
        activeMarker: null,
        showingInfoWindow: false
    });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };
     
    render() {
            return (
                <Aux>  
                       <Card>
                            <Card.Header>
                                <Button variant={'outline-info'} onClick = {this.props.precedent} style={{float: 'right'}}>Precedent</Button>
                                <Card.Title as="h5">Ajout de defib</Card.Title>
                                <Button variant={'outline-info'} onClick = {this.props.click} style={{float: 'right'}}>Submit</Button>
                            </Card.Header>
                            
                        </Card>  
                    <Row>
                    <Col xl={4}>
                            <Card title='Etape 2' >
                                <Card.Header>
                                    <Card.Title as="h5">Details</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div style={{height: '450px', width: '100%'}}>
                                    <ListGroup variant="flush">
                                    <ListGroup.Item>
                                              <Row>
                                                 <Col>
                                                    <Image src={this.props.photo} style={{height: '150px', width: '100%', borderWidth:1}}></Image>
                                                 </Col>
                                                 <Col>
                                                    <Card.Title>Tel</Card.Title>
                                                    <Card.Text>0{this.props.Telephone}</Card.Text>
                                                    <Card.Title>Marque</Card.Title>
                                                     <Card.Text>{this.props.Marque}</Card.Text>
                                                 </Col>
                                              </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                                 <Card.Title>Nom</Card.Title>
                                                 <Card.Text>{this.props.Nom}</Card.Text>   
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                             <Card.Title>Description</Card.Title>
                                             <Card.Text>{this.props.Description}</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                            <Card.Title>Accessibilité</Card.Title>
                                            <Card.Text>{this.props.Access}</Card.Text>
                                    </ListGroup.Item>
                                    </ListGroup>
                                    
                                    </div>
                                </Card.Body>
                            </Card>
                       
                        </Col>
                        <Col xl={4}>
                            <Card title='Details' >
                                    <div style={{height: '575px', width: '100%'}}>
                                        <Map  
                                            className="map"
                                            center={this.state.center}
                                            google={this.props.google}
                                            onClick={this.onMapClicked}
                                            zoom={20}>
                                            <Marker
                                                name={this.props.Nom}
                                                position={{ lat: this.props.coords.lat, lng: this.props.coords.lng }}
                                                onClick={this.onMarkerClick}
                                                icon={defib_icon}
                                            />
    
                                            {/* <Marker name="Current Location" onClick={this.onMarkerClick} /> */}
    
                                            <InfoWindow
                                                marker={this.state.activeMarker}
                                                onClose={this.onInfoWindowClose}
                                                visible={this.state.showingInfoWindow}>
                                                <div>
                                                    <h3>{this.state.selectedPlace.name}</h3>
                                                </div>
                                            </InfoWindow>
                                        </Map>
                                    </div>
                            </Card>
                       
                        </Col>
                        <Col xl={4}>
                            <Card title='Adresse' >
                                <Card.Header>
                                    <Card.Title as="h5">Adresse</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div style={{height: '450px', width: '100%'}}>
                                    <ListGroup variant="flush">
                                    <ListGroup.Item>
                                             <Card.Title>Adresse</Card.Title>
                                            <Card.Text>{this.props.Adresse}</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                             <Card.Title>Ville</Card.Title>
                                             <Card.Text>{this.props.Ville}</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                             <Card.Title>Province</Card.Title>
                                             <Card.Text>{this.props.Province}</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                             <Row>
                                                 <Col>
                                                 <Card.Title>latitude</Card.Title>
                                                 <Card.Text>{this.props.coords.lat}</Card.Text>
                                                 </Col>
                                                 <Col>
                                                 <Card.Title>longitude</Card.Title>
                                                 <Card.Text>{this.props.coords.lng}</Card.Text>
                                                 </Col>
                                              </Row>   
                                    </ListGroup.Item>
                                  
                                    </ListGroup>
                                    </div>
                                </Card.Body>
                            </Card>
                       
                        </Col>
                    </Row>
    
                    <Row>
                    
                    </Row>
                </Aux>
            );
        
    }
}



export default GoogleApiWrapper({
    apiKey: 'AIzaSyCAXByHgTu3VsmaVPADC6xuw5tivT8mPtY&region=MA'
})(Etape2);