import React from 'react';
import {Row, Col,Card,Button,FormControl,Form} from 'react-bootstrap';
import {Map, Marker, GoogleApiWrapper, InfoWindow,}  from 'google-maps-react';
import { connect } from 'react-redux';

import Aux from "../../hoc/_Aux";
import { Fecth_DefiById,Modify_defib } from '../../store/actions';

class SamplePage extends React.Component {
   
    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        position: null,
        Etat:"",
        
    };
    componentDidMount() {

       this.props.Fecth_DefiById(this.props.match.params.id)
        console.log(this.props.Defib)
    }

    Approuve = () => {
        this.props.Defib.etat.id = 2
        this.props.Defib.etat.etat = 'validé'
        //console.log(this.props.Defib)
        this.props.Modify_defib(this.props.Defib)
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
                <Row>
                    <Col xl={6}>
                        <Card title='Details' >
                            <Card.Header>
                                <Card.Title as="h5">Carte</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div style={{height: '300px', width: '100%'}}>
                                    <Map
                                        centerAroundCurrentLocation
                                        className="map"
                                        google={this.props.google}
                                        onClick={this.onMapClicked}
                                        zoom={12}>

                                        <Marker
                                            name="Codedthemes"
                                            position={{ lat: 21.2335163, lng: 72.8643298 }}
                                            onClick={this.onMarkerClick}
                                        />

                                        <Marker
                                            name="Roman Point"
                                            position={{ lat: 21.2148165, lng: 72.8627243 }}
                                            onClick={this.onMarkerClick}
                                        />

                                        <Marker name="Current Location" onClick={this.onMarkerClick} />

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
                            </Card.Body>
                        </Card>
                   
                    </Col>
                    <Col xl={6}>
                        <Card title='Details' isOption>
                            <Card.Header>
                                <Card.Title as="h5">Carte</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div style={{height: '300px', width: '100%'}}>
                                    
                                </div>
                            </Card.Body>
                        </Card>
                   
                    </Col>
                </Row>

                <Row>
                <Form.Control as="select" className="mb-3"  value = {this.state.Etat} onChange={e => this.setState({Etat:e.target.value})}>
                    <option>Etat</option>
                    <option>Valide</option>
                    <option>Rejete</option>
                    <option>En cours de traitement</option>
                </Form.Control>
                </Row>
                <Row>
                <Button variant={'outline-info'} onClick = {this.Approuve}>Valider</Button>
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
    apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'
})(SamplePage));