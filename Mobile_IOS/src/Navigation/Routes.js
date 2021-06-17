import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator'
import {navigationRef} from '../services/NavigationService'

const Routes = () => {
  return (
    <NavigationContainer ref={navigationRef}>
       <DrawerNavigator />
    </NavigationContainer>
  );
};

export default Routes;
