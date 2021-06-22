import React,{useState,useEffect,} from 'react'
import { View,StyleSheet,Alert,ScrollView,Image,Modal,Text,Pressable, SafeAreaView } from 'react-native'
import Input from '../components/Input/Input'
import Modals from '../components/Modal/Modals'
import PhotoPicker from '../components/ImagePicker/PhotoPicker'
import Header from '../components/Header'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import {images,COLORS} from '../Constantes'
import { useDispatch } from 'react-redux';
import {ModalState,Add_Defib_Posted,AccessibiliteState,Fetch_User,Upload_image} from '../redux/actions'
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'
import Dialog from "react-native-dialog";

const AddDefibScreen = ({navigation}) => {
    const [Nom, setNom] = useState("")
    const [Telephone, setTel] = useState("")
    const [Description, setDescription] = useState("")
    const [imageSource, setImageSource] = useState(null);
    const [ImageEncoded, setImageEncoded] = useState("")
    const [uri, seturi] = useState("")
    const [type, settype] = useState("")
    const [data, setdata] = useState("")
    const Adresse = useSelector(state => state.AdresseReducer);
    const Modal_State = useSelector(state => state.Modal_State);
    const AccessibiliteState = useSelector(state => state.get_Accessibilite);
    const LoginInfo = useSelector(state => state.loginReducer);
    const [success, setsucess] = useState(false)
    const user = useSelector(state => state.Fetch_User)
    const dispatch = useDispatch();
   
    useEffect(() => {
      const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
              tabBarVisible: false,  
              tabBarButton: (props) => (
                         <TabBarCustomButton visible
                              {...props}
                          /> ),
        });
      dispatch(Fetch_User(LoginInfo.userId))
      }, [Modal_State, navigation])
  
    const submit = () =>{
      const imageData = new FormData();
                        imageData.append('name', 'File');
                        imageData.append('File', {
                            uri: uri,
                            type: type,
                            name: Adresse.lat+"/"+Adresse.long+".jpg",
                            data: data
                        });
     Upload_image(imageData)
     let defib = {  
        "description" : Description,
        "latitude" : Adresse.lat,
        "longitude" : Adresse.long,
        "photo" : Adresse.lat+"/"+Adresse.long+".jpg",
        "etat":{
          id : 1,
          etat : 'signalé'
         },
        "motif" : "from_mobile",
        "marque_defib" : Nom,
        "accesibillité": AccessibiliteState.checked,
        "nom": Nom,
        "telephone" : Telephone,
        "adresse" : Adresse.addrese,
        "ville" : Adresse.ville,
        "province" : Adresse.province,
        "user" : user.user
        
        
      }
       dispatch(Add_Defib_Posted(defib))
       
        
       
       setsucess(!success)
       setTimeout(() => { 
          setsucess(false)
          navigation.navigate('MyDefibs')
        }, 2000);
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
          seturi(response.uri)
          setdata(response.data)
          settype(response.type)
          
        }
      });
    }
    const imageGalleryLaunch = () => {
            let options = {
              includeBase64: true,
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
            
                    setImageSource(source.uri);
                    
                    seturi(response.uri)
                    setdata(response.data)
                    settype(response.type)
                    
                  }
              
            
            });
          }

   

   
    return (
      <SafeAreaView style={{flex:1,justifyContent:'center',backgroundColor:COLORS.white}}>
        
            <Dialog.Container visible={success}>
                    <Icon name="check-circle" size={80}  resizeMode="contain" color="#228B22" style={{alignSelf:'center'}}/>
                    <Dialog.Description>
                             Defibrillateur ajouté avec succés avec succes
                    </Dialog.Description>
                   
            </Dialog.Container>
          <Modals modalOpen = {Modal_State.isModalOpen} isElectrode = {Modal_State.isElectrode}/>
          <Header title = "Ajouter un defibrilateur" Submit={submit} onPress = {() => navigation.goBack()}/>
          <ScrollView style={{flex:1, marginTop:15}}>
      
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

         <Input
            labelValue={Telephone}
            placeholderText="Telephone"
            onChangeText={(Telephone) => setTel(Telephone)}
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