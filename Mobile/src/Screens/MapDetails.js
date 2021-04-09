import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import {windowWidth,windowHeight} from '../utils/Dimentions'
import { COLORS, images} from '../Constantes'
import {Fetch_defib_byId,Adress} from '../redux/actions'


export class MapDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            initialregion:{
                latitude: this.props.route.params.Defib.latitude,
                longitude : this.props.route.params.Defib.longitude,
                latitudeDelta : 100,
                longitudeDelta : windowWidth/windowHeight
            },
            marginBottom : 1,
            coords :{
                latitude:this.props.route.params.Defib.latitude,
                longitude:this.props.route.params.Defib.longitude,
            },
           
            longitudeDelta : windowWidth/windowHeight,
            defib: this.props.route.params.Defib,
           
        }
       
    }
    componentDidMount(){
        setTimeout(()=>this.setState({marginBottom : 0}),10)
       
      
    }

    getMarkerCordinate = (e) => {
    
        e.persist();
         let newDefib = {...this.state.defib,latitude:e.nativeEvent.coordinate.latitude,longitude: e.nativeEvent.coordinate.longitude}
         this.props.Fetch_defib_byId({Defibrilatteur : newDefib})
         this.props.Adress({latitude:e.nativeEvent.coordinate.latitude,longitude: e.nativeEvent.coordinate.longitude});
        
    }
   

    render() {
        return (
            <View style = {{flex:1}}>
                <MapView style = {{flex:1, marginBottom : this.state.marginBottom}}
                ref={(map) => { this.map = map; }}
                onMapReady = {()=>
                    setTimeout(()=>this.map.animateToRegion({
                        latitude:this.state.coords.latitude,
                        longitude : this.state.coords.longitude,
                        latitudeDelta : 0.008,
                        longitudeDelta : 0.016
                    },2000),3000)
                }
                mapType = {this.props.maptype}
                showsUserLocation = {true}
                showsMyLocationButton = {true}
                initialRegion={this.state.initialregion}
                loadingEnabled = {true}
                loadingIndicatorColor = {COLORS.blue}
            >
            <Marker
                coordinate={{latitude : this.state.coords.latitude, longitude : this.state.coords.longitude}}
                title={`Point$`}
                description='gett dscription from details screen'
                draggable
                onDragEnd={(e) => this.getMarkerCordinate(e)}
            />
           </MapView>
            </View>
        )
    }
}


const mapDispatchToProps  = (dispatch) => {
    return {
        Adress: (state) => dispatch(Adress(state)),
        Fetch_defib_byId: (data) => dispatch(Fetch_defib_byId(data))
    }
}

export default connect(null, mapDispatchToProps)(MapDetails)
