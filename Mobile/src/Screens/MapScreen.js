import { View,Image,TouchableOpacity, Button} from 'react-native'
import React,{Component} from 'react'
import MapView, { Marker } from 'react-native-maps';
import BaseMapSwitcher from '../components/BaseMapSwitcher/BaseMapSwitcher';
import LivePosition from '../components/LivePosition';
import SearchMap from '../components/SearchMap'
import Geolocation from '@react-native-community/geolocation';
import {windowWidth,windowHeight} from '../utils/Dimentions'
import { COLORS, images} from '../Constantes'
import styles from './styles_global'
import { connect } from 'react-redux';
import { Adress } from '../redux/actions'

class MapScreen extends Component{
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
            longitudeDelta : windowWidth/windowHeight
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
        setTimeout(()=>this.setState({marginBottom : 0}),10)
        
      
    }
    
  
    
    Pressed_Icon = () => {
        this.setState({btn_add_state:!this.state.btn_add_state})
        this.setState({longitudeDelta:windowWidth/windowHeight + 10})
        this.map.animateToRegion({
            latitude:this.state.coords.latitude,
            longitude : this.state.coords.longitude,
            latitudeDelta : 0.008,
            longitudeDelta : 0.016
          })
        
    }

    dispatchDefibAdress = (coords) => {
        this.props.Adress(coords);
        this.props.navigation.navigate("Add defib")
    }
    getMarkerCordinate = (e) => {
       
        e.persist();
        this.setState(prevState => {
            let coords = Object.assign({}, prevState.coords); 
            coords.latitude = e.nativeEvent.coordinate.latitude; 
            coords.longitude = e.nativeEvent.coordinate.longitude;                             
            return { coords };                                
          })
        
    }
   
    render(){
    return (
        <View style = {{flex:1}}>
           <BaseMapSwitcher/>
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
             mapType = "standard"
             showsUserLocation = {true}
             showsMyLocationButton = {true}
             initialRegion={this.state.initialregion}
             loadingEnabled = {true}
             loadingIndicatorColor = {COLORS.blue}
         
           >

            {this.state.btn_add_state ? (<Marker
                draggable
                onDragEnd={(e) => this.getMarkerCordinate(e)}
                coordinate = {this.state.coords}
                 
            />) : null }
           </MapView>
           
           <View>          
          { !this.state.btn_add_state ?   ( <TouchableOpacity
                  style={styles.iconPlaceHolder}
                  onPress={() => this.Pressed_Icon() }
              >
                  <Image
                        source={images.add_defib}
                        resizeMode="contain"
                        style={styles.image_icon}
                    />       
              </TouchableOpacity>) : <Button title="Envoyer" color="#841584" onPress = {() => this.dispatchDefibAdress(this.state.coords)}  />
           }
           
            </View>
           
        </View>
    )}
}

const mapDispatchToProps = (dispatch) => {

    return {
        Adress: (state) => dispatch(Adress(state))
        
    }
};
export default connect(null, mapDispatchToProps)(MapScreen)