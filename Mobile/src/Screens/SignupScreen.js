import React ,{useState}  from 'react'
import { View,TouchableOpacity,StyleSheet ,StatusBar,ImageBackground, KeyboardAvoidingView} from 'react-native'
import { useDispatch } from 'react-redux'

import { Singup } from '../redux/actions';
import { Block, Checkbox, Text, theme } from "galio-framework";
import ArInput from '../components/GalioInput/Input'
import ArButton  from '../components/Button/Button'
import {  images,COLORS  } from "../Constantes";
import {windowWidth as width ,windowHeight as height} from '../utils/Dimentions'

const SignupScreen = ({navigation}) => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')

    const dispatch = useDispatch()
    return (
      <Block flex middle>
        <StatusBar hidden />

          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <ArButton style={{ ...styles.socialArButtons, marginRight: 30 }}>
                    <Block row>
                    
                      <Text style={styles.socialTextArButtons}>GITHUB</Text>
                    </Block>
                  </ArButton>
                  <ArButton style={styles.socialArButtons}>
                    <Block row>
                     
                      <Text style={styles.socialTextArButtons}>GOOGLE</Text>
                    </Block>
                  </ArButton>
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
                        placeholder="Name"
                      
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <ArInput
                        borderless
                        placeholder="Email"
                       
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <ArInput
                        password
                        borderless
                        placeholder="Password"
                       
                      />
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={COLORS.MUTED}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text>
                      </Block>
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={COLORS.PRIMARY}
                        label="I agree with the"
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
                      <ArButton color="primary" style={styles.createArButton}>
                        <Text bold size={14} color={COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </ArButton>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
   
      </Block>
    )
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
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
    paddingBottom: 30
  },
  createArButton: {
    width: width * 0.5,
    marginTop: 25
  }
});
export default SignupScreen


