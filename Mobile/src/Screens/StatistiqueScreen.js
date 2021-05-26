import React, {useState,useEffect,} from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import {Fetch_stats_etat,Fetch_stats_prov} from '../redux/actions'
import {useSelector, useDispatch} from 'react-redux'

const StatistiqueScreen = () => {
    const stat_etat_defib = useSelector(state => state.Fetch_stats_etat);
    const stat_prov_defib = useSelector(state => state.Fetch_stats_prov);
    const dispatch = useDispatch();
    let nbr_defib =[]
    const [nbrs, setnbrs] = useState(0)
    useEffect(() => {
        dispatch(Fetch_stats_etat())
        dispatch(Fetch_stats_prov())
        setTimeout(() => {
            typeof stat_prov_defib !== undefined && Object.values(stat_prov_defib).map(items => {items.map(item => nbr_defib.push(item[1]))})
            console.log(stat_prov_defib)
            console.log(nbr_defib)
            setnbrs(nbr_defib.reduce((a, b) => a + b, 0))
        }, 2000);
    }, [])
        return (
            <SafeAreaView>
               {nbrs !== 0 ?( <Text> nombre de defibs : {nbrs}</Text>):null}
               {nbr_defib.length !== 0 ?( <Text> nombre de villes : {nbr_defib.length}</Text>):null}
            </SafeAreaView> 
        )
    
}

export default StatistiqueScreen
