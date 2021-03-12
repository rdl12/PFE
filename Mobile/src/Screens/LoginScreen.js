import { View,Text, SafeAreaView ,Button } from 'react-native'
import React ,{useState}  from 'react'
import { login } from '../redux/actions';
import { useDispatch } from 'react-redux';
import {SignupScreen} from './SignupScreen'

import Input from '../components/Input/Input'
const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    return (
        <SafeAreaView>
        <Input
          placeholderText='Enter username'
          labelValue={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholderText='Enter password'
          labelValue={password}
          onChangeText={(text) => setPassword(text)}
        />
       <Button
        onPress={() => dispatch(login({'username': username, 'password': password }))}  
        title="Envoyer"
        color="#841584" />
         <Button
        title="S'inscrire"
        onPress={() => navigation.navigate("S'inscrire")}
        />
        </SafeAreaView>
     )
}

export default LoginScreen
