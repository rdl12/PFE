import React,{Component} from 'react'
import { connect } from 'react-redux';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
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
        this.props.Fetch_Defib_User(this.props.email)
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
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Image
                              source={images.defib_list_icon}
                              style={{ width: 20, height: 25,margin:5, tintColor:'grey' }} 
                              resizeMode = "contain" />
                            <Text style={{marginTop:7,fontWeight: "bold",}} >{item.nom}</Text>
                            
                        </View>
                        <TouchableOpacity  onPress={() => this.getDetails(item.id,item.latitude,item.longitude)} style={{flexDirection:'row'}}>
                             {item.etat.etat === "rejeté"? (<Text style={{marginTop:7,fontWeight: "bold", justifyContent:'flex-end', color:'red'}}>{item.etat.etat}</Text>) : 
                              item.etat.etat === "validé"? (<Text style={{marginTop:7,fontWeight: "bold", justifyContent:'flex-end', color:'green'}}>{item.etat.etat}</Text>) :
                              item.etat.etat === "signalé"? (<Text style={{marginTop:7,fontWeight: "bold", justifyContent:'flex-end', color:'blue'}}>{item.etat.etat}</Text>) :
                              item.etat.etat === "modifié"? (<Text style={{marginTop:7,fontWeight: "bold", justifyContent:'flex-end', color:'grey'}}>{item.etat.etat}</Text>) :
                              item.etat.etat === "en cours de traitement"? (<Text style={{marginTop:7,fontWeight: "bold", justifyContent:'flex-end', color:'orange'}}>{item.etat.etat}</Text>) :null}
                               <Image
                                 source={ images.details_icon}
                                 style={{ width: 40, height: 30,justifyContent: 'center', tintColor:COLORS.primary }} 
                                 resizeMode = "contain"
                               />
                        </TouchableOpacity>
                        
                    </View>
                    

                    {item.etat.etat === "rejeté"? (<Text style={{}} >motif de rejet : {item.motif}</Text>):(<Text style={{}} >{item.adresse}</Text>)}
                </View>
                    
                    
            
       
       
        );

        render(){
            return (
                <SafeAreaView style={{flex:1,justifyContent:'center',backgroundColor:COLORS.white}}>
                     {/* Header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 ,backgroundColor:COLORS.WHITE, marginBottom:20}}>
                  <TouchableOpacity
                      style={{ marginLeft: -8 }}
                      onPress={() => this.props.navigation.navigate('Profil')}
                  >
                      <Image
                          source={images.back_arrow}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              tintColor: COLORS.black
                          }}
                      />
                  </TouchableOpacity>

                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>Mes Defibrillateurs</Text>
                  </View>

               </View>

                     
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
    const { loginReducer } = state
    const { Fetch_Defib_User } = state
    const { Fecth_DefiById } = state
    return {defibs : Fetch_Defib_User.Defibrilatteur_user, email : loginReducer.userId}
  }
const mapDispatchToProps = (dispatch) => {

    return {
        Adress: (state) => dispatch(Adress(state)),
        Fetch_Defib_User: (email) => dispatch(Fetch_Defib_User(email)),
        Fecth_DefiById : (id) => dispatch(Fecth_DefiById(id)),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MyDefibsScreen)
