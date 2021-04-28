import React, { useEffect,useState } from 'react'
import { View,Text} from 'react-native'
import {Avatar,Title,Caption,List,Switch } from 'react-native-paper';
import { COLORS, Colors, icons,images} from '../Constantes'
import useBackgroundGeolocationTracker from '../components/BgTracking';

const parametre = () => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [IsEnabeld, setIsEnabeld] = useState(false)
    const location = useBackgroundGeolocationTracker(IsEnabeld); 
  
  
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
        setIsEnabeld(!IsEnabeld)
        
    };

    return (
        <View>
            <List.Item
                title="Background tracking"
                left={props => <List.Icon {...props} icon={images.location_icon} color={COLORS.black}/>}
                right={props => <Switch value={isSwitchOn} onValueChange={onToggleSwitch}  /> }
                style={{ padding:10, borderBottomWidth:0.5}}
                titleStyle={{fontSize:17, letterSpacing:1.5}}
            />
        </View>
    )
}

export default parametre
