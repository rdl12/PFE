import React,{useState,useEffect,useRef} from 'react'
import { View, Text, StyleSheet,ScrollView,SafeAreaView,Image,TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, ActivityIndicator,IconButton} from 'react-native-paper';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import MapView, { Marker } from 'react-native-maps';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Modals from '../components/Modal/Modals'
import Dialog from "react-native-dialog";
import {useSelector,useDispatch} from 'react-redux'
import {Modify_defib, ModalState,Fetch_defib_byId} from '../redux/actions'
import {windowWidth,windowHeight} from '../utils/Dimentions'

const DetailsScreen = ({route,navigation}) => {
    const {isEdit} = route.params;
    const Modal_State = useSelector(state => state.Modal_State);
    const Get_Defib = useSelector(state => state.Get_Defib);
    const Adresse = useSelector(state => state.AdresseReducer);
    const AccessibiliteState = useSelector(state => state.get_Accessibilite);
    const [visible, setVisible] = useState(false);
    const [title, settitle] = useState('');
    const [value, setvalue] = useState('');
    const [id, setid] = useState('')
    const [Nom, setNom] = useState('')
    const [Telephone, setTel] = useState('')
    const [Description, setDescription] = useState('')
    const [Marque, setMarque] = useState('')
    const [Accessibilite, setAccessibilite] = useState('')
    const dispatch = useDispatch();
    const mapView = React.createRef();
  

    const showDialog = (title,value) => {
    setvalue(String(value))
    settitle(title)
    setVisible(true);
    };
    const HandleModal = () => {
    dispatch(ModalState({"isModalOpen": true,"isElectrode":false}))



    }
    const setmodif = (id,modif) =>{
        if(id=="Telephone") {
        setTel(modif)

        }
        else if (id=="Description") {setDescription(modif)}
        else if (id=="Nom") {setNom(modif)}
        else if (id == "marque") {setMarque(modif)
        }

    }

    const handleCancel = (title) => {
    setVisible(false);
    if (title == 'Telephone')
    {
      Get_Defib.Defibrilatteur.telephone = Telephone
    }
  
    if (title == 'Specification')
    {
      Get_Defib.Defibrilatteur.description = Description
      Get_Defib.Defibrilatteur.marque_defib = Marque
    }
    if (title == 'Nom')
    {
      Get_Defib.Defibrilatteur.nom = Nom
    }
   
    dispatch(Fetch_defib_byId({Defibrilatteur : Get_Defib.Defibrilatteur}))
    };

    const modify = () => {
         if(AccessibiliteState.checked == 'Non mentionne' || AccessibiliteState.checked == undefined){
        let access = Get_Defib.Defibrilatteur.accesibillité
        }
         else 
            {Get_Defib.Defibrilatteur.accesibillité = AccessibiliteState.checked }
      
         Get_Defib.Defibrilatteur.adresse = Adresse.addrese 
         Get_Defib.Defibrilatteur.province =   Adresse.province
         Get_Defib.Defibrilatteur.ville = Adresse.ville 
         Get_Defib.Defibrilatteur.latitude = Adresse.lat
         Get_Defib.Defibrilatteur.longitude = Adresse.long
         Get_Defib.Defibrilatteur.etat.etat = 'modifié'
         Get_Defib.Defibrilatteur.etat.id = 4
         console.log(Adresse.addrese)
         setTimeout(() =>  Modify_defib(Get_Defib.Defibrilatteur),1000)
    }
  
    useEffect(() => {
      if(isEdit){
        navigation.setOptions({
          headerRight : props => (
            <TouchableOpacity {...props} onPress={() => modify()} >
                <Text style={{marginRight:15, fontSize:20}}>Modifier</Text>
            </TouchableOpacity>
         )
        })
      }
      
      setid(Get_Defib.Defibrilatteur.id)
      setNom(Get_Defib.Defibrilatteur.nom)
      setTel(Get_Defib.Defibrilatteur.telephone)
      setDescription(Get_Defib.Defibrilatteur.description)
      setMarque(Get_Defib.Defibrilatteur.marque_defib)
      setAccessibilite(Get_Defib.Defibrilatteur.accesibillité)
      if (mapView.current){
        mapView.current.animateToRegion({
          latitude:Get_Defib.Defibrilatteur.latitude,
          longitude : Get_Defib.Defibrilatteur.longitude,
          latitudeDelta : 0.002,
          longitudeDelta : 0.004
        })
       
      }

     
      
    }, [Get_Defib.Defibrilatteur,AccessibiliteState.checked,Adresse])
    return (
        <SafeAreaView style = {{backgroundColor:Colors.white,flex : 1}}>

           {/* Header */}
              <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 ,backgroundColor:COLORS.WHITE, marginBottom:20}}>
                  <TouchableOpacity
                      style={{ marginLeft: -8 }}
                      onPress={() => navigation.goBack()}
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
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>Details</Text>
                  </View>

               </View>
      

          {Get_Defib.Defibrilatteur.latitude === undefined || id === undefined ? (
             <ActivityIndicator size="large" animating = {true}  style = {{flex : 1,justifyContent:'center' ,alignItems:'center'}} />
          ):(
            
            <ScrollView>
               <Modals modalOpen = {Modal_State.isModalOpen} isElectrode = {Modal_State.isElectrode}/>


          <Dialog.Container visible={visible} contentStyle={{padding:-10, paddingTop:-20}}>
              <View style={{backgroundColor:COLORS.primary,padding:15,marginTop:-25, marginBottom:30}}>
              <Dialog.Title  Text style={{color : COLORS.white, fontSize:22}}>{title}</Dialog.Title>
              </View>
              
              {title === "Specification" ?(
                 <Dialog.Input 
                     label = "Marque"
                     style={{borderBottomColor:COLORS.black, borderBottomWidth:1, }}
                     placeholder = {Get_Defib.Defibrilatteur.description}
                     mode = 'outlined'
                     onChangeText={(modif) => setMarque(modif)}
                    
                    />
              ):
              <Dialog.Input 
                  style={{borderBottomColor:COLORS.black, borderBottomWidth:1, }}
                  placeholder = {value}
                  mode = 'outlined'
                  onChangeText={(modif) => setmodif(title,modif)}/>}
              
              {title === "Specification" ?(
                 <Dialog.Input 
                     label = "Description"
                     style={{borderBottomColor:COLORS.black, borderBottomWidth:1, }}
                     placeholder = {Get_Defib.Defibrilatteur.description}
                     mode = 'outlined'
                     onChangeText={(modif) => setDescription(modif)}/>
              ):null}
              <Dialog.Button label="OK" onPress={ () => handleCancel(title)} style={{color:COLORS.primary , marginRight:10}}  />
              
          </Dialog.Container>


            <Card style={styles.card}>
              {isEdit ?(
                <Card.Title title="Telephone" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                            right={(props) => <IconButton {...props} icon={images.edit_icon}  size={25}  onPress= {() => showDialog("Telephone",Get_Defib.Defibrilatteur.telephone)} />}/>
              ):(
                <Card.Title title="Telephone" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                
              )}
                <Card.Content>
                    <View>
                      <Paragraph style={styles.para}>{Get_Defib.Defibrilatteur.telephone}</Paragraph>
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card}>
               {isEdit?(
                  <Card.Title title="Specification" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                              right={(props) => <IconButton {...props} icon={images.edit_icon}  size={25}  onPress= {() => showDialog("Specification",Get_Defib.Defibrilatteur.marque_defib)} />}/>
                ):(
                  <Card.Title title="Specification" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
       
                )}
               <Card.Content>
                <View style = {{display:'flex',flexDirection:'row'}}>
                    <View style={{flex:1}}>
                      <Title Text style={styles.Title}>Marque</Title>
                      <Paragraph>{Get_Defib.Defibrilatteur.marque_defib}</Paragraph>
                      <Title Text style={styles.Title}>Description</Title>
                      <Paragraph>{Get_Defib.Defibrilatteur.description}</Paragraph>
                    </View>
                </View>
                    
               </Card.Content>
             </Card>

             <Card style={styles.card}>
               {isEdit?(
                 <Card.Title title="Nom" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                 right={(props) => <IconButton {...props} icon={images.edit_icon}  size={25}  onPress= {() => showDialog("Nom",Get_Defib.Defibrilatteur.nom)} />}/>
                 ):(
                  <Card.Title title="Nom" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
     
                 )}
                <Card.Content>
                    <View>
                      <Paragraph style={styles.para}>{Get_Defib.Defibrilatteur.nom}</Paragraph>
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
               {isEdit?(
                 <Card.Title title="Emplacement" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                 right={(props) => <IconButton {...props} icon={images.edit_icon}  size={25}  onPress= {() => navigation.navigate('MapDetails',{titre:'choisissez un emplacement',Defib:Get_Defib.Defibrilatteur})} />}/>
               ):(
                <Card.Title title="Emplacement" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
               
               )}
                <Card.Content style = {{flex:1}}>
                    <View style = {{flex:1}}>
                      <MapView style = {{display:'flex', justifyContent:'center', alignContent:'stretch',width:windowWidth*0.85 ,height:200,marginTop:5}}
                        ref={mapView}
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
               {isEdit ? (
                  <Card.Title title="Accessibilité" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                     right={(props) => <IconButton {...props} icon={images.edit_icon} style = {{marginRight:5,marginBottom:0}}  onPress={() =>  HandleModal()}/>}/>
                 ):(
                  <Card.Title title="Accessibilité" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                
                 )}
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