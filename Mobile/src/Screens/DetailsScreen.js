import React,{useState,useEffect,} from 'react'
import { View, Text, StyleSheet,ScrollView,SafeAreaView,Image } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, ActivityIndicator,IconButton} from 'react-native-paper';
import {images,COLORS} from '../Constantes'
import MapView, { Marker } from 'react-native-maps';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Modals from '../components/Modal/Modals'
import Dialog from "react-native-dialog";
import {useSelector,useDispatch} from 'react-redux'
import {ModalState,} from '../redux/actions'

const DetailsScreen = ({navigation}) => {
    const Modal_State = useSelector(state => state.Modal_State);
    const Get_Defib = useSelector(state => state.Get_Defib);
    const Adresse = useSelector(state => state.AdresseReducer);
    const AccessibiliteState = useSelector(state => state.get_Accessibilite);
    const [visible, setVisible] = useState(false);
    const [title, settitle] = useState('');
    const [value, setvalue] = useState('');
    const [Nom, setNom] = useState(Get_Defib.Defibrilatteur.nom)
    const [Telephone, setTel] = useState(Get_Defib.Defibrilatteur.telephone)
    const [Description, setDescription] = useState(Get_Defib.Defibrilatteur.description)
    const [Marque, setMarque] = useState(Get_Defib.Defibrilatteur.marque_defib)
    const [Accessibilite, setAccessibilite] = useState(Get_Defib.Defibrilatteur.accesibillité)
    const dispatch = useDispatch();


    const showDialog = (title,value) => {
      console.log(Telephone)
      console.log(Nom)
      console.log(Description)
      setvalue(String(value))
      settitle(title)
      setVisible(true);
    };
     const HandleModal = () => {
      dispatch(ModalState({"isModalOpen": true,"isElectrode":false}))
     
      
      
     }
    const setmodif = (id,modif) =>{
      if(id=="Telephone") {setTel(modif)}
      else if (id=="Description") {setDescription(modif)}
      else if (id=="Nom") {setNom(modif)}
      else if (id == "marque") {setMarque(modif)}
      
    }
  
    const handleCancel = () => {
      setVisible(false);
    };

    useEffect(() => {
        console.log(Get_Defib)
       
    }, [Get_Defib])
    return (
        <SafeAreaView style = {{backgroundColor:Colors.white,flex : 1}}>
          {Get_Defib.Defibrilatteur.latitude === undefined ? (
             <ActivityIndicator size="large" animating = {true}  style = {{flex : 1,justifyContent:'center' ,alignItems:'center'}} />
          ):(
            
            <ScrollView>
               <Modals modalOpen = {Modal_State.isModalOpen} isElectrode = {Modal_State.isElectrode}/>
          <Dialog.Container visible={visible}>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Input 
              style={{borderColor:COLORS.black, borderWidth:1}}
                  placeholder = {value}
                  mode = 'outlined'
                  onChangeText={(modif) => setmodif(title,modif)}/>
              <Dialog.Button label="OK" onPress={handleCancel} />
          </Dialog.Container>
            <Card style={styles.card}>
                <Card.Title title="Telephone" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                            right={(props) => <IconButton {...props} icon={images.next_icon}  size={25}  onPress= {() => showDialog("Telephone",Get_Defib.Defibrilatteur.telephone)} />}/>
                <Card.Content>
                    <View>
                      <Paragraph style={styles.para}>{Telephone}</Paragraph>
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Specification" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                           right={(props) => <IconButton {...props} icon={images.next_icon}  size={25}  onPress= {() => showDialog("marque",Get_Defib.Defibrilatteur.marque_defib)} />}/>
                <Card.Content>
                <View style = {{display:'flex',flexDirection:'row'}}>
                    <View style={{flex:1}}>
                      <Title Text style={styles.Title}>Marque</Title>
                      <Paragraph>{Marque}</Paragraph>
                      <Title Text style={styles.Title}>Description</Title>
                      <Paragraph>{Description}</Paragraph>
                    </View>
                </View>
                    
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Nom" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                             right={(props) => <IconButton {...props} icon={images.next_icon}  size={25}  onPress= {() => showDialog("Nom",Get_Defib.Defibrilatteur.nom)} />}/>
                <Card.Content>
                    <View>
                      <Paragraph style={styles.para}>{Nom}</Paragraph>
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Adresse" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content>
                <View style = {{display:'flex',flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <View>
                          <Title Text style={styles.Title}>Adresse</Title>
                          <Paragraph>{Adresse.addrese}</Paragraph>
                        </View>
                        <View>
                          <Title Text style={styles.Title}>codePostal</Title>
                          <Paragraph>{Adresse.codePostal}</Paragraph>
                        </View>
                        <View>
                          <Title Text style={styles.Title}>province</Title>
                          <Paragraph>{Adresse.province}</Paragraph>
                        </View>
                    </View>
                    <View style={{flex:1,marginLeft:20}}>
                        <View>
                          <Title Text style={styles.Title}>ville</Title>
                          <Paragraph>{Adresse.ville}</Paragraph>
                        </View>
                        <View>
                          <Title Text style={styles.Title}>Pays</Title>
                          <Paragraph>{Adresse.pays}</Paragraph>
                        </View>
                        <View>
                        </View>
                    </View>
                </View>   
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Emplacement" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                 right={(props) => <IconButton {...props} icon={images.next_icon}  size={25}  onPress= {() => navigation.navigate('MapScreen',{titre:'choisissez un emplacement',lat:Get_Defib.Defibrilatteur.latitude,long:Get_Defib.Defibrilatteur.longitude})} />}/>
                <Card.Content style = {{flex:1}}>
                    <View style = {{flex:1}}>
                      <MapView style = {{display:'flex', justifyContent:'center', alignContent:'stretch',width:350,height:200,marginTop:5}}
                        mapType = 'standard'
                        scrollEnabled = {false}
                        showsTraffic ={true}
                        initialRegion={{
                            latitude:Get_Defib.Defibrilatteur.latitude,
                            longitude :Get_Defib.Defibrilatteur.longitude,
                            latitudeDelta : 0.0008,
                            longitudeDelta : 0.0016
                           }}
                      >
                      <Marker
                        key={Get_Defib.Defibrilatteur.id}
                        coordinate={{latitude : Get_Defib.Defibrilatteur.latitude, longitude : Get_Defib.Defibrilatteur.longitude }}
                        color='#0000FF'
                    />
                        
                      </MapView>
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Accessibilité" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                  right={(props) => <IconButton {...props} icon={images.edit_icon} style = {{marginRight:5,marginBottom:0}}  onPress={() =>  HandleModal()}/>}/>
                <Card.Content>
                    <View>
                      { AccessibiliteState.checked === 'Non mentionne' ? (<Paragraph style={styles.para}>{Accessibilite}</Paragraph>) : (<Paragraph style={styles.para}>{AccessibiliteState.checked}</Paragraph>)}
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card} >
                <Card.Title title="photo" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content >
                    <View>
                    {Get_Defib.Defibrilatteur.photo === null ? (
                         <Image
                            source={images.add_to_photo}
                            resizeMode='stretch'
                            style = {styles.add_to_photo}  />   ) 
                        : (
                        <Image
                            source={{ uri: Get_Defib.Defibrilatteur.photo }}
                            style = {styles.add_to_photo}  
                            resizeMode='contain'  />  )}
                    </View>
               </Card.Content>
             </Card>

             

        </ScrollView>)}
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
card :{
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 7,
     },
     shadowOpacity: 0.43,
     shadowRadius: 9.51,
     
     elevation: 3,
    margin:15,
    
    marginTop:10},

cardTitle : {borderBottomWidth:0.45},

Title :{color:COLORS.primary, fontSize:15, fontFamily: "Cochin"},

para : {marginTop:10},

add_to_photo:{
    height:100 ,
    width:100,
   margin:15,
   tintColor : '#0000FF'},

icon:{width: 20,  height: 10, padding:0}

})
export default DetailsScreen