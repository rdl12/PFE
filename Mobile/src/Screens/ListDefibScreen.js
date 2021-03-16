import { View,Image,TouchableOpacity, Button, FlatList,TouchableHighlight,Text} from 'react-native'
import React,{Component} from 'react'
import MapView, { Marker } from 'react-native-maps';
import BaseMapSwitcher from '../components/BaseMapSwitcher/BaseMapSwitcher';
import Geolocation from '@react-native-community/geolocation';
import {windowWidth,windowHeight} from '../utils/Dimentions'
import { COLORS, images} from '../Constantes'
import styles from './styles_global'
import { connect } from 'react-redux';
import { Adress ,Fecth_Defib} from '../redux/actions'


class ListDefibScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            initialregion:{
                latitude:33.5731104,
                longitude : -7.589843,
                latitudeDelta : 100,
                longitudeDelta : windowWidth/windowHeight
            },
            marginBottom : 1,
            coords :{
                latitude:33.7444613,
                longitude:-118.35846,
            },
           
            btn_add_state:false,
            longitudeDelta : windowWidth/windowHeight,
            
           
        }

        Geolocation.getCurrentPosition(data => {
            this.setState(prevState => {
                let coords = Object.assign({}, prevState.coords); 
                coords.latitude = data.coords.latitude; 
                coords.longitude = data.coords.longitude;                             
                return { coords };                                
              })
          }, (error) => alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000 })    
    }


   
    componentDidMount(){
        //setTimeout(()=>this.setState({marginBottom : 0}),10)
        setTimeout(()=>this.props.Fecth_Defib(this.state.coords),50)
        console.log(this.props.markers)
      
    }

    ZoomTodefib(lat,long){
        setTimeout(()=>this.map.animateToRegion({
            latitude:lat,
            longitude : long,
            latitudeDelta : 0.0008,
            longitudeDelta : 0.0016
          },2000),300)

    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={{ padding : 15, backgroundColor : '#ffff',borderBottomWidth : 1, borderColor : "#eee"}}
                          onPress={() => this.ZoomTodefib(item.latitude,item.longitude) }>
                  <Text>{item.description}</Text>
        </TouchableOpacity>
        );
    
    render (){
        return (
            <View style = {{flex:1}}>
            <BaseMapSwitcher  /> 
            <MapView style = {{flex:5, marginBottom : this.state.marginBottom}}
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
                 showsUserLocation = {!this.state.btn_add_state}
                 initialRegion={this.state.initialregion}
                 loadingEnabled = {true}
                 loadingIndicatorColor = {COLORS.blue}
             
               >
            {this.props.markers && this.props.markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{latitude : marker.latitude, longitude : marker.longitude }}
                        title={`Point$`}
                        description={marker.description}
                    />
                    
                ))}
            </MapView>
            <FlatList
               data = {this.props.markers}
               renderItem={this.renderItem}
               keyExtractor={item => item.id}
            />

            </View>
        )
    }
  
}

const mapStateToProps = (state) => {
    const { MapReducer } = state
    const { Fecth_Defib_in_100 } = state
    return { maptype: MapReducer.maptype , markers:Fecth_Defib_in_100.markers }
  }
const mapDispatchToProps = (dispatch) => {

    return {
        Adress: (state) => dispatch(Adress(state)),
        Fecth_Defib: (coords) => dispatch(Fecth_Defib(coords))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ListDefibScreen)
