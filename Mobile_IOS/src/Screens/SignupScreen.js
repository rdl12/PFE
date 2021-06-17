import React ,{useState}  from 'react'
import { View,Image,StyleSheet ,StatusBar,ImageBackground, KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native'
import { useDispatch } from 'react-redux'
import { Singup } from '../redux/actions';
import { Block, Checkbox, Text, theme } from "galio-framework";
import ArInput from '../components/GalioInput/Input'
import ArButton  from '../components/Button/Button'
import Dialog from "react-native-dialog";
import {  images,COLORS  } from "../Constantes";
import {windowWidth as width ,windowHeight as height} from '../utils/Dimentions'
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupScreen = ({navigation}) => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('')
    const [lasttName, setlastName] = useState('')
    const [Telephone, setTelephone] = useState('')
    const [success, setsucess] = useState(false)
    const [success_sign, setsucess_sign] = useState(false)  

    const dispatch = useDispatch()
    const submit = () => {
      const object = {
          "firstName":firstName,
          "lastName":lasttName,
          "email" : email,
          "telephone": Telephone,
          "password": password
      }
      if(email== '' || password == '' || firstName == '' || Telephone == ''  ){
        setsucess(!success)
        setTimeout(() => {
          setsucess(false)
        }, 3000);
      }
      else{
        dispatch(Singup(object))
        setsucess_sign(!success_sign)
       
      }
    }
    const ok = () =>{
      setsucess_sign(false)
      navigation.navigate('Login')
    }
     
    
    return (
      <Block flex middle style = {{backgroundColor:COLORS.white}}>
            <Dialog.Container visible={success}>
                    <Icon name="times-circle" size={80}  resizeMode="contain" color="red" style={{alignSelf:'center'}}/>
                    <Dialog.Description>
                             Veuiller entrer toutes vos informations 
                    </Dialog.Description>
                   
            </Dialog.Container>
            <Dialog.Container visible={success_sign}>
                    <Icon name="check-circle" size={80}  resizeMode="contain" color="green" style={{alignSelf:'center'}}/>
                    <Dialog.Description>
                             un email de verification vous a été envoyer
                    </Dialog.Description>
                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
                                        <Dialog.Button label="Ok"  onPress={ok}/>
                    </View>
                   
            </Dialog.Container>
        <StatusBar hidden />

          <Block  flex middle>
            <Block style={styles.registerContainer}>
            
              
              <Block flex>
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
                <Block flex={0.25} center row>
                  
                    <Text bold color={COLORS.white} size={32}>
                      Sign Up <Text color="#8898AA" size={18}> /   Login </Text> 
                    </Text>
                </Block>
                
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor:COLORS.white, width:width, alignItems:'center' , borderTopLeftRadius : 50, borderTopRightRadius : 50, paddingTop:20 }}
                    behavior="padding"
                    enabled
                  >
                    
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <ArInput
                        borderless
                        placeholder="Email"
                        onChangeText={(text) => setemail(text)}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <ArInput
                        borderless
                        placeholder="FirstName"
                        onChangeText={(text) => setfirstName(text)}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <ArInput
                        borderless
                        placeholder="LastName"
                        onChangeText={(text) => setlastName(text)}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <ArInput
                        borderless
                        placeholder="Telephone"
                        onChangeText={(text) => setTelephone(text)}
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <ArInput
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                       
                      />
                      {/* <Block row style={styles.passwordCheck}>
                        <Text size={12} color={COLORS.MUTED}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text>
                      </Block> */}
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={COLORS.PRIMARY}
                        label="J'accepte les termes"
                      />
                      <ArButton
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </ArButton>
                    </Block>
                    <Block middle>
                      <ArButton  style={styles.createArButton} onPress = {submit}>
                        <Text bold size={14} color={COLORS.WHITE}>
                          CREER
                        </Text>
                      </ArButton>
                    </Block>
                  </KeyboardAvoidingView>
                  <Block middle row style={{marginBottom:70, marginTop:-50}}>
                      <Text size={14} color={COLORS.black} >
                         Vous avez déjà un compte?
                      </Text>
                      <TouchableOpacity  onPress = {() => {navigation.navigate('Login')}} ><Text color={COLORS.PRIMARY}>  Connectez-vous ici</Text></TouchableOpacity>
                  </Block>
                      
                </Block>
                </ImageBackground>
              </Block>
             
            </Block>
          </Block>
   
      </Block>
    )
}

const styles = StyleSheet.create({
  background_image:{
    flex:1,
    width:width,
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
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
    paddingBottom: 30
  },
  createArButton: {
    width: width * 0.5,
    marginTop: 25,
    backgroundColor:COLORS.primary,
  }
});
export default SignupScreen