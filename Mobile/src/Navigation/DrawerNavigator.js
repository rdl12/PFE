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


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent = {props => <SideBar {...props}/>}>
      <Drawer.Screen name="Home" component={AppStack} />
      <Drawer.Screen name="Add defib" component={AddDefibScreen} />
      <Drawer.Screen name="Entrernir" component={MapScreen} />
      <Drawer.Screen name="Statistique" component={StatistiqueScreen} />
      <Drawer.Screen name="Nos Produits" component={ProductsScreen} />
      <Drawer.Screen name="Formations" component={FormationScreen} />
      <Drawer.Screen name="A propos" component={AboutScreen} />
      <Drawer.Screen name="Tutorial" component={TutorialScreen} />
      <Drawer.Screen name="Se Connecter" component={StatistiqueScreen} />
      <Drawer.Screen name="S'inscrire" component={SignupScreen} />
     
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;