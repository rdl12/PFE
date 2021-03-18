import React,{useState,useEffect,} from 'react'
import { View,StyleSheet,Alert,ScrollView,Image } from 'react-native'
import Input from '../components/Input/Input'
import Cards from '../components/Card/Cards'
import PhotoPicker from '../components/ImagePicker/PhotoPicker'
import Header from '../components/Header'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {useSelector} from 'react-redux'
import {AddDefibUrl} from '../utils/constants/Api'
import { Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import {images,COLORS} from '../Constantes'

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
      <View style={{flex:1}}>
          <Header title = "ajouter un defibrilateur" Submit={submit} onPress = {() => navigation.openDrawer()}/>
          <ScrollView style={{flex:1}}>

          
          <Card style={styles.card} >
                <Card.Title title="photo" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                             left={(props) => <Avatar.Icon {...props} icon="folder" />}
                             right={(props) => <IconButton {...props} icon="folder" onPress={() => {openThreeButtonAlert}} />}/>
                <Card.Content >
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
               </Card.Content>
            </Card>
          

           <Card style={styles.card} >
                <Card.Title title="photo" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                             left={(props) => <Avatar.Icon {...props} icon="folder" />}
                             right={(props) => <IconButton {...props} icon="folder" onPress={() => {openThreeButtonAlert}} />}/>
                <Card.Content >
                    <PhotoPicker imageSource={imageSource} press={openThreeButtonAlert} ></PhotoPicker>
               </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title="Adresse" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                            left={(props) => <Avatar.Icon {...props} icon="folder" />}/>
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
                <Card.Title title="Accessibilité" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content>
                    <View>
                      <Paragraph style={styles.para}>ffffffffff</Paragraph>
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card} >
                <Card.Title title="Type d'electrode" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content>
                    <View>
                      <Paragraph style={styles.para}>ffffffffff</Paragraph>
                    </View>
               </Card.Content>
             </Card>
              
          </ScrollView>
            
         
      </View>
    )
}


const styles = StyleSheet.create({
card :{
  width: '87%',
     borderRadius:40,
     marginLeft:25,
     marginTop:"5%",
     marginBottom:10,
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 7,
     },
     shadowOpacity: 0.43,
     shadowRadius: 9.51,
     
    elevation: 15,},

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

export default AddDefibScreen
