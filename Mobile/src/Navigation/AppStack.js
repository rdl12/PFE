import React from 'react';
import {View, TouchableOpacity, Text,Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { COLORS,images} from '../Constantes'
import HomeScreen from '../Screens/HomeScreen';
import AddDefibScreen from '../Screens/AddDefibScreen';
import MapScreen from '../Screens/MapScreen';
import LoginScreen from '../Screens/LoginScreen';
import CustomTabBar from '../components/TabBar/CustomTabBar'
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'


const Tab = createBottomTabNavigator();

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
            component={MapScreen}
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