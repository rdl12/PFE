import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator'

const Routes = () => {
  return (
    <NavigationContainer>
       <DrawerNavigator />
    </NavigationContainer>
  );
};

export default Routes;
