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
    
      <Block flex middle  style = {{backgroundColor:COLORS.white,elevation:2}}>
        <StatusBar hidden />

          <Block safe flex middle style = {{elevation:2}}>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                  <Image 
                            source={images.login_avatar}
                            style={{marginTop : 25}}
                            tintcolor = {COLORS.primary}
                        />
                  <Text style = {styles.title}> Login</Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                </Block>
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
                      <Block row style={styles.passwordCheck}>
                        
                      </Block>
                    </Block>
                    
                    <Block middle>
                      <ArButton color="primary" style={styles.createArButton}  onPress={() => dispatch(login({'username': username, 'password': password },navigation))}>
                        <Text bold size={14} color={COLORS.WHITE}>
                          login
                        </Text>
                      </ArButton>
                    </Block>
                    <Block row style={styles.passwordCheck}>
                        
                    </Block>
                    
                 
                 <Block row width={width * 0.75}>
                       <TouchableOpacity onPress = {() => {navigation.navigate('Sign up')}} >
                          <Text style = {styles.RegisterText}>S'inscrire ?</Text>
                       </TouchableOpacity> 
                    </Block>

                    <Block right width={width * 0.75}>
                       <TouchableOpacity onPress = {() => {navigation.navigate('Sign up')}} >
                          <Text style = {styles.RegisterText}>mot de passe oublié?</Text>
                       </TouchableOpacity> 
                    </Block>

                    
                    
                   
                  </KeyboardAvoidingView>
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
    flex:1,
    width:width,
    height:height/2,
    
    
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
    width: width * 0.9,
    height: height * 0.60,
    backgroundColor: "#F4F5F7",
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
    paddingBottom: 15
  },
  createArButton: {
    width: width * 0.5,
    marginTop: 25
  }
});