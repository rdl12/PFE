import React,{useEffect} from 'react'
import { View, Text } from 'react-native'

const UrgenceMap = ({ navigation, route }) => {
   


    useEffect(() => {
        
   console.log(route.params.id)
    }, [route.params.id])
    return (
        <View>
            <Text>Urgence Map</Text>
        </View>
    )
}

export default UrgenceMap
