import React,{useEffect,useState} from 'react'
import {   View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Animated} from 'react-native'
import Dialog from "react-native-dialog";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Caption } from 'react-native-paper'
import {useSelector,useDispatch} from 'react-redux'
  
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import {Fetch_User,Subscribe_To_Formation,Subscribe_Entreprise} from '../redux/actions'

const FormationDetailsScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const LoginInfo = useSelector(state => state.loginReducer);
    const user = useSelector(state => state.Fetch_User)
    const [formation, setformation] = React.useState(null);
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);
    const [visible, setVisible] = useState(false);
    const [individu, setindividu] = useState(false)
    const [entreprise, setentreprise] = useState(false)
    const [status, setstatus] = useState(true)
    const [date, setdate] = useState('')
    const [Nom, setNom] = useState('')
    const [Telephone, setTelephone] = useState('')

    useEffect(() => {
        if (LoginInfo.isLoggedIn){
            dispatch(Fetch_User(LoginInfo.userId))
            
        }
       
        }, [LoginInfo.userId])

    const getCurrentDate=()=>{

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        if( month<10 ){
           var month = "0"+month
        }
        if( date<10    ){
            var date = "0"+date
        }
        var current = year + '-' + month + '-' + date
        return  current.toString();
  }
 

    const individu_fct=()=>{
        setstatus(false)
        setentreprise(false)
        setindividu(true)
    }
    const entreprise_fct=()=>{
        setstatus(false)
        setindividu(false)
        setentreprise(true)
    }
    const status_fct=()=>{
        setstatus(!status)
    }
    const showdialog=()=>{
        setVisible(!visible)
        setstatus(true)
        setentreprise(false)
        setindividu(false)
    }

    const subscribe = () => {
        setVisible(!visible)
        var subscribeData = {
            "date_inscription" :date.dateString,
            "formation" : formation,
            "user" : user.user

        }
     dispatch(Subscribe_To_Formation(subscribeData))
   
    }

    const subscribeEntreprise = () => {
        setVisible(!visible)
        var subscribeData = {
            "nom" :Nom,
            "telephone" : Telephone,
        }
        dispatch(Subscribe_Entreprise(subscribeData))
    }
    const indicator = new Animated.Value(0);
    useEffect(() => {
      let { formation } = route.params;
      setformation(formation)
  
    }, [formation])
   
   
    function renderBookInfoSection() {
      return (
          <View style={{ flex: 1 }}>
              {/* Color Overlay */}
             

              {/* Navigation header */}
              <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 }}>
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
                              tintColor: COLORS.black
                          }}
                      />
                  </TouchableOpacity>

                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>Formation Detail</Text>
                  </View>

              </View>

              {/* Book Cover */}
              <ImageBackground source = {{uri:formation.image}} resizeMode='cover' imageStyle= {{opacity:0.1}} style={{ flex: 4, paddingTop: SIZES.padding, alignItems: 'center'}}>
              <View >
                  <Image
                      source={{uri:formation.image}}
                      resizeMode="contain"
                      style={{
                          flex: 2.5,
                          width: 320,
                          height: "auto"
                      }}
                  />
                   {/* Book Name and Author */}
              <View style={{ flex: 0.9, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{ ...FONTS.h3, color: COLORS.BLACK, textAlign:'center' }}>{formation.nom}</Text>
                  <Text style={{ ...FONTS.body3, color: COLORS.black }}>date de debut : {formation.date_debut}</Text>
              </View>
              </View>
              </ImageBackground>

             

              {/* Book Info */}
              {/* <View
                  style={{
                      flexDirection: 'row',
                      paddingVertical: 20,
                      margin: SIZES.padding,
                      borderRadius: SIZES.radius,
                      backgroundColor: "rgba(0,0,0,0.3)"
                  }}
              > */}
                  {/* Rating */}
                  {/* <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={{ ...FONTS.h3, color: COLORS.black }}>{formation.nom}</Text>
                      <Text style={{ ...FONTS.body4, color: COLORS.black }}>Rating</Text>
                  </View> */}

                  {/* <LineDivider /> */}

                  {/* Pages */}
                  {/* <View style={{ flex: 1, paddingHorizontal: SIZES.radius, alignItems: 'center' }}>
                      <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.pageNo}</Text>
                      <Text style={{ ...FONTS.body4, color: COLORS.white }}>Number of Page</Text>
                  </View> */}

                  {/* <LineDivider /> */}

                  {/* Language */}
                  {/* <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.language}</Text>
                      <Text style={{ ...FONTS.body4, color: COLORS.white }}>Language</Text>
                  </View> */}
              {/* </View> */}
          </View>
      )
  }

  function renderBookDescription() {

      const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight

      const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1

      return (
          <View style={{ flex: 1, flexDirection: 'row', padding: SIZES.padding }}>
              {/* Custom Scrollbar */}
              <View style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}>
                  <Animated.View
                      style={{
                          width: 4,
                          height: indicatorSize,
                          backgroundColor: COLORS.black,
                          transform: [{
                              translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                                  inputRange: [0, difference],
                                  outputRange: [0, difference],
                                  extrapolate: 'clamp'
                              })
                          }]
                      }}
                  />
              </View>

              {/* Description */}
              <ScrollView
                  contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                  onContentSizeChange={(width, height) => {
                      setScrollViewWholeHeight(height)
                  }}
                  onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                      setScrollViewVisibleHeight(height)
                  }}
                  onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: indicator } } }],
                      { useNativeDriver: false }
                  )}
              >
                  <Text style={{ ...FONTS.h3, color: COLORS.black, marginBottom: SIZES.padding }}>Description</Text>
                  <Caption style={{ ...FONTS.body4,marginBottom:2}}>{formation.desription}</Caption>
              </ScrollView>
          </View>
      )
  }

  function renderBottomButton() {
      return (
          <View style={{ flex: 1, flexDirection: 'row' ,backgroundColor:COLORS.grey1}}>
            
              {/* Start Reading */}
              <TouchableOpacity
                  style={{
                      flex: 1,
                      backgroundColor: COLORS.primary,
                      marginHorizontal: SIZES.base,
                      marginVertical: SIZES.base,
                      borderRadius: SIZES.radius,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  onPress={() => setVisible(!visible)}
              >
                  <Text style={{ ...FONTS.h3, color: COLORS.white }}>S'inscrire</Text>
              </TouchableOpacity>
            
              <View >
                    <Dialog.Container visible={visible} style={{borderRadius:300}}>
                    {   status && LoginInfo.isLoggedIn ? (
                        <View >
                                <View style={{padding:15,marginTop:-25}}>
                                    <Dialog.Title  Text style={{color : COLORS.black, fontSize:20}}>choisissez votre statut</Dialog.Title>
                                </View>
                                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                                    <View style={{padding:10, margin:10}}>
                                        <TouchableOpacity  onPress={()=>individu_fct()}>
                                            <Image
                                                source={images.individu_icon}
                                                resizeMode="contain"
                                                style={{
                                                    width: 150,
                                                    height: 100,
                                                }}
                                            />
                                            <Text style={{alignSelf:'center'}}>Individu</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{padding:10, margin:10}}>
                                        <TouchableOpacity  onPress={()=>entreprise_fct()}>
                                            <Image
                                                source={images.entreprise_icon}
                                                resizeMode="contain"
                                                style={{
                                                    width: 150,
                                                    height: 100,
                                                }}
                                            />
                                            <Text style={{alignSelf:'center'}}>Entreprise</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
                                    <Dialog.Button label="Annuler"  onPress={() => setVisible(!visible)}/>
                                </View>
                        </View>
                        ):individu?(
                        <View>
                                <View style={{padding:15,marginTop:-25}}>
                                    <Dialog.Title  Text style={{color : COLORS.black, fontSize:20}}>Prenez un rendez-vous</Dialog.Title>
                                </View>
                                <View>
                                    <Calendar
                                            current={getCurrentDate()}
                                            // Handler which gets executed on day press. Default = undefined
                                            onDayPress={(day) => {setdate(day)}}
                                            // Handler which gets executed on day long press. Default = undefined
                                            onDayLongPress={(day) => {console.log('selected day', day)}}
                                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                            monthFormat={'yyyy MM'}
                                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                                            onMonthChange={(month) => {console.log('month changed', month)}}
                                    />
                                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
                                        <Dialog.Button label="precedent"  onPress={() => status_fct()}/>
                                        <Dialog.Button label="Ok"  onPress={subscribe}/>
                                    </View>
                                    </View>
                        </View>
                        ):entreprise?(
                        <View>
                                <View style={{padding:15,marginTop:-25, marginBottom:15}}>
                                    <Dialog.Title  Text style={{color : COLORS.black, fontSize:20}}>Entrer vos informations</Dialog.Title>
                                </View>
                                <View>
                                    <Dialog.Input 
                                        label = "Nom"
                                        style={{borderBottomColor:COLORS.black, borderBottomWidth:1,}}
                                        placeholder = "nom de l'entreprise"
                                        mode = 'outlined'
                                        onChangeText={(modif) => setNom(modif)}
                                    />
                                    <Dialog.Input 
                                        label = "Telephone"
                                        style={{borderBottomColor:COLORS.black, borderBottomWidth:1,}}
                                        placeholder = "telephone de l'entreprise"
                                        mode = 'outlined'
                                        onChangeText={(modif) => setTelephone(modif)}
                                    />
                                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
                                        <Dialog.Button label="precedent"  onPress={() => status_fct()}/>
                                        <Dialog.Button label="Ok"  onPress={subscribeEntreprise}/>
                                    </View>
                                </View>
                        </View>
                        ):(    
                            <View style={{padding:15,marginTop:-25, marginBottom:15}}>
                                <Dialog.Title  Text style={{color : COLORS.black, fontSize:20}}>Veilliez vous connecter avant de s'inscrire</Dialog.Title>
                                <Dialog.Button label="Ok"  onPress={() => setVisible(!visible)}/>
                            </View>
                           )}  
                    </Dialog.Container>
              </View>
              


          </View>
      )
  }

  if (formation) {
      return (
          <View style={{ flex: 1, backgroundColor: COLORS.white }}>
              {/* Book Cover Section */}
              <View style={{ flex: 3.2 }}>
                  {renderBookInfoSection()}
              </View>

              {/* Description */}
              <View style={{ flex: 2 }}>
                  {renderBookDescription()}
              </View>

              {/* Buttons */}
              <View style={{ height: 60, marginBottom: 10 }}>
                  {renderBottomButton()}
                 
              </View>
          </View>
      )
  } else {
      return (<></>)
  }

}

export default React.memo(FormationDetailsScreen)