import React ,{useState}  from 'react'
import { View,Text,TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import { Singup } from '../redux/actions';
import Input from '../components/Input/Input'

const SignupScreen = ({navigation}) => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')

    const dispatch = useDispatch()
    return (
        <View>
             <Input
          placeholderText='FirstName'
          labelValue={firstName}
          onChangeText={(text) => setfirstName(text)}
        />
         <Input
          placeholderText='LastName'
          labelValue={lastName}
          onChangeText={(text) => setlastName(text)}
        />
        <Input
          placeholderText='Email'
          labelValue={email}
          onChangeText={(text) => setemail(text)}
        />
        <Input
          placeholderText='password'
          labelValue={password}
          onChangeText={(text) => setPassword(text)}
        />
          <View >
             <TouchableOpacity onPress={() => dispatch(Singup(firstName,lastName,email,password))}>
               <Text >S'inscrire </Text>
             </TouchableOpacity>
          </View>
        </View>
    )
}

export default SignupScreen
