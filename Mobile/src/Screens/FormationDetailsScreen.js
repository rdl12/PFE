import React,{useEffect} from 'react'
import { View, Text } from 'react-native'
import { useDispatch,useSelector } from 'react-redux';
import { Fetch_Formation_Details } from '../redux/actions';

const FormationDetailsScreen = ({ navigation, route }) => {
    const { formation } = route.params;
    const formationDetails = useSelector(state => state.Formation_Details_Reducer.formationDetails);
   
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Fetch_Formation_Details(formation.id)) 
        console.log(formationDetails)
    }, [])
    
    return (
        <View>
            <Text>{formation.id}</Text>
        </View>
    )
}

export default FormationDetailsScreen
