import React from 'react';
import {View, TouchableOpacity, Text,Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { COLORS,images} from '../Constantes'
import CustomTabBar from '../components/TabBar/CustomTabBar'
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'
import { HomeScreen, ProfilScreen,MapScreen,ListDefibScreen, DetailsScreen, UrgenceScreen,AddDefibScreen,MyDefibsScreen,
  FormationDetailsScreen,ChatScreen, MapDetails,InfoProfilScreen,LocationScreen,TutorialScreen,UrgenceMap,FormationScreen,Parametre } from '../Screens';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfilStack = ({navigation}) => (
    <Stack.Navigator>
       <Stack.Screen
        name="Profil"
        component={ProfilScreen}
        options={{headerShown: true}}
      />
      
      <Stack.Screen
        name="MyDefibs"
        component={MyDefibsScreen}
        options={{headerShown: true}}
      />
      
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: true}}
      />
       <Stack.Screen
        name="MapDetails"
        component={MapDetails}
        options={{headerShown: true,  
        headerRight : () => (
          <TouchableOpacity onPress={() => navigation.navigate('Details')} >
              <Image
                source={ images.close_icon }
                resizeMode='contain'
                  /> 
          </TouchableOpacity>
         
       )}}

      />

      <Stack.Screen
          name="InfoProfil"
          component={InfoProfilScreen}
          options={{headerShown: true}}
        />

      <Stack.Screen
          name="Parametre"
          component={Parametre}
          options={{headerShown: true}}
        />

    </Stack.Navigator>
  );

  const MapStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="ListDefib"
        component={ListDefibScreen}
        options={{headerShown: true}}
      />
      
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{headerShown: true}}
      />

      
      <Stack.Screen
        name="AddDefib"
        component={AddDefibScreen}
        options={{headerShown: true}}
      />

       <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: true}}
      />

    </Stack.Navigator>
  );

  const UrgenceStack = ({navigation})=>(
    <Stack.Navigator>
        <Stack.Screen
        name="Urgence"
        component={UrgenceScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ListDefib"
        component={ListDefibScreen}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: true}}
      />

    </Stack.Navigator>
    
  );

  const HomeStack = () => (
    <Stack.Navigator>
      
      <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="chat"
      component={ChatScreen}
      options={{headerShown: false}}
      />
    <Stack.Screen
      name="Help"
      component={LocationScreen}
      options={{headerShown: true}}
    />
    <Stack.Screen
      name="Tutorial"
      component={TutorialScreen}
      options={{headerShown: true}}
    />
    <Stack.Screen
      name="Notification"
      component={UrgenceMap}
      options={{headerShown: false}}
      />
    <Stack.Screen
        name="Formation"
        component={FormationScreen}
        options={{headerShown: false}}
      />
    <Stack.Screen
        name="formationDetails"
        component={FormationDetailsScreen}
        options={{headerShown: false}}
      />
    <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{headerShown: false}}
      />
    <Stack.Screen
        name="AddDefib"
        component={AddDefibScreen}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  )

const AuthStack = () => {
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
              component={HomeStack}
              options={{
                  
                  tabBarIcon: ({ focused }) => (
                      <Image
                      source={images.Home_image}
                      resizeMode="contain"
                      style={{
                          width: 30,
                          height: 30,
                          bottom: focused ? 0 : 5,
                          tintColor: focused ? COLORS.white: COLORS.primary
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
            <Tab.Screen
              name="Maps"
              component={MapStack}
              options={{
                  tabBarVisible: false,
                  tabBarIcon: ({ focused }) => (
                      <Image
                          source={images.map_icon}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              bottom: focused ? 0 : 5,
                              tintColor: focused ? COLORS.white: COLORS.primary
                          }}
                      />
                  ),
                  tabBarButton: (props) => (
                      <TabBarCustomButton visible
                          {...props}
                      />
                  ),
           
              }}
          />
        
          <Tab.Screen
              name="UrgenceScreen"
              component={UrgenceStack}
              options={{
                  tabBarVisible: false,
                  tabBarIcon: ({ focused }) => (
                      <Image
                          source={images.phone_icon}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              bottom: focused ? 0 : 5,
                              tintColor: focused ? COLORS.white: COLORS.primary
                          }}
                      />
                  ),
                  tabBarButton: (props) => (
                      <TabBarCustomButton visible 
                          {...props}
                      />
                  
                  ),
                
              }}
          />
  
           <Tab.Screen
              name="Profil"
  
              component={ProfilStack}
              options={{
                  tabBarVisible: false,
                  tabBarIcon: ({ focused }) => (
                      <Image
                          source={images.user_icon}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              bottom: focused ? 0 : 5,
                              tintColor: focused ? COLORS.white: COLORS.primary
                          }}
                      />
                  ),
                  tabBarButton: (props) => (
                      <TabBarCustomButton visible
                          {...props}
                      />
                  )
              }}
          />
      </Tab.Navigator>
    
  )
  }

  export default AuthStack;