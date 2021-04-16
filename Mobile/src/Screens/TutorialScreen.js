import React,{useState,useEffect,} from 'react'
import { View, Text, StyleSheet, SafeAreaView,Image, TouchableOpacity, Linking, ScrollView } from 'react-native'
import { Avatar, Caption, Card, Title, Paragraph,IconButton} from 'react-native-paper';
import {images,COLORS} from '../Constantes'
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'
import {windowWidth, windowHeight} from '../utils/Dimentions'


const TutorialScreen = ({navigation}) => {
    const [next, setNext] = useState(1); 
    const numStyle = {fontSize:30,color:'red'}
    const minititleStyle ={color:COLORS.primary}
    const selectedStyle = {
        borderColor : COLORS.primary ,
        borderWidth:2,
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 12,
         },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,}
  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,  
      tabBarButton: (props) => (
        <TabBarCustomButton visible
            {...props}
        />
    ),
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
        tabBarButton: (props) => (
            <TabBarCustomButton 
                {...props}
            />
        ),
      });
  }, [navigation])
    return (
        <SafeAreaView style = {{backgroundColor:COLORS.white,flex:1}}>
     {next===1 ? (
         <View>

             <View style={{flexDirection:'row',margin:10}}>
                <Card style={[styles.minicard,{...selectedStyle}]}><TouchableOpacity onPress={()=>{setNext(1)}}><Title style={[styles.minititle,{...minititleStyle}]}>Reconnaitre</Title><Caption style={[styles.minicaption,{...minititleStyle}]}>1</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(2)}}><Title style={styles.minititle}>Appeler</Title><Caption style={styles.minicaption}>2</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(3)}}><Title style={styles.minititle}>Masser</Title><Caption style={styles.minicaption}>3</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(4)}}><Title style={styles.minititle}>Defibriller</Title><Caption style={styles.minicaption}>4</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(5)}}><Title style={styles.minititle}>Attendre</Title><Caption style={styles.minicaption}>5</Caption></TouchableOpacity></Card>
            </View>

             <Card style={styles.card}>
                <Card.Title title="Reconnaitre l'arret cardiaque" titleStyle={{color:COLORS.primary,fontFamily: "Cochin",fontWeight: 'bold',fontSize:20}} style={styles.cardTitle}
                            right={(props) => <IconButton {...props} icon={images.next_icon} size={25}  onPress={() => {setNext(2)}} />}/>
                <Card.Content>
                <View>
                    <View style={{flexDirection:"row"}}>
                        <Image 
                           style={{width:75,height:85,alignSelf:'flex-start',marginTop:10}}
                            source= {{uri : "https://img.icons8.com/carbon-copy/2x/1.png"}}
                            tintColor={COLORS.red}
                        />
                        <Image 
                           style={{width:305,height:155,alignSelf:'center'}}
                            source= {{uri : "https://img.flaticon.com/icons/png/512/2855/2855011.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"}}
                        />
                        
                    </View>
                    <Caption style={styles.titleDrawer}> On reconnaît un arrêt cardiaque quand la victime ne répond pas, ne réagit pas et ne respire pas ou présente une respiration anormale.</Caption>
                    <View style={styles.video}>

                    </View>
                </View>
               </Card.Content>
             </Card>

         </View>
            
         ) : next === 2?
             (
             <View>
            <View style={{flexDirection:'row',margin:10}}>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(1)}}><Title style={styles.minititle}>Reconnaitre</Title><Caption style={styles.minicaption}>1</Caption></TouchableOpacity></Card>
                <Card style={[styles.minicard,{...selectedStyle}]}><TouchableOpacity onPress={()=>{setNext(2)}}><Title style={[styles.minititle,{...minititleStyle}]}>Appeler</Title><Caption style={[styles.minicaption,{...minititleStyle}]}>2</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(3)}}><Title style={styles.minititle}>Masser</Title><Caption style={styles.minicaption}>3</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(4)}}><Title style={styles.minititle}>Defibriller</Title><Caption style={styles.minicaption}>4</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(5)}}><Title style={styles.minititle}>Attendre</Title><Caption style={styles.minicaption}>5</Caption></TouchableOpacity></Card>
            </View>
           <Card style={styles.card}>
             <Card.Title title="Appeler secours" titleStyle={{color:COLORS.primary,fontFamily: "Cochin",fontWeight: 'bold',fontSize:20,alignSelf:'center'}} style={styles.cardTitle}
                         left={(props) => <IconButton {...props} icon={images.next_icon} size={25} style={{transform: [{rotateY: '180deg'}]}}  onPress={() => {setNext(1)}} />}
                         right={(props) => <IconButton {...props} icon={images.next_icon} size={25} style={{marginRight:20}} onPress={() => setNext(3)} />}/>
             <Card.Content>
             <View style={{flexDirection:"row"}}>
                 <Image 
                        style={{width:75,height:85,alignSelf:'flex-start',marginTop:10}}
                         source= {{uri : "https://img.icons8.com/carbon-copy/2x/2.png"}}
                         tintColor={COLORS.primary}
                     />
                 <View style={{ alignSelf:'center'}}>
                     <Title style={styles.titleDrawer}>Applez les service d'urgence au :</Title>
                     <Title style={[styles.titleDrawer,{...numStyle}]}>15</Title>
                 </View>
             </View>

             <Image 
                   style={{width:150,height:150,alignSelf:'center',marginTop:10,borderWidth:2}}
                    source={images.urgence}
                         />

             <TouchableOpacity onPress={()=>{Linking.openURL('tel:15');} }>
               <View style = {styles.button}>
                     <Image 
                         style={{width:55,height:55,marginLeft:15}}
                         source={images.phone_icon}
                         tintColor={COLORS.red}/>
                     <Text style={styles.textButton}>Appelez...</Text>
                 </View>
             </TouchableOpacity>
             
            </Card.Content>
          </Card>
          </View> 
             ) : 
                 next===3 ? ( 
                
                    <View>

                        <View style={{flexDirection:'row',margin:10}}>
                              <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(1)}}><Title style={styles.minititle}>Reconnaitre</Title><Caption style={styles.minicaption} >1</Caption></TouchableOpacity></Card>
                             <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(2)}}><Title style={styles.minititle}>Appeler</Title><Caption style={styles.minicaption}>2</Caption></TouchableOpacity></Card>
                              <Card style={[styles.minicard,{...selectedStyle}]}><TouchableOpacity onPress={()=>{setNext(3)}}><Title style={[styles.minititle,{...minititleStyle}]}>Masser</Title><Caption style={[styles.minicaption,{...minititleStyle}]}>3</Caption></TouchableOpacity></Card>
                                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(4)}}><Title style={styles.minititle}>Defibriller</Title><Caption style={styles.minicaption}>4</Caption></TouchableOpacity></Card>
                                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(5)}}><Title style={styles.minititle}>Attendre</Title><Caption style={styles.minicaption}>5</Caption></TouchableOpacity></Card>
                           </View>

             <Card style={styles.card}>
                     <Card.Title title="Masser la victime" titleStyle={{color:COLORS.primary,fontFamily: "Cochin",fontWeight: 'bold',fontSize:20,alignSelf:'center'}} style={styles.cardTitle}
                            left={(props) => <IconButton {...props} icon={images.next_icon} size={25} style={{transform: [{rotateY: '180deg'}]}}  onPress={() => {setNext(2)}} />}
                            right={(props) => <IconButton {...props} icon={images.next_icon} size={25} style={{marginRight:20}} onPress={() => setNext(4)} />}/>
                <Card.Content>
                    <View>
                        <View style={{flexDirection:"row"}}>
                            <Image 
                               style={{width:75,height:85,alignSelf:'flex-start',marginTop:10}}
                                source= {{uri : "https://img.icons8.com/carbon-copy/2x/3.png"}}
                                tintColor={COLORS.red}
                            />
                            <Image 
                               style={{width:210,height:140,alignSelf:'center'}}
                                source= {{uri : "https://image.flaticon.com/icons/png/512/90/90594.png"}}
                            />
                            
                        </View>
                        <Caption style={styles.titleDrawer}> Maintenez vos mains en position sur le sternum. La durée de la compression
                                                             doit être égale à celle du relâchement de la pression de la poitrine.
                                                             Effectuez 30 compressions thoraciques à une fréquence de 100 par minute,
                                                              soit environ 2 compressions par seconde..</Caption>
                        <View style={styles.video}>
    
                        </View>
                    </View>
                   </Card.Content>
                 </Card>
                    </View>
                
             ): 
             next===4 ? (  

            <View>

            <View style={{flexDirection:'row',margin:10}}>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(1)}}><Title style={styles.minititle}>Reconnaitre</Title><Caption style={styles.minicaption}>1</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(2)}}><Title style={styles.minititle}>Appeler</Title><Caption style={styles.minicaption}>2</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(3)}}><Title style={styles.minititle}>Masser</Title><Caption style={styles.minicaption}>3</Caption></TouchableOpacity></Card>
                <Card style={[styles.minicard,{...selectedStyle}]}><TouchableOpacity onPress={()=>{setNext(4)}}><Title style={[styles.minititle,{...minititleStyle}]}>Defibriller</Title><Caption style={[styles.minicaption,{...minititleStyle}]}>4</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(5)}}><Title style={styles.minititle}>Attendre</Title><Caption style={styles.minicaption}>5</Caption></TouchableOpacity></Card>
            </View>


                <Card  style={styles.card}>
                 <Card.Title title="Defibriler la victime" titleStyle={{color:COLORS.primary,fontFamily: "Cochin",fontWeight: 'bold',fontSize:20,alignSelf:'center'}} style={styles.cardTitle}
                        left={(props) => <IconButton {...props} icon={images.next_icon} size={25} style={{transform: [{rotateY: '180deg'}]}}  onPress={() => {setNext(3)}} />}
                        right={(props) => <IconButton {...props} icon={images.next_icon} size={25} style={{marginRight:20}} onPress={() => setNext(5)} />}/>
            <ScrollView >
            <Card.Content >
                
                <View>
                    <View style={{flexDirection:"row"}}>
                        <Image 
                           style={{width:75,height:85,alignSelf:'flex-start',marginTop:10}}
                            source= {{uri : "https://img.icons8.com/carbon-copy/2x/4.png"}}
                            tintColor={COLORS.red}
                        />
                        <Image 
                           style={{width:210,height:140,alignSelf:'center'}}
                            source= {{uri : "https://www.swissheart.ch/fileadmin/_processed_/5/c/csm_Externer_Defibrillator_web_f7ea020627.png"}}
                        />
                        
                    </View>
                    <Caption style={styles.titleDrawer}> Le défibrillateur cardiaque est un appareil capable de délivrer une 
                                          quantité d’énergie d’origine électrique de façon à resynchroniser l’activité cardiaque.
                                           S’il est semi-automatique, il est capable d’analyser l’activité électrique du cœur de 
                                           la victime, de reconnaître un trouble cardiaque grave, de se charger automatiquement 
                                           puis d’indiquer la délivrance du choc à son utilisateur. C’est un outil très fiable 
                                           doté d’une voix synthétique qui guide, pas à pas, le sauveteur dans les différentes 
                                           étapes de son utilisation.</Caption>
                    <View style={styles.video}>

                    </View>
                </View>
                
               </Card.Content>
               </ScrollView>
             </Card>
            </View>
            
         ):
         next===5 ? (  

            <View>
            <View style={{flexDirection:'row',margin:10}}>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(1)}}><Title style={styles.minititle}>Reconnaitre</Title><Caption style={styles.minicaption}>1</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(2)}}><Title style={styles.minititle}>Appeler</Title><Caption style={styles.minicaption}>2</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(3)}}><Title style={styles.minititle}>Masser</Title><Caption style={styles.minicaption}>3</Caption></TouchableOpacity></Card>
                <Card style={styles.minicard}><TouchableOpacity onPress={()=>{setNext(4)}}><Title style={styles.minititle}>Defibriller</Title><Caption style={styles.minicaption}>4</Caption></TouchableOpacity></Card>
                <Card style={[styles.minicard,{...selectedStyle}]}><TouchableOpacity onPress={()=>{setNext(5)}}><Title style={[styles.minititle,{...minititleStyle}]}>Attendre</Title><Caption style={[styles.minicaption,{...minititleStyle}]}>5</Caption></TouchableOpacity></Card>
            </View>
                <Card style={styles.card}>
                 <Card.Title title="Attendre les secours" titleStyle={{color:COLORS.primary,fontFamily: "Cochin",fontWeight: 'bold',fontSize:20,}} style={styles.cardTitle}
                        left={(props) => <IconButton {...props} icon={images.next_icon} size={25} style={{transform: [{rotateY: '180deg'}]}}  onPress={() => {setNext(4)}} />}/>
            <Card.Content>
                <View>
                    <View style={{flexDirection:"row"}}>
                        <Image 
                           style={{width:75,height:85,alignSelf:'flex-start',marginTop:10}}
                            source= {{uri : "https://img.icons8.com/carbon-copy/2x/5.png"}}
                            tintColor={COLORS.red}
                        />
                        <Image 
                           style={{width:210,height:140,alignSelf:'center'}}
                            source= {{uri : "https://media.istockphoto.com/vectors/medics-carry-a-stretcher-with-the-patient-with-infusion-eps-vector-id1299216646?k=6&m=1299216646&s=612x612&w=0&h=qsN5wJXBJmJBO-hiSuemVKJTCeRZDDVNU33a9021C-A="}}
                        />
                        
                    </View>
                    <Title style={{alignSelf:'center'}}>En attendant veuiller :</Title>
                    <Caption style={styles.titleDrawer}> - laisser le defibrillateur en place</Caption>
                    <Caption style={styles.titleDrawer}> - Continuer le massage cardiaque</Caption>
                    <View style={styles.video}>

                    </View>
                </View>
               </Card.Content>
             </Card>
            </View>
            
         ): null
        }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card :{

         maxHeight:windowHeight/1.35,
         shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 7,
         },
         shadowOpacity: 0.43,
         shadowRadius: 9.51,
         
         elevation: 15,
        margin:15,
        
        marginTop:10},

    video : {alignSelf:'center', borderWidth:2,height:200,width:300,margin:10},
    
    cardTitle : {borderBottomWidth:0.45},
    
    Title :{color:COLORS.primary, fontSize:15, fontFamily: "Cochin",},
    
    para : {marginTop:10},
    
    button : {borderWidth:2,
        margin:10,
        borderColor:'red',
        padding:15,
        paddingLeft:3,
        paddingRight:3,
        borderRadius:10,
        flexDirection:'row'
    
    },
    
    textButton:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:20,
        color:'red',
        fontSize:25,
        fontFamily:'cochin',
        letterSpacing : 5,
        top:7
    },
    
    title: {
        
        fontSize: 13,
        marginTop: 3,
        fontWeight: 'bold',
        letterSpacing:1,
        color: COLORS.darkgray
      },
    
    caption: {
        fontSize: 14,
        lineHeight: 14,
      },

    icon:{width: 20,  height: 10, padding:0},

    titleDrawer:{
        textAlign: 'center',
        fontSize: 15,
        marginTop : 20,
        letterSpacing:1,
        color: COLORS.black
      
      },

    minicard:{
        width:73,height:50,borderWidth:1,margin:5,opacity:15
    },

    minititle:{alignSelf:'center',fontSize:12,opacity:15 },
    minicaption:{marginTop:-10,alignSelf:'center',opacity:15}
    
    })
export default TutorialScreen