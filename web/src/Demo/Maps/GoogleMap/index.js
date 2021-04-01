import React from 'react';
import {Row, Col, Card, Form, InputGroup, Button} from 'react-bootstrap';
import {Map, Marker, GoogleApiWrapper, InfoWindow, Polyline, Polygon}  from 'google-maps-react';
import {connect} from 'react-redux';

import Aux from "../../../hoc/_Aux";
import {Fetch_Defib_Valide} from "../../../store/actions";

const polygon = [
    { lat: 21.2105052, lng: 72.8653491 },
    { lat: 21.2206445, lng: 72.8704506 },
    { lat: 21.2183091, lng: 72.8631228 }
];

class GoogleMap extends React.Component {

    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        position: null
    };

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

    componentDidMount() {
        this.renderAutoComplete();
        this.props.Fetch_Defib_Valide(2)
        console.log(this.props.Defib)
      
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps.map) this.renderAutoComplete();
    }

    onSubmit(e) {
        e.preventDefault();
    }

    renderAutoComplete() {
        const { google, map } = this.props;

        if (!google || !map) return;

        const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry) return;

            if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            this.setState({ position: place.geometry.location });
        });
    }


    render() {
        const { position } = this.state;

        return (
            <Aux>
          
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Click-Able Markers</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div style={{height: '350px', width: '100%'}}>
                                    <Map
                                        centerAroundCurrentLocation
                                        className="map"
                                        google={this.props.google}
                                        onClick={this.onMapClicked}
                                        zoom={12}>

                           {this.props.Defib && this.props.Defib.map(marker => (
                                        <Marker
                                            key={marker.id}
                                            name={marker.nom}
                                            position={{ lat: marker.latitude, lng: marker.longitude }}
                                            onClick={this.onMarkerClick}
                                        />
                                        
                                        ))}

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
                   
                    {/* <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Geo-Coding</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.onSubmit}>
                                    <InputGroup className="mb-3">
                                        <Form.Control ref={ref => (this.autocomplete = ref)} type='text' placeholder='Search your favorite place' />
                                        <InputGroup.Append>
                                            <Button type="submit">Search</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                                <div style={{height: '240px', width: '100%'}}>
                                    <Map
                                        className='map'
                                        {...this.props}
                                        center={position}
                                        centerAroundCurrentLocation >
                                        <Marker position={position} />
                                    </Map>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col> */}
                 
                  
              
            </Aux>
        );
    }
}


const mapStateToProps = (state) => {
    const { defib } = state
    
    return { Defib: defib  }
  }

const mapDispatchToProps = dispatch => {
    return {
        Fetch_Defib_Valide: (state) => dispatch(Fetch_Defib_Valide(state)),
    }
};

export default  connect(mapStateToProps, mapDispatchToProps) (GoogleApiWrapper({
    apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'
})(GoogleMap));

