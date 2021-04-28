import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";


import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import SideBar from "../components/SideBar/SideBar";
import {windowWidth} from '../utils/Dimentions'
import {useSelector} from 'react-redux'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const LoginInfo = useSelector(state => state.loginReducer);
  return (
    <Drawer.Navigator drawerStyle={{width:windowWidth*3/4.5}} drawerContent = {props => <SideBar {...props}/>}>
      {LoginInfo.isLoggedIn ?(
       <Drawer.Screen name="Home" component={AppStack} />
      ):
       ( <Drawer.Screen name="Home" component={AuthStack} />)
      
      }
      
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;