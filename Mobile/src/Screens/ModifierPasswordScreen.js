import React,{useEffect,useState} from 'react'
import {   View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,StyleSheet,StatusBar, KeyboardAvoidingView,
  Animated} from 'react-native'
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { Block, Text } from "galio-framework";
  import Dialog from "react-native-dialog";
  import ArInput from '../components/GalioInput/Input'
import ArButton  from '../components/Button/Button'

import {FONTS, COLORS, SIZES, images} from '../Constantes'
import {modifier_Password} from '../redux/actions'
import {windowWidth as width ,windowHeight as height} from '../utils/Dimentions'
import { useDispatch,useSelector } from 'react-redux';


const ModifierPasswordScreen = ({navigation}) => {
    const [ancpassword, setancpassword] = useState('');
    const [nouvpassword, setnouvpassword] = useState('');
    const [success, setsucess] = useState(false) 
    const userEmail = useSelector(state => state.Fetch_User.user.email);
    const dispatch = useDispatch()

    const submit = () => {
      
            dispatch(modifier_Password(nouvpassword,ancpassword,userEmail,navigation))
        
      }
    return (
        <SafeAreaView style = {{flex:5}}>
             {/* Navigation header */}
             <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3,backgroundColor:COLORS.primary, marginBottom:20 }}>
                  <TouchableOpacity
                      style={{ marginLeft: -8 }}
                      onPress={() => navigation.goBack()}
                  >
                      <Image
                          source={images.back_arrow}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              tintColor: COLORS.WHITE
                          }}
                      />
                  </TouchableOpacity>

                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ ...FONTS.h2, color: COLORS.WHITE }}>Modifier Mot de Passe</Text>
                  </View>

              </View>

          
              <Block flex middle  style = {{backgroundColor:COLORS.white}}>
            <Dialog.Container visible={success}>
                    <Icon name="times-circle" size={80}  resizeMode="contain" color="red" style={{alignSelf:'center'}}/>
                    <Dialog.Description>
                             Veuiller entrer toutes vos informations 
                    </Dialog.Description>
                   
            </Dialog.Container>
  

          <Block safe flex middle >
            <Block style={styles.registerContainer}>
              <Block flex={0.6} middle style={styles.socialConnect}>
                    <Text bold color={COLORS.black} size={32}>
                   <Text color="#8898AA" size={18}> /  Reset Password</Text> 
                    </Text>
                    <Icon name="unlock-alt" size={80}  resizeMode="contain" color={COLORS.darkgray} style={{alignSelf:'center', marginTop:30}}/>
                   
              </Block>
              <Block flex>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 0.8 }}
                    behavior="padding"
                    enabled
                  >
                    
                    <Block width={width * 0.8}>
                      <ArInput
                       password
                        placeholder="Entrez votre mot de passe"
                        onChangeText={(text) => setancpassword(text)}
                       
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <ArInput
                       password
                        placeholder="Entrez votre nouveau mot de passe"
                        onChangeText={(text) => setnouvpassword(text)}
                       
                      />
                    </Block>
                    <Block row style={styles.passwordCheck}>
                        <Text size={12} color={COLORS.MUTED}>
                          le mot de passe doit etre composer 
                        </Text>
                        <Text bold size={12} color={COLORS.red}>
                          {" "}
                          de 8 caractere
                        </Text>
                      </Block>
                    
                    <Block middle>
                      <ArButton  style={styles.createArButton}  onPress = {submit} >
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
        </SafeAreaView>
    )
}

export default ModifierPasswordScreen

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