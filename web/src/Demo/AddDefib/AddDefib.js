import React, { Component } from 'react'
import {Row, Col, Card, Form, Button, Image , FormControl, DropdownButton, Dropdown,Tab,Tabs} from 'react-bootstrap';
import {Etape2} from './Etape2'
import { GoogleApiWrapper,}  from 'google-maps-react';
import {Map, Marker, InfoWindow,}  from 'google-maps-react';
import { connect } from 'react-redux';
import * as XLSX from "xlsx";
import ImageUploader from 'react-images-upload';

import Aux from "../../hoc/_Aux";
import {Adress,Add_Defib_Posted,upload_csv} from '../../store/actions'
import defib_icon from '../../assets/images/pin/medical.png';

export class AddDefib extends Component {
    constructor(props) {
        super(props);
         this.state = {  isActive: true,
            Nom:'',
            Telephone:'',
            image:'',
            Description:'',
            Marque:'',
            coords:{
                lat:'',
                lng:''
            },
            Access:'Inconnue',
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false,
            position: null,
            Etat:"",
            center:{ lat: 0, lng: 0 },
            addMarker:false,
            markerCoords:{
                lat:0,
                lng:0
            },
            pictures: [],
            file: "",
            showFile:false,
            csv: "Upload CSV",
            icon : "fa fa-upload f-18 m-r-10 "
        };
         this.onDrop = this.onDrop.bind(this);
         this.handleClick = this.handleClick.bind(this);
    }

    Click() {
        this.setState({showFile:!this.state.showFile })
        if(this.state.csv=="Upload CSV"){ this.setState({csv : "retour", icon :"fa fa-arrow-left f-18 m-r-10 "}) }
        else this.setState({csv : "Upload CSV", icon : "fa fa-upload f-18 m-r-10 "})
      }

    handleClick(e) {
        this.refs.fileUploader.click();
      }
    
    filePathset(e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        console.log(file);
        this.setState({ file });
    
        console.log(this.state.file);
      }
    
    readFile() {
        var f = this.state.file;
        var name = f.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
          // evt = on_file_select event
          /* Parse data */
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          /* Update state */
         // console.log("Data>>>" + data);// shows that excel data is read
          this.convertToJson(data); // shows data in json format
        };
        reader.readAsBinaryString(f);
      }
      convertToJson(csv) {
        var lines = csv.split("\n");
    
        var result = [];
    
        var headers = lines[0].split(",");
    
        for (var i = 1; i < lines.length-1; i++) {
          var obj = {};
          var currentline = lines[i].split(",");
    
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
    
          result.push(obj);
        }
        result.map(item => this.props.upload_csv(item))
        console.log(result)
      }
    
    onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });

        console.log(this.state.pictures)
    }

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
     componentDidMount() {

        console.log(this.props)
        // console.log(this.props.Defib)
         setTimeout(() => {this.setState({
             center:{ lat: 30, lng: -7.20 }
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

    onMapClicked = (location, map) => {
      
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false,
                
            });
        this.setState({addMarker: !this.state.addMarker,markerCoords:{
            lat:location.lat(),
            lng:location.lng()
        },
     coords:{
        lat:location.lat(),
        lng:location.lng()
     }})
    };
     
    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                    { this.state.isActive  ? (
                         <Card>
                            <Card.Header >
                                <Card.Title as="h5">Ajouter un defibrillateur</Card.Title>
                                <Button   variant={'outline-dark'} onClick = {() => this.Click()} style={{float: 'right'}}><i className={this.state.icon}/>{this.state.csv}</Button>
                                <span className="d-block m-t-8">appuyer sur detail pour pouvoir valider ou rejetter un defibrillateur</span>
                             
                            </Card.Header>
                            
                          { this.state.showFile === false ? (<Card.Body>
                                
                                
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
                                            <ImageUploader
                                                withIcon={true}
                                                buttonText='Choose images'
                                                onChange={this.onDrop}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                maxFileSize={5242880}
                                            />
                                             
                                        
                                        </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col md={6}>
                                      
                                            <Tabs defaultActiveKey="home">
                                                <Tab eventKey="home" title="Map">
                                                <div style={{height: '500px', width: '100%'}}>
                                                    <Map  
                                                        className="map"
                                                        center={this.state.center}
                                                        google={this.props.google}
                                                        onDblclick={(t, map, c) =>this.onMapClicked(c.latLng, map)}
                                                        zoom={4.5}>
                                                    { this.state.addMarker ? (<Marker
                                                            name={this.props.Nom}
                                                            position={{ lat: this.state.markerCoords.lat, lng: this.state.markerCoords.lng }}
                                                            //onClick={(t,c) => this.onMarkerClick(c.latLng)}
                                                            icon={defib_icon}
                                                        />):null}
                                                    </Map>
                                                </div>
                                                </Tab>
                                                <Tab eventKey="profile" title="Coords">
                                                <Form.Group controlId="exampleForm.Latitude">
                                                    <Form.Label>Latitude</Form.Label>
                                                    <Form.Control type="email" placeholder="0" value={this.state.coords.lat} required onChange={e => this.setState({coords:{lat:e.target.value}})}/>
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.Longitude">
                                                        <Form.Label>Longitude</Form.Label>
                                                        <Form.Control type="email" placeholder="0"  value={this.state.coords.lng} onChange={e => this.setState({coords:{...this.state.coords,lng:e.target.value}})}/>
                                                    </Form.Group>
                                                </Tab>     
                                         </Tabs>
                                       
                                       
                                        <Button variant="primary" onClick = {this.Suivant} style={{float :'right', margin:10}}>
                                                Suivant
                                        </Button>
                                      
                                    </Col>
                                   
                                </Row>
                            </Card.Body>):(<Card.Body>
                                <div >
                                            <input
                                                type="file"
                                                id="file"
                                                ref="fileUploader"
                                                onChange={this.filePathset.bind(this)}
                                            />
                                            <Button
                                                variant={'outline-dark'}
                                                style={{float: 'right'}}
                                                onClick={() => { this.readFile(); }}
                                             >
                                              Read File
                                            </Button>
                                        </div>
                            </Card.Body>)}
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
        upload_csv: (csv) => dispatch(upload_csv(csv))
    }
};


export default  connect(mapStateToProps,mapDispatchToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyDqu6YcU_kt61cA0mKh2dCBe4KO8-Aq6a8'
})(AddDefib));
