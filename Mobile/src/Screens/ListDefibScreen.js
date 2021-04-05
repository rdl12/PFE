import { View,Image,TouchableOpacity, Button, FlatList,Text} from 'react-native'
import React,{Component} from 'react'
import MapView, { Marker } from 'react-native-maps';
import BaseMapSwitcher from '../components/BaseMapSwitcher/BaseMapSwitcher';
import Geolocation from '@react-native-community/geolocation';
import {windowWidth,windowHeight} from '../utils/Dimentions'
import { COLORS, images} from '../Constantes'
import { connect } from 'react-redux';
import { Adress ,Fecth_Defib,Fecth_DefiById} from '../redux/actions'
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../utils/constants/Api'
import { AdresseReducer } from '../redux/reducer';
import ListDefib from '../components/ListDefib/ListDefib';
import DropDownPicker from 'react-native-dropdown-picker';

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
            rayon : 100000,
           
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
        setTimeout(()=>this.setState({marginBottom : 0}),10)
        
        setTimeout(()=>this.props.Fecth_Defib(this.state.coords,100000),100)
        
    }

    getDetails(id,lat,long) {
        this.props.navigation.navigate('Details')
        this.props.Fecth_DefiById(id);
        let coords={ latitude:lat,
                    longitude:long,}
        this.props.Adress(coords);
    

    }

    ReFetchDefib(d){
        this.setState({rayon : d})
        setTimeout(()=> this.props.Fecth_Defib(this.state.coords,this.state.rayon),1000)
        
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
        <TouchableOpacity style={{ padding : 10, backgroundColor : '#ffff',borderBottomWidth : 1, borderColor : "#eee",elevation:3,flexDirection:'row',justifyContent:'space-between'}}
                                onPress={() => this.ZoomTodefib(item.latitude,item.longitude,item.id) }>
                    <View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Image
                              source={images.defib_list_icon}
                              style={{ width: 20, height: 25,margin:5, tintColor:'grey' }} 
                              resizeMode = "contain" />
                            <Text style={{marginTop:7,fontWeight: "bold",}} >{item.description}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:"space-between"}}>
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
        return (
            <View style = {{flex:2}}>
            <BaseMapSwitcher  />
            <ListDefib  press = {()=>this.setState({isList:!this.state.isList})} isList={this.state.isList} /> 
            
            <DropDownPicker
    items={[
        {label: 'R = 100Km', value: 100},
        {label: 'R = 10Km', value: 10},
        {label: 'R = 1Km', value: 100000},
        {label: 'Tout', value: 10000},
    ]}
    defaultValue={this.state.rayon}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
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
            {this.props.markers && this.props.markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{latitude : marker.latitude, longitude : marker.longitude }}
                        title={`Point$`}
                        description={marker.description}
                    />
                    
                ))}
                
            </MapView>

            {this.state.isList ?(
            <FlatList
               data = {this.props.markers}
               renderItem={this.renderItem}
               keyExtractor={item => item.id.toString()}
               style={{flex: 0.5}}
            />  ):null}

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
        Fecth_Defib: (coords) => dispatch(Fecth_Defib(coords)),
        Fecth_DefiById : (id) => dispatch(Fecth_DefiById(id))

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ListDefibScreen)
