import React ,{useState, useEffect}  from 'react'
import {StyleSheet ,StatusBar, KeyboardAvoidingView,TouchableOpacity,Image,ImageBackground,View} from 'react-native'
import { Block, Text } from "galio-framework";
import Dialog from "react-native-dialog";
import { useDispatch } from 'react-redux';
import { COLORS,images } from "../Constantes";
import ArInput from '../components/GalioInput/Input'
import ArButton  from '../components/Button/Button'
import {windowWidth as width ,windowHeight as height} from '../utils/Dimentions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Reset_Password } from '../redux/actions';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'


const ResetPasswordScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [success, setsucess] = useState(false)
     const [wrong, setwrong] = useState(false) 
    const dispatch = useDispatch()

    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
              tabBarVisible: false,  
              tabBarButton: (props) => (
                        <TabBarCustomButton visible
                              {...props}
                          /> ),
        });
      return () =>
          parent.setOptions({
                tabBarVisible: true,
                tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                        />),
            });
    }, [navigation])

    const submit = () => {
      if(username!=''){
        dispatch(Reset_Password(username))
        setsucess(true)
      }
      else {
        setwrong(true)
      }
      }
    return (
   
          <Block flex middle  style = {{backgroundColor:COLORS.white}}>
            <Dialog.Container visible={wrong}>
                    <Icon name="times-circle" size={80}  resizeMode="contain" color="red" style={{alignSelf:'center'}}/>
                    <Dialog.Description>
                             Veuiller entrer toutes vos informations 
                    </Dialog.Description>
                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
                          <Dialog.Button label="Ok"  onPress={() =>  setwrong(false)}/>
                     </View>

             </Dialog.Container>
             <Dialog.Container visible={success}>

                     <Dialog.Description>
                              un email vous a été envoyer, vous y trouverez votre nouveau mot de passe ,penser a le changer apres LOGIN.
                     </Dialog.Description>
                     <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
                          <Dialog.Button label="Ok" color='blue' size={50}  onPress={() =>  setsucess(false)}/>
                     </View>
                   
            </Dialog.Container>
        <StatusBar hidden />

          <Block  flex  middle >
            <Block style={styles.registerContainer}>
            <ImageBackground source = {images.login_background} resizeMode='cover'  style={styles.background_image}>
            <TouchableOpacity
                      style={{ margin: 10, marginBottom:-30}}
                      onPress={() => navigation.goBack()}
                  >
                      <Image
                          source={images.back_arrow}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              tintColor: COLORS.white
                          }}
                      />
                  </TouchableOpacity>
             
             </ImageBackground>
              <Block flex={0.35} middle style={styles.socialConnect}>
                    <Text bold color={COLORS.black} size={32}>
                   <Text color="#8898AA" size={18}> /  Reset Password</Text> 
                    </Text>
                    <Icon name="user" size={50}  style={{marginTop:25}} />
                   
              </Block>
              <Block flex>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    
                    <Block width={width * 0.8}>
                      <ArInput
                        placeholder="Entrez votre email"
                        onChangeText={(text) => setUsername(text)}
                       
                      />
                    </Block>
                
                    
                    <Block middle>
                      <ArButton  style={styles.createArButton}  onPress = {submit}>
                        <Text bold size={14} color={COLORS.WHITE}>
                          Réinitialiser
                        </Text>
                      </ArButton>
                    </Block>
                    <Block row style={styles.passwordCheck}>
                        
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
   
      </Block>
   
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({

    background_image:{
      flex:0.45,
      width:width,
    },
  
    
    title:{
      color:COLORS.primary,
      fontSize:30,
      letterSpacing:1,
      fontWeight:'bold',
      fontFamily:'Nunito',
      marginBottom:10,
    },
    
    registerContainer: {
      width: width ,
      height: height ,
      backgroundColor: COLORS.white,
      borderRadius: 4,
      shadowColor: COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: "hidden"
    },
    socialConnect: {
      backgroundColor: COLORS.WHITE,
    },
    socialArButtons: {
      width: 120,
      height: 40,
      backgroundColor: "#fff",
      shadowColor: COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1
    },
    socialTextArButtons: {
      color: COLORS.PRIMARY,
      fontWeight: "800",
      fontSize: 14
    },
    ArInputIcons: {
      marginRight: 12
    },
    passwordCheck: {
      paddingLeft: 15,
      paddingTop: 13,
      paddingBottom: 15
    },
    createArButton: {
      width: width * 0.5,
      marginTop: 25,
      backgroundColor:COLORS.primary,
    }
  });