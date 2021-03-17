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
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../utils/constants/Api'

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
            clicked:{},
            showDirections: false,
            destination :{
                latitude:0,
                longitude:0
            }
           
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

    ZoomTodefib(lat,long,id){
        setTimeout(()=>this.map.animateToRegion({
            latitude:lat,
            longitude : long,
            latitudeDelta : 0.0008,
            longitudeDelta : 0.0016
          },2000),300)
          this.setState(prevState => {
            let destination = Object.assign({}, prevState.destination); 
            destination.latitude = lat; 
            destination.longitude = long;                            
            return { destination };                                
          })


        let newClick = {...this.state.clicked}
        newClick[id] = !Boolean(newClick[id])
        this.setState({
            clicked:newClick,
            
          });
    }
    

    renderItem = ({ item }) => (
        <View>
        <TouchableOpacity style={{ padding : 15, backgroundColor : '#ffff',borderBottomWidth : 1, borderColor : "#eee"}}
                                onPress={() => this.ZoomTodefib(item.latitude,item.longitude,item.id) }>
                        <Text>{item.description}</Text>
        </TouchableOpacity>
       { this.state.clicked[item.id] ? (<View style = {{backgroundColor: COLORS.lightGray, padding : 15,borderBottomWidth : 1, borderColor : "#eee"}}>
           <TouchableOpacity
             onPress={() => this.setState({ showDirections : !this.state.showDirections})}>
           <Image
                source={ images.direction_icon }
                style={{ width: 80, height: 50,justifyContent: 'center', }} 
            />
           </TouchableOpacity>
       </View>):null}
        </View>
       
        );
    
    render (){
        return (
            <View style = {{flex:1}}>
            <BaseMapSwitcher  /> 
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
                 <MapViewDirections
                    origin={this.state.coords}
                    destination={this.state.destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                 />
            </MapView>
            <FlatList
               data = {this.props.markers}
               renderItem={this.renderItem}
               keyExtractor={item => item.id.toString()}
               style={{flex: 0.5}}
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
