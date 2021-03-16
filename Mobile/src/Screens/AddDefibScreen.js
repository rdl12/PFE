import React,{useState,useEffect,} from 'react'
import { View,Alert } from 'react-native'
import Input from '../components/Input/Input'
import Card from '../components/Card/Card'
import PhotoPicker from '../components/ImagePicker/PhotoPicker'
import Header from '../components/Header'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {useSelector} from 'react-redux'
import {AddDefibUrl} from '../utils/constants/Api'


const AddDefibScreen = ({navigation}) => {
    const [Nom, setNom] = useState("")
    const [Description, setDescription] = useState("")
    const [imageSource, setImageSource] = useState(null);
    const Adresse = useSelector(state => state.AdresseReducer);
    
     
  
    useEffect(() => {
      console.log("adress:"+Adresse)
      
      }, [Adresse])

    const submit = () =>{
      
      fetch(AddDefibUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
              "id": 10,
              "description" : Description,
              "latitude" : Adresse.lat,
              "longitude" : Adresse.long,
              "photo" : imageSource,
              "motif" : "from_mobile",
              "marque_defib" : Nom
            })
          })
        .then((response) => response.text())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
            )
        })
        .done();
       
     
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
      <View >
          <Header title = "ajouter un defibrilateur" Submit={submit} onPress = {() => navigation.openDrawer()}/>
          <View >

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
          <PhotoPicker imageSource = {imageSource} press= {openThreeButtonAlert}/>
          <Card ADRESSE = {Adresse.addrese} PAYS = {Adresse.pays} PROVINCE = {Adresse.province} />    
          </View>
            
         
      </View>
    )
}




export default AddDefibScreen
