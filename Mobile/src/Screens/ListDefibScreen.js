import { View,Image,TouchableOpacity, PermissionsAndroid, FlatList,Text} from 'react-native'
import React,{Component} from 'react'
import MapView, { Marker } from 'react-native-maps';
import BaseMapSwitcher from '../components/BaseMapSwitcher/BaseMapSwitcher';
import Geolocation from 'react-native-geolocation-service';
import {windowWidth,windowHeight} from '../utils/Dimentions'
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import { connect } from 'react-redux';
import { Adress ,Fecth_Defib,Fecth_DefiById} from '../redux/actions'
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../utils/constants/Api'
import { AdresseReducer } from '../redux/reducer';
import ListDefib from '../components/ListDefib/ListDefib';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import  {requestLocationPermission} from '../services/LocationPermission'


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
            rayon : 1,
           
            btn_add_state:false,
            longitudeDelta : windowWidth/windowHeight,
            clicked:{},
            isList:true,
            showDirections: false,
            destination :{
                latitude:0,
                longitude:0
            },
            timeTravel : 0,
            distanceTravel : 0,
            country: 'uk'
           
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
        requestLocationPermission()
        setTimeout(()=>this.setState({marginBottom : 0}),50)
        console.log(this.state.rayon)
        setTimeout(()=> this.props.Fecth_Defib(this.state.coords,this.state.rayon),500)
    }

    getDetails(id,lat,long) {
        this.props.navigation.navigate('Details', {
            isEdit: false
          })
        this.props.Fecth_DefiById(id);
        let coords={ latitude:lat,
                    longitude:long,}
        this.props.Adress(coords);
 
    }

    ReFetchDefib(d){
      
       this.props.Fecth_Defib(this.state.coords,d)
        
    }

    ZoomTodefib(lat,long,id){
        setTimeout(()=>this.map.animateToRegion({
            latitude:lat,
            longitude : long,
            latitudeDelta : 0.0004,
            longitudeDelta : 0.0008
          },1000),300)
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
        <TouchableOpacity style={{ padding : 10, backgroundColor : '#ffff',borderBottomWidth : 1, borderColor : "#eee",elevation:3,justifyContent:'space-between'}}
                                onPress={() => this.ZoomTodefib(item.latitude,item.longitude,item.id) }>
                    <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{display:'flex',justifyContent:'flex-start',flexDirection:'row'}}>
                            <Image
                              source={images.defib_list_icon}
                              style={{ width: 20, height: 25,margin:5, tintColor:'grey' }} 
                              resizeMode = "contain" />
                            <Text style={{marginTop:7,fontWeight: "bold",}} >{item.nom}</Text>
                        </View>
                        <View style={{display:'flex',justifyContent:'flex-end',flexDirection:'row'}}>
                             { this.state.clicked[item.id] ? ( <Text style={{marginTop:7,fontWeight: "bold",}} >{Math.round(this.state.timeTravel)} min</Text>) : null}
                             { !this.state.clicked[item.id] ? (
                            <Image
                              source={ images.arrow_down }
                              style={{ width: 30, height: 30, tintColor:COLORS.primary }} 
                              resizeMode = "contain" />
                              ):
                            
                            <Image
                              source={ images.arrow_down }
                              style={{ width: 30, height: 30, tintColor:COLORS.primary,transform: [{rotateX: '180deg'}] }} 
                              resizeMode = "contain" />
                              }
                        </View>
                    </View>

                       <Text style={{}} >{item.adresse}</Text> 
                    </View>
                    
                    
                        
        </TouchableOpacity>
       { this.state.clicked[item.id] ? (<View style = {{backgroundColor: COLORS.lightGray, padding : 7,borderBottomWidth : 1, borderColor : "#eee",flexDirection:'row',justifyContent:'space-between'}}>
           <View style = {{display:'flex',justifyContent:'flex-start',marginTop:7,flexDirection:'row'}}>
               <Text style={{fontSize:13, fontFamily: "Cochin", fontWeight: "bold"}}>  Accessibilité : </Text>
               <Text style={{fontSize:13, fontFamily: "Cochin", fontWeight: "bold"}}>{item.accesibillité}</Text>
           </View>
           <View style = {{display:'flex',justifyContent:'flex-end',flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => this.setState({ showDirections : !this.state.showDirections})}>
                <Image
                        source={ images.direction_icon }
                        style={{ width: 50, height: 30,justifyContent: 'center', tintColor:'red' }} 
                        resizeMode = "contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.getDetails(item.id,item.latitude,item.longitude)}>
                <Image
                        source={ images.details_icon}
                        style={{ width: 50, height: 30,justifyContent: 'center', tintColor:COLORS.primary }} 
                        resizeMode = "contain"
                    />
                </TouchableOpacity>
           </View>
         
       </View>):null}
        </View>
       
        );
    
    render (){
      
         let markers_filtered = this.props.markers.filter(
           (defib) => defib.etat.etat === 'validé'
         );
        return (
            <View style = {{flex:2}}>
            <BaseMapSwitcher  />
            <ListDefib  press = {()=>this.setState({isList:!this.state.isList})} isList={this.state.isList} /> 
            
            <DropDownPicker
                items={[
                    {label: 'R = 100Km', value: 100},
                    {label: 'R = 10Km', value: 10},
                    {label: 'R = 1Km', value: 1},
                    {label: 'Tout', value: 100000},
                ]}
                defaultValue={this.state.rayon}
                containerStyle={{height: 0,width:120}}
                style={{backgroundColor: '#fafafa',position:"absolute",zIndex:2,left:windowWidth/2,top:9, height:40,width:110}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa',position:"absolute",zIndex:2,left:windowWidth/2,top:20}}
                onChangeItem={item => this.ReFetchDefib(item.value)}
            />

            <MapView style = {{flex:1.9, marginBottom : this.state.marginBottom,}}
                 ref={(map) => { this.map = map; }}
                 onMapReady = {()=>
                    setTimeout(()=>this.map.animateToRegion({
                        latitude:this.state.coords.latitude,
                        longitude : this.state.coords.longitude,
                        latitudeDelta : 0.002,
                        longitudeDelta : 0.004
                      },2000),2000)
                 }
                 
                 mapType = {this.props.maptype}
                 showsUserLocation = {!this.state.btn_add_state}
                 initialRegion={this.state.initialregion}
                 loadingEnabled = {true}
                 loadingIndicatorColor = {COLORS.blue}
                 showsTraffic ={true}
                 showsMyLocationButton = {true}
                 
             
               >
{this.state.showDirections ?( <MapViewDirections
                    origin={this.state.coords}
                    destination={this.state.destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor={COLORS.primary}
                    onReady={result => {
                        this.setState({timeTravel:result.duration})
                        this.setState({distanceTravel:result.distance})
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)}}
                 /> ): 
                 <MapViewDirections
                    origin={this.state.coords}
                    destination={this.state.destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={0}
                    strokeColor={COLORS.primary}
                    onReady={result => {
                        this.setState({timeTravel:result.duration})
                        this.setState({distanceTravel:result.distance})
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)}}
                 />}
            {markers_filtered && markers_filtered.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{latitude : marker.latitude, longitude : marker.longitude }}
                        title={marker.nom}
                        description={marker.description}>
                            <Icon name="thumb-tack" size={35} color='red'   />
                    </Marker>
                        
                               
                    
                    
                ))}
                
            </MapView>

            {this.state.isList  ?(
            <View style={{flex:1}}>
        {this.state.rayon.length === 0 ?(<FlatList
                    data = {markers_filtered}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id.toString()}
                    
                    />):
                (
                    <View style={{flex:1, justifyContent:'center',backgroundColor:COLORS.white}}>
                        <Icon name="exclamation" size={70}  resizeMode="contain" color="red" style={{alignSelf:'center', margin:10,marginTop:-15}}/>
                        <Text style={{...FONTS.h3, color: COLORS.black,textAlign:'center'}}>Aucun defibrillateur n'a été trouvé dans un rayoun de 100 m </Text>
                        <Text style={{...FONTS.h3, color: COLORS.black,textAlign:'center'}}>Essayer d'alergir le rayon de recherche en haut</Text>
                    </View>
                )} 
            </View>
             ):null}

            </View>
        )
    }
  
}

const mapStateToProps = (state) => {
    const { MapReducer } = state
    const { Fecth_Defib_in_100 } = state
    const { Fecth_DefiById } = state
    return { maptype: MapReducer.maptype , markers:Fecth_Defib_in_100.markers }
  }
const mapDispatchToProps = (dispatch) => {

    return {
        Adress: (state) => dispatch(Adress(state)),
        Fecth_Defib: (coords,d) => dispatch(Fecth_Defib(coords,d)),
        Fecth_DefiById : (id) => dispatch(Fecth_DefiById(id))

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ListDefibScreen)
