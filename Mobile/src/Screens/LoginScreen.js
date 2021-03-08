import { View,Text, SafeAreaView ,Button } from 'react-native'
import React ,{useState}  from 'react'
import { login } from '../redux/actions';
import { useDispatch } from 'react-redux';

import Input from '../components/Input/Input'
const LoginScreen = (props) => {
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
        </SafeAreaView>
     )
}

export default LoginScreen
