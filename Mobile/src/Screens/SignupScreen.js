import React ,{useState}  from 'react'
import { View,Image,StyleSheet ,StatusBar,ImageBackground, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux'

import { Singup } from '../redux/actions';
import { Block, Checkbox, Text, theme } from "galio-framework";
import ArInput from '../components/GalioInput/Input'
import ArButton  from '../components/Button/Button'
import {  images,COLORS  } from "../Constantes";
import {windowWidth as width ,windowHeight as height} from '../utils/Dimentions'
import { Colors } from 'react-native-paper';
import { LinearGradient } from 'react-native-svg';

const SignupScreen = ({navigation}) => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')

    const dispatch = useDispatch()
    return (
      <Block flex middle style = {{backgroundColor:COLORS.white}}>
        <StatusBar hidden />

          <Block safe flex middle>
            <Block style={styles.registerContainer}>
            <ImageBackground source = {images.login_background} resizeMode='cover'  style={styles.background_image}>
             
              </ImageBackground>
              <Block flex>
                <Block flex={0.06} center row>
                    <Text bold color={COLORS.black} size={32}>
                      Sign Up <Text color="#8898AA" size={18}> /   Login </Text> 
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
                        placeholder="Name"
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <ArInput
                        borderless
                        placeholder="Email"
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <ArInput
                        borderless
                        placeholder="Telephone"
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <ArInput
                        password
                        borderless
                        placeholder="Password"
                       
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
                      <ArButton  style={styles.createArButton}>
                        <Text bold size={14} color={COLORS.WHITE}>
                          CREER
                        </Text>
                      </ArButton>
                    </Block>
                  </KeyboardAvoidingView>
                  <Block middle row style={{marginBottom:30}}>
                      <Text size={14} color={COLORS.black} >
                         Vous avez déjà un compte?
                      </Text>
                      <TouchableOpacity  onPress = {() => {navigation.navigate('Login')}} ><Text color={COLORS.PRIMARY}>  Connectez-vous ici</Text></TouchableOpacity>
                  </Block>
                      
                </Block>
              </Block>
            </Block>
          </Block>
   
      </Block>
    )
}

const styles = StyleSheet.create({
  background_image:{
    flex:0.45,
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


