import React,{useState,useEffect,} from 'react'
import { View, Text } from 'react-native'
import {useSelector} from 'react-redux'

const DetailsScreen = () => {

    const Get_Defib = useSelector(state => state.Get_Defib);

    useEffect(() => {
        console.log(Get_Defib)
       
    }, [Get_Defib])
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default DetailsScreen
