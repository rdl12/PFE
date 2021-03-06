import { View,Image,TouchableOpacity, Button, BackHandler} from 'react-native'
import React,{Component} from 'react'
import MapView, { Marker } from 'react-native-maps';
import BaseMapSwitcher from '../components/BaseMapSwitcher/BaseMapSwitcher';
import Header from '../components/Header'
import Geolocation from 'react-native-geolocation-service';
import {windowWidth,windowHeight} from '../utils/Dimentions'
import { COLORS, images} from '../Constantes'
import styles from './styles_global'
import { connect } from 'react-redux';
import { Adress ,Fecth_Defib} from '../redux/actions'
import ListDefib from '../components/ListDefib/ListDefib';
import Dialog from "react-native-dialog";
import Icon from 'react-native-vector-icons/FontAwesome';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'
import HomeScreen from './HomeScreen';

class MapScreen extends Component{
    constructor(props){
        
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
            showAlert:false
            
           
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        const parent = this.props.navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false,  
            tabBarButton: (props) => (
                       <TabBarCustomButton visible
                            {...props}
                        /> ),
      });
        setTimeout(()=>this.setState({marginBottom : 0}),50)
        setTimeout(()=>this.props.Fecth_Defib(this.state.coords,1),500)

      
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        const parent = this.props.navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: true,
            tabBarButton: (props) => (
                     <TabBarCustomButton 
                         {...props}
                     />),
        });
    }

    handleBackButtonClick = () => {
        this.props.navigation.navigate('Home');
        //BackHandler.exitApp();
        return true;
    }
    
    ReturnState = () => {
        this.setState({btn_add_state:false})
           this.map.animateToRegion({
            latitude:this.state.coords.latitude,
            longitude : this.state.coords.longitude,
            latitudeDelta : 0.008,
            longitudeDelta : 0.016
          })

    }
    
    Pressed_Icon = () => {
        if ( this.props.userInfo.isLoggedIn){
            this.setState({btn_add_state:!this.state.btn_add_state})
            this.setState({longitudeDelta:windowWidth/windowHeight + 10})
            this.map.animateToRegion({
                latitude:this.state.coords.latitude,
                longitude : this.state.coords.longitude,
                latitudeDelta : 0.002,
                longitudeDelta : 0.004
              })    
        }
      else{
          this.setState({
              showAlert: !this.state.showAlert
          })
      }
        
    
        
    }

    dispatchDefibAdress = (coords) => {
        this.props.Adress(coords);
        this.props.navigation.navigate('AddDefib')
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
         {this.state.btn_add_state ? (<Header title = "Ajout d'un nouveau DAE" Submit = {() => this.dispatchDefibAdress(this.state.coords)} isRetour ={true} onPress= {()=> this.ReturnState()} />): null}
         {!this.state.btn_add_state ? ( <BaseMapSwitcher  /> ) : null}
           <MapView style = {{flex:1, marginBottom : this.state.marginBottom}}
             ref={(map) => { this.map = map; }}
             onMapReady = {()=>
                setTimeout(()=>this.map.animateToRegion({
                    latitude:this.state.coords.latitude,
                    longitude : this.state.coords.longitude,
                    latitudeDelta : 0.008,
                    longitudeDelta : 0.016
                  },2000),1000)
             }
             mapType = {this.props.maptype}
             showsUserLocation = {!this.state.btn_add_state}
             showsMyLocationButton = {true}
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

            {this.state.btn_add_state ? (<Marker
                draggable
                onDragEnd={(e) => this.getMarkerCordinate(e)}
                coordinate = {this.state.coords}
                pinColor={COLORS.primary}
                 
            />) : null }
           </MapView>
           
           <View>          
          { !this.state.btn_add_state ?   ( 
             <TouchableOpacity
                  style={styles.iconPlaceHolder}
                  onPress={() => this.Pressed_Icon() }
              >
                    <Icon name="plus" size={30} color="#ffff" />
              </TouchableOpacity>) : null 
           }
           
        <View >
        <Dialog.Container visible={this.state.showAlert} style={{borderRadius:300}}>
            <Dialog.Title  Text style={{color : COLORS.black, fontSize:20}}>Veilliez vous connecter avant de s'inscrire</Dialog.Title>
             <Dialog.Button label="Ok"  onPress={() => this.setState({showAlert:!this.state.showAlert})}/>
        </Dialog.Container>
             </View>
        </View>
           
        </View>
    )}
}

const mapStateToProps = (state) => {
    const { MapReducer } = state
    const { Fecth_Defib_in_100 , loginReducer } = state
    return { maptype: MapReducer.maptype , markers:Fecth_Defib_in_100.markers, userInfo: loginReducer }
  }
const mapDispatchToProps = (dispatch) => {

    return {
        Adress: (state) => dispatch(Adress(state)),
        Fecth_Defib: (coords,d) => dispatch(Fecth_Defib(coords,d))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)