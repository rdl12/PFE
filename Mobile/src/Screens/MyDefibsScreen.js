import React,{Component} from 'react'
import { connect } from 'react-redux';
import { COLORS, images} from '../Constantes'
import { Adress ,Fetch_Defib_User,Fecth_DefiById} from '../redux/actions'
import {  View,TouchableOpacity, Button, FlatList,Image,Modal,Text,Pressable, SafeAreaView } from 'react-native'

class MyDefibsScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            coords :{
                latitude:33.7444613,
                longitude:-118.35846,
            },
           
        }
    }

    componentDidMount(){
        this.props.Fetch_Defib_User("ramirachid316@gmail.com")
        console.log(this.props.defibs.Defibrilatteur_user)
    }

    getDetails(id,lat,long) {
        this.props.navigation.navigate('Details', {
            isEdit: true
          })
        this.props.Fecth_DefiById(id);
        let coords={ latitude:lat,
                    longitude:long,}
        this.props.Adress(coords);
 
    }

    renderItem = ({ item }) => (
        
                <View  style={{ padding : 10, backgroundColor : '#ffff',borderBottomWidth : 1, borderColor : "#eee",elevation:5,justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Image
                              source={images.defib_list_icon}
                              style={{ width: 20, height: 25,margin:5, tintColor:'grey' }} 
                              resizeMode = "contain" />
                            <Text style={{marginTop:7,fontWeight: "bold",}} >{item.nom}</Text>
                        </View>
                        <TouchableOpacity  onPress={() => this.getDetails(item.id,item.latitude,item.longitude)}>
                               <Image
                                 source={ images.details_icon}
                                 style={{ width: 40, height: 30,justifyContent: 'center', tintColor:COLORS.primary }} 
                                 resizeMode = "contain"
                               />
                        </TouchableOpacity>
                        
                    </View>

                    <Text style={{}} >{item.adresse}</Text>
                </View>
                    
                    
            
       
       
        );

        render(){
            return (
                <SafeAreaView style={{flex:1,justifyContent:'center',backgroundColor:COLORS.white}}>

                     
                    <FlatList
                       data = {this.props.defibs}
                       renderItem={this.renderItem}
                       keyExtractor={item => item.id.toString()}
                       style={{flex: 0.5}}
                    />  
        
        
                </SafeAreaView>
            )

        }
        
   
}
const mapStateToProps = (state) => {
    const { Fetch_Defib_User } = state
    const { Fecth_DefiById } = state
    return {defibs : Fetch_Defib_User.Defibrilatteur_user}
  }
const mapDispatchToProps = (dispatch) => {

    return {
        Adress: (state) => dispatch(Adress(state)),
        Fetch_Defib_User: (email) => dispatch(Fetch_Defib_User(email)),
        Fecth_DefiById : (id) => dispatch(Fecth_DefiById(id))

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MyDefibsScreen)
