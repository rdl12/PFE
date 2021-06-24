import React from 'react';
import {Row, Col, Card, Form, Table, Button, Alert,Dropdown,DropdownButton,Pagination, Badge} from 'react-bootstrap';
import {Map, Marker, GoogleApiWrapper, InfoWindow, Polyline, Polygon}  from 'google-maps-react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Aux from "../../../hoc/_Aux";
import {Fetch_Defib_Valide,Fetch_Defib_ByVille} from "../../../store/actions";

import defib_icon from '../../../assets/images/pin/pin_1.png';
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
        position: null,
        center:{ lat: 0, lng: 0 },
        showlist : false,
        showlist_value : "voir Lise des defib",
        showlist_icon : "feather icon-list text-c-black f-20",
        showalert : false,
        ville:null,
        page:1,
        index:0,
        number_per_page:5

    };
    PaginationHandler = (page) =>{
      
        this.setState({page:page,index:page*this.state.number_per_page-this.state.number_per_page})
    }

    remove_filter_ville = () =>{
        
        this.props.Fetch_Defib_Valide(2)
        
        this.setState({ville:null})
      
    }

    showlist = () =>{
        this.setState({showlist:!this.state.showlist})
        if(this.state.showlist_value == "voir Lise des defib"){
            this.setState({showlist_value : "voir map des defib"})
             this.setState({showlist_icon : "feather icon-map text-c-black f-20"})
        }
        else {
            this.setState({showlist_value : "voir Lise des defib"})
             this.setState({showlist_icon : "feather icon-list text-c-black f-20"})
        }
             
    }

    onMarkerClick = (props, marker) =>
       { this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true,
        });
       
        
    }

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
        setTimeout(() => {this.setState({
            center:{ lat: 33, lng: -7.30 }
        })},200) 
      
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
        const { 
            Defib,
         } = this.props;
       
         
         let defib_filtred  = Defib.slice(this.state.index,this.state.index+this.state.number_per_page)
         let ville = [...new Set(Defib.map(
           item => item.ville
       ))];
       let active = this.state.page;
       let activeItems = [];
       for (let number = 1; number <= Math.ceil(Defib.length/this.state.number_per_page); number++) {
           activeItems.push(
               <Pagination.Item key={number} active={number === active} onClick = {() => this.PaginationHandler(number)}>
                   {number}
               </Pagination.Item>
           );
       }

        return (
            
            <Aux>
          
                        <Card>
                           
                            <Card.Header>
                                <Card.Title as="h5">Carte des defibrillateurs en marche actuelle</Card.Title>
                                
                                {this.state.showlist ?  (
                                        <DropdownButton
                                                title='filtrer par ville'
                                                variant='primary'
                                                drop='left'
                                                id={`dropdown-variants-primary`}
                                                style = {{float:'right'}}
                                        >
                                            {typeof ville !== "undefined" &&  ville.map((item,index) => 
                                                <Dropdown.Item key= {index} eventKey={index}  onSelect = {(e) => {
                                                        this.props.Fetch_Defib_ByVille(ville[e])
                                                        this.setState({ville:ville[e]})
                                                        
                                                        }}
                                                > 
                                                    <Form.Check
                                                        custom
                                                        type="radio"
                                                        label={item}
                                                        value = {item}
                                                        name="supportedRadios"
                                                        id="supportedRadio3"
                                                        checked = {this.state.ville === ville[index]}
                                                        
                                                    />
                                                </Dropdown.Item>)
                                            }  
                                                <Dropdown.Divider />
                                        </DropdownButton>
                                    ): null}
                                <Button variant={'outline-dark'} onClick = {this.showlist} style={{float: 'right'}}><i className={this.state.showlist_icon} />{this.state.showlist_value}</Button>
                            </Card.Header>
                            <Card.Body>
                            {this.state.ville !== null ? (<Badge variant="light" className="mb-1 f-20 p-3" style={{borderRadius:20}}>{this.state.ville}<i className="feather icon-x text-c-black f-20 ml-3" onClick={this.remove_filter_ville}/></Badge>): null }
                            
                                
                                    {!this.state.showlist ?(
                                       <div style={{height: window.innerHeight/1.5, width: '100%'}}>
                                        <Map
                                        ref={(map) => { this.map = map; }}
                                        center={this.state.center}
                                        className="map"
                                        google={this.props.google}
                                        onClick={this.onMapClicked}
                                        zoom={6}>

                           {this.props.Defib && this.props.Defib.map(marker => (
                                        <Marker
                                            key={marker.id}
                                            name={marker.nom}
                                            position={{ lat: marker.latitude, lng: marker.longitude }}
                                            onClick={this.onMarkerClick}
                                            icon={defib_icon}
                                            style={{height:1,with:0.5}}
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
                                    ):(
                                        <div>
                                        <Table striped responsive>
                                        <thead>
                                        <tr>
                                            
                                            <th>Nom</th>
                                            <th>Date</th>
                                            <th>etat</th>
                                            <th>Ville</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                 {typeof defib_filtred  !== "undefined" &&  defib_filtred .map(item => 
                                  <tr key = {item.id}>
                                  <td>{item.nom}</td>
                                  <td>{item.date}</td>
                                  <td className="f-16">{item.etat.etat}</td>
                                  <td>{item.ville}</td>
                                  <td><NavLink to={`/sample-page/${item.id}`}>Details</NavLink></td>
                              </tr>
                              
                              )
                                 }
                                      
                                        </tbody>
                                        </Table>
                                        <hr/>
                                        <Row >
                                            <Col  sm={10}>
                                                <Pagination >
                                                    <Pagination.First />
                                                        <Pagination.Prev />
                                                            {activeItems}
                                                        <Pagination.Next />
                                                    <Pagination.Last />
                                                </Pagination>
                                                </Col>
                                            <Col  sm={2}>
                                                <Form.Control as="select"  onChange = {(e) =>{this.setState({number_per_page:e.target.value})}} >
                                                <option  key={'choisir'} value='choisissez le nombre d element par page'> {this.state.number_per_page} </option>
                                                <option  key={1} value={5}> 5 </option>
                                                <option  key={2} value={10}> 10 </option>
                                                <option  key={3} value={20}> 20 </option>
                                                <option  key={4} value={30}> 30 </option>
                                            </Form.Control>
                                            </Col>
                                     </Row>
                                    
                                    </div>
                                    )}
                                    
                               
                              
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
        Fetch_Defib_ByVille: (state) => dispatch(Fetch_Defib_ByVille(state)),
    }
};

export default  connect(mapStateToProps, mapDispatchToProps) (GoogleApiWrapper({
    apiKey: 'AIzaSyDqu6YcU_kt61cA0mKh2dCBe4KO8-Aq6a8&region=MA'
})(GoogleMap));

