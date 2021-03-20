import React,{useState,useEffect,} from 'react'
import { View,StyleSheet,Alert,ScrollView,Image,Modal,Text,Pressable, SafeAreaView } from 'react-native'
import Input from '../components/Input/Input'
import Modals from '../components/Modal/Modals'
import PhotoPicker from '../components/ImagePicker/PhotoPicker'
import Header from '../components/Header'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {useSelector} from 'react-redux'
import {AddDefibUrl} from '../utils/constants/Api'
import { Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import {images,COLORS} from '../Constantes'
import { useDispatch } from 'react-redux';
import {ModalState,Add_Defib_Posted,AccessibiliteState} from '../redux/actions'


const AddDefibScreen = ({navigation}) => {
    const [Nom, setNom] = useState("")
    const [Description, setDescription] = useState("")
    const [imageSource, setImageSource] = useState(null);
    const Adresse = useSelector(state => state.AdresseReducer);
    const Modal_State = useSelector(state => state.Modal_State);
    const AccessibiliteState = useSelector(state => state.get_Accessibilite);
    const dispatch = useDispatch();
   
  
    useEffect(() => {
      console.log("adress:"+Modal_State)
    
      
      }, [Modal_State])

    const submit = () =>{
     let defib = {  
        "description" : Description,
        "latitude" : Adresse.lat,
        "longitude" : Adresse.long,
        "photo" : imageSource,
        "motif" : "from_mobile",
        "marque_defib" : Nom,
        "accesibillité": AccessibiliteState.checked,
        "electrode" : AccessibiliteState.isPediatrique
        
      }
       dispatch(Add_Defib_Posted(defib))
    }

   

    const openThreeButtonAlert=()=>{
      Alert.alert(
        'Ajouter une photo!', 'Choisir',
        [
          { text: 'Annuler', onPress: () => console.log('Cancel Pressed'),style: 'cancel'},
          {text: 'ouvrir camera', onPress: () => imageCameraLaunch()},
          {text: 'depuis Galery', onPress: () => imageGalleryLaunch()},
        ],
        { 
          cancelable: false 
        }
      );
    }
    const imageCameraLaunch = () => {
      let options = {
      storageOptions: {
          skipBackup: true,
          path: 'images',
      },
      };
  
      launchCamera(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const source = { uri: response.uri };
          setImageSource(source.uri);
          
        }
      });
    }
    const imageGalleryLaunch = () => {
            let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            };
  
          
        
        launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                    alert('You did not select any image');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                  } else {
                    let source = { uri: response.uri };
                    // ADD THIS
                    setImageSource(source.uri);
                  }
              
            
            });
          }
    
    return (
      <SafeAreaView style={{flex:1,justifyContent:'center',backgroundColor:COLORS.white}}>
          <Modals modalOpen = {Modal_State.isModalOpen} isElectrode = {Modal_State.isElectrode}/>
          <Header title = "ajouter un defibrilateur" Submit={submit} onPress = {() => navigation.openDrawer()}/>
          <ScrollView style={{flex:1}}>
      
          <Input
            labelValue={Nom}
            placeholderText="Nom"
            onChangeText={(Nom) => setNom(Nom)}
            autoCorrect={false}
          />
            <Input
            labelValue={Description}
            placeholderText="Description"
            onChangeText={(description) => setDescription(description)}
            autoCorrect={false}
         />

           <Card style={styles.card} >
                <Card.Title title="Photo" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                             right={(props) => <IconButton {...props} icon={images.add_photo} style = {{marginRight:5,}} />}/>
                <Card.Content >
                    <PhotoPicker imageSource={imageSource} press={openThreeButtonAlert} ></PhotoPicker>
               </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title="Adresse" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                           right={(props) => <IconButton {...props} icon={images.edit_icon} style = {{marginRight:5,}} />}/>
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

          <Card style={styles.card} >
                <Card.Title title="Accessibilité" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                   right={(props) => <IconButton {...props} icon={images.edit_icon} style = {{marginRight:5,marginBottom:0}}  onPress={() =>  dispatch(ModalState({"isModalOpen": true,"isElectrode":false}))}/>}/>
                <Card.Content>
                <View style = {{display:'flex',flexDirection:'row',alignItems:'center'}} >
                  <Title Text style={styles.Title}>Acces:</Title>
                  <Paragraph Text style = {{right:-20,}} >{AccessibiliteState.checked}</Paragraph>
                </View>
               </Card.Content>
             </Card>

             <Card style={styles.card} >
                <Card.Title title="Type d'electrode" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                 right={(props) => <IconButton {...props} icon={images.edit_icon} style = {{marginRight:5,}}  onPress={() =>  dispatch(ModalState({"isModalOpen": true,"isElectrode":true}))}/>}/>
                <Card.Content>
                    <View style = {{display:'flex',flexDirection:'row',alignItems:'center'}} >
                    <Title Text style={styles.Title}>Electrode Pediatriques:</Title>
                      <Paragraph Text style = {{right:-20,}} >{AccessibiliteState.isPediatrique}</Paragraph>
                    </View>
               </Card.Content>
             </Card>
              
          </ScrollView>
            
         
      </SafeAreaView>
    )
}


const styles = StyleSheet.create({
card :{
     borderRadius:40,
     marginLeft:25,
     marginRight:30,
     marginTop:5,
     marginBottom:15,
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 7,
     },
     shadowOpacity: 0.43,
     shadowRadius: 9.51,
     
    elevation: 5,},

cardTitle : {borderBottomWidth:0.5,marginTop:-10},

Title :{color:COLORS.primary, fontSize:15, fontFamily: "Cochin"},

para : {marginTop:10},

add_to_photo:{
    height:100 ,
    width:100,
   margin:15,
   tintColor : '#0000FF'},

icon:{width: 20,  height: 10, padding:0},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#2196F3",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
}

})

export default AddDefibScreen
