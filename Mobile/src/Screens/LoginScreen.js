import {StyleSheet ,StatusBar, KeyboardAvoidingView,TouchableOpacity,Image,ImageBackground} from 'react-native'
import React ,{useState}  from 'react'
import { login } from '../redux/actions';
import { useDispatch } from 'react-redux';
import {SignupScreen} from './SignupScreen'
import { Block, Checkbox, Text, theme } from "galio-framework";
import {Avatar} from 'react-native-paper';
import { COLORS,images } from "../Constantes";
import ArInput from '../components/GalioInput/Input'
import ArButton  from '../components/Button/Button'
import {windowWidth as width ,windowHeight as height} from '../utils/Dimentions'




const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    return (
    
      <Block flex middle  style = {{backgroundColor:COLORS.white}}>
        <StatusBar hidden />

          <Block safe flex middle >
            <Block style={styles.registerContainer}>
            <ImageBackground source = {images.login_background} resizeMode='cover'  style={styles.background_image}>
             
             </ImageBackground>
              <Block flex={0.35} middle style={styles.socialConnect}>
                    <Text bold color={COLORS.black} size={32}>
                      Login <Text color="#8898AA" size={18}> /  Sign Up</Text> 
                    </Text>
                    <Image 
                      source={images.login_avatar}
                      style={{marginTop:25}}
                    />
              </Block>
              <Block flex>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <ArInput
                        borderless
                        placeholder="Email"
                        onChangeText={(text) => setUsername(text)}
                       
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <ArInput
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                       
                      />
                      <Block right width={width * 0.75}>
                       <TouchableOpacity onPress = {() => {navigation.navigate('Sign up')}} >
                          <Text style = {styles.RegisterText}>mot de passe oublié?</Text>
                       </TouchableOpacity> 
                    </Block>
                      <Block row style={styles.passwordCheck}>
                        
                      </Block>
                    </Block>
                    
                    <Block middle>
                      <ArButton  style={styles.createArButton}  onPress={() => dispatch(login({'username': username, 'password': password },navigation))}>
                        <Text bold size={14} color={COLORS.WHITE}>
                          login
                        </Text>
                      </ArButton>
                    </Block>
                    <Block row style={styles.passwordCheck}>
                        
                    </Block>
                    

                    

                    
                    
                   
                  </KeyboardAvoidingView>
                  <Block middle row style={{marginBottom:30}}>
                      <Text size={14} color={COLORS.black} >
                         Vous n'avez pas un compte?
                      </Text>
                      <TouchableOpacity  onPress = {() => {navigation.navigate('Sign up')}} ><Text color={COLORS.PRIMARY}>  Inscrivez-vous ici</Text></TouchableOpacity>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
   
      </Block>


     )
}

export default LoginScreen

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