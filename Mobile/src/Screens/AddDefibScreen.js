import React,{useState,useEffect} from 'react'
import { View,Text,Alert } from 'react-native'
import Input from '../components/Input/Input'
import Card from '../components/Card/Card'
import PhotoPicker from '../components/ImagePicker/PhotoPicker'
import Header from '../components/Header'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';

const AddDefibScreen = () => {
    const [Nom, setNom] = useState("")
    const [Description, setDescription] = useState("")
    const [imageSource, setImageSource] = useState(null);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
     

    Geolocation.getCurrentPosition(data => {
      setLong(data.coords.longitude)
    }, (error) => alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000 })
    Geolocation.getCurrentPosition(data => {
      setLat(data.coords.latitude)
    }, (error) => alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000 })
  
    const submit = () =>{
      fetch('http://192.168.43.156:9090/Defibrillateur/add', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
              "id": 10,
              "description" : Description,
              "latitude" : lat,
              "longitude" : long,
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
      <View>
          <Header title = "ajouter un defibrilateur" onPress={submit}/>
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
          <Card />        
         
      </View>
    )
}

export default AddDefibScreen
