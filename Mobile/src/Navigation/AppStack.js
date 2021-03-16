import React from 'react';
import {View, TouchableOpacity, Text,Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS,images} from '../Constantes'
import HomeScreen from '../Screens/HomeScreen';
import AddDefibScreen from '../Screens/AddDefibScreen';
import MapScreen from '../Screens/MapScreen';
import LoginScreen from '../Screens/LoginScreen';
import CustomTabBar from '../components/TabBar/CustomTabBar'
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'
import ListDefibScreen from '../Screens/ListDefibScreen'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const FeedStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Map Screen"
        component={MapScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListDefib"
        component={ListDefibScreen}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
const AppStack = () => {
  return (
    <Tab.Navigator
    tabBarOptions = {{
      showLabel: false,
      style:{
        borderTopWidth : 0,
        backgroundColor : "transparent",
        elevation : 0
      }
      
    }}
    tabBar={(props) => (
      <CustomTabBar
          props={props}
      />
  )}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                    source={images.Home_image}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: focused ? COLORS.primary : COLORS.secondary
                    }}
                />                  
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                )
            }}
        />
          <Tab.Screen
            name="Maps"
            component={FeedStack}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={images.Home_image}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? COLORS.primary : COLORS.secondary
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                )
            }}
        />
       <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons
                    name="home-outline"
                    color={color}
                    size={size}
                  />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                )
            }}
        />
        <Tab.Screen
            name="AddDefib"
            component={AddDefibScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={images.Home_image}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? COLORS.primary : COLORS.secondary
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                
                ),
               
            }}
        />
    </Tab.Navigator>
  
)
}

export default AppStack;