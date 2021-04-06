import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";


import AppStack from "./AppStack";
import SignupScreen from "../Screens/SignupScreen";
import AddDefibScreen from "../Screens/AddDefibScreen";
import EntretenirScreen from "../Screens/EntretenirScreen";
import StatistiqueScreen from "../Screens/StatistiqueScreen";
import { Text } from "react-native";
import ProductsScreen from "../Screens/ProductsScreen";
import FormationScreen from "../Screens/FormationScreen";
import AboutScreen from "../Screens/AboutScreen";
import TutorialScreen from "../Screens/TutorialScreen";
import MapScreen from "../Screens/MapScreen";
import SideBar from "../components/SideBar/SideBar";
import {windowWidth} from '../utils/Dimentions'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerStyle={{width:windowWidth*3/4.5}} drawerContent = {props => <SideBar {...props}/>}>
      <Drawer.Screen name="Home" component={AppStack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;