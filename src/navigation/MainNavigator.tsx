import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainParamList} from './types/MainParamList';
import {GameScreen, WelcomeScreen, ChooseCardScreen} from '@/screens';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator<MainParamList>();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="ChooseCard" component={ChooseCardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
