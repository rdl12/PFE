import React, { useEffect,useState } from 'react'
import { View,Text,StyleSheet,Image,ScrollView,SafeAreaView} from 'react-native'
import {Avatar,Title,Caption,List,Switch } from 'react-native-paper';
import { COLORS, Colors, icons,images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import useBackgroundGeolocationTracker from '../components/BgTracking';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundJob from 'react-native-background-job';
import {useSelector,useDispatch} from 'react-redux'
import {setLoginState} from '../redux/actions'

const parametre = () => {

    const isSwitchOn = useSelector(state => state.loginReducer.isSecouriste);
    const IsEnabeld = useSelector(state => state.loginReducer.TrackEnabled);
    const location = useBackgroundGeolocationTracker(IsEnabeld); 
    const dispatch = useDispatch()
  
    const onToggleSwitch = () => {
        dispatch(setLoginState({ isSecouriste:!isSwitchOn,TrackEnabled:!IsEnabeld}))
        
    };

    useEffect(() => {
    }, [isSwitchOn])

    return (
        <SafeAreaView style={styles.screen}>
              <List.Item
                title="Devenir secouriste"
                left={props => <List.Icon {...props} icon={images.location_icon} color={COLORS.black}/>}
                right={props => <Switch value={isSwitchOn} onValueChange={onToggleSwitch}  /> }
                style={{ padding:10, borderBottomWidth:0.5}}
                titleStyle={{fontSize:17, letterSpacing:1.5}}
            />
            <View style={styles.box}>
          
            <ScrollView>
                    <Text style={{ fontWeight:'600',fontSize:14,color: COLORS.BLACK,margin:20,marginLeft:30 }}>Notre application sauve des vies et vous permet de sauver des vies a l'aide de sa fonction :  </Text>
                    <Text style={{ fontWeight:'bold',fontSize:19,color: COLORS.red,alignSelf:'center' }}>"Devenir secouriste"  </Text>
                    <Text style={{ fontWeight:'600',fontSize:14,color: COLORS.BLACK,margin:20,marginLeft:30 }}>"Devenir secouriste" est une option qui vous permet de recevoir des notification des gens au tour de vous et qui ont besoin de vous lors d'une crise cardiaque, avec securité totale votre position ne sera en aucun cas stocké  sur nos serveurs ni accessible par notre equipe. (seule la localisation de la victime qui sera stocké pendant une duré de 5 min puis totalement supprimé)  </Text>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                        <Icon name="heartbeat" size={50}  color={COLORS.red} style={{margin:5}} /> 
                        <Icon name="heart" size={50} color={COLORS.BLACK} style={{margin:5}}  /> 
                        <Icon name="heartbeat" size={50} color={COLORS.red} style={{margin:5}} /> 
                    </View>
                    
                    <Text style={{ fontWeight:'600',fontSize:14,color: COLORS.BLACK,margin:20,marginLeft:30 }}>Pour devenir secouriste vous pouvez simplement activer la fonction ci dessus pour pouvoir recevoir des notification de demande d'aide, vous pouvez desactiver la fonction "Devenir secouriste" quand vous voulez </Text> 
                    <Text style={{fontWeight:'600',fontSize:14,color: COLORS.BLACK,margin:20,marginLeft:30 }}>Ps : N'hesiter pas de visiter notre onglet formation, nous offrons des formation de secourisme pour vous, votre familles et vos employées.</Text> 
           
             </ScrollView>             
      </View>
           
        </SafeAreaView>
    )
}

export default parametre

const styles = StyleSheet.create({
    box:{
        height:windowHeight/1.3,
        backgroundColor:COLORS.lightGray4,
        elevation:2,
        borderBottomRightRadius:100
        
      
      },
    screen: {
        flex: 1,
       backgroundColor:COLORS.white
      },
})
