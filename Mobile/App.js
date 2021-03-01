import React from 'react'
import { View,Text } from 'react-native'
import { HomeScreen,LoginScreen,MapScreen,SignupScreen,AddDefibScreen} from './src/Screens'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack' 
import Tabs from "./src/Navigation/Tabs"

const Stack = createStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
     <Stack.Navigator screenOptions = {{headerShown:false}} initialRouteName = {"HomeScreen"}>
       <Stack.Screen name='HomeScreen' component={ Tabs }/>
     </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App
