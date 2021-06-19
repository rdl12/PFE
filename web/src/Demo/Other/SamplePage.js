import React from 'react';
import {Row, Col,Card,Button,FormControl,Form,ListGroup,Image } from 'react-bootstrap';
import {Map, Marker, GoogleApiWrapper, InfoWindow,}  from 'google-maps-react';
import { connect } from 'react-redux';

import Aux from "../../hoc/_Aux";
import { Fecth_DefiById,Modify_defib } from '../../store/actions';
import defib_icon from '../../assets/images/pin/medical.png';
class SamplePage extends React.Component {
   
    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        position: null,
        Etat:"",
        Motif:"",
        center:{ lat: 0, lng: 0 },
        user : ""
        
        
    };
    componentDidMount() {

       this.props.Fecth_DefiById(this.props.match.params.id)
        setTimeout(() => {this.setState({
            center:{ lat: this.props.Defib.latitude, lng: this.props.Defib.longitude }
        })
        if(this.props.Defib.user){
        this.setState({user : this.props.Defib.user.email})
        console.log(this.props.Defib.user.email)}},1000) 

      
    }

    Approuve = () => {
        if(this.state.Etat === "Validé"){
            this.props.Defib.etat.id = 2
            this.props.Defib.etat.etat = 'validé'
        }
        else if(this.state.Etat === "Rejeté"){
            this.props.Defib.etat.id = 3
            this.props.Defib.etat.etat = 'rejete'
            this.props.Defib.motif = this.state.Motif
        }
        else if(this.state.Etat === "En cours de traitement"){
            this.props.Defib.etat.id = 5
            this.props.Defib.etat.etat = 'en cours de traitement'
        }
        this.props.Modify_defib(this.props.Defib)
        setTimeout(()=>{window.location.href = "/table"},1500)
        //window.location.href = "/tables/bootstrap"
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
        const { position } = this.state;

        return (
            <Aux>
                      <Card>
                            <Card.Header>
                                {this.state.user ? (<Card.Title as="h5">Ce deffibrillateur a été ajouté par l'utilisateur : {this.state.user} </Card.Title>):
                                (<Card.Title as="h5">Ce deffibrillateur a été ajouté directement par Administrateur {this.state.user} </Card.Title>)}
                                <Button variant={'outline-info'} onClick = {this.Approuve} style={{float: 'right'}}>Submit</Button>
                                <span className="d-block mt-0">valider ou rejeter ce defib en changeant son etat au dessous</span>
                            </Card.Header>
                            
                        </Card>
                <Row>
                <Col xl={4}>
                        <Card title='Details' >
                            <Card.Header>
                                <Card.Title as="h5">Details</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div style={{height: 'fit-content'+50, width: '100%'}}>
                                <ListGroup variant="flush">
                                <ListGroup.Item>
                                          <Row>
                                             <Col>
                                                <Image src={this.props.Defib.photo} style={{height: '150px', width: '100%', borderWidth:1}}></Image>
                                             </Col>
                                             <Col>
                                                <Card.Title>Tel</Card.Title>
                                                <Card.Text>0{this.props.Defib.telephone}</Card.Text>
                                                <Card.Title>Marque</Card.Title>
                                                 <Card.Text>{this.props.Defib.marque_defib}</Card.Text>
                                             </Col>
                                          </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                             <Card.Title>Nom</Card.Title>
                                             <Card.Text>{this.props.Defib.nom}</Card.Text>   
                                </ListGroup.Item>
                                <ListGroup.Item>
                                         <Card.Title>Description</Card.Title>
                                         <Card.Text>{this.props.Defib.description}</Card.Text>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                        <Card.Title>Accessibilité</Card.Title>
                                        <Card.Text>{this.props.Defib.accesibillité}</Card.Text>
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
                                            name={this.props.Defib.nom}
                                            position={{ lat: this.props.Defib.latitude, lng: this.props.Defib.longitude }}
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
                        <Card title='Details' >
                            <Card.Header>
                                <Card.Title as="h5">Details</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div style={{height: 'fit-content', width: '100%'}}>
                                <ListGroup variant="flush">
                                <ListGroup.Item>
                                         <Card.Title>Adresse</Card.Title>
                                         <Card.Text>{this.props.Defib.adresse}</Card.Text>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                         <Card.Title>Ville</Card.Title>
                                         <Card.Text>{this.props.Defib.ville}</Card.Text>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                         <Card.Title>Province</Card.Title>
                                         <Card.Text>{this.props.Defib.province}</Card.Text>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                         <Row>
                                             <Col>
                                             <Card.Title>latitude</Card.Title>
                                             <Card.Text>{this.props.Defib.latitude}</Card.Text>
                                             </Col>
                                             <Col>
                                             <Card.Title>longitude</Card.Title>
                                             <Card.Text>{this.props.Defib.longitude}</Card.Text>
                                             </Col>
                                          </Row>   
                                </ListGroup.Item>
                                <ListGroup.Item>
                                            <Card.Title>Etat</Card.Title>
                                            <Form.Control as="select" className="mb-3"  value = {this.state.Etat} onChange={e => this.setState({Etat:e.target.value})}>
                                               <option>Etat</option>
                                               <option>Validé</option>
                                               <option>Rejeté</option>
                                               <option>En cours de traitement</option>
                                            </Form.Control>
                                            {this.state.Etat === "Rejeté" ?(
                                                <Form.Group controlId="formBasicMarque">
                                                   <Form.Label>Motif</Form.Label>
                                                   <Form.Control type="email" placeholder="motif du rejet" value={this.state.Motif} onChange={e => this.setState({Motif:e.target.value})} />
                                                </Form.Group>
                                            ) : null}
                                            
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


const mapStateToProps = (state) => {
    const { defibDetails } = state
    
    return { Defib: defibDetails  }
  }

 const mapDispatchToProps = (dispatch) => {

    return {
        Modify_defib: (defib) => dispatch(Modify_defib(defib)),
        Fecth_DefiById : (id) => dispatch(Fecth_DefiById(id))
    }
};


export default  connect(mapStateToProps,mapDispatchToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyDqu6YcU_kt61cA0mKh2dCBe4KO8-Aq6a8'
})(SamplePage));