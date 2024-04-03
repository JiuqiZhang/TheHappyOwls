import React, {Text} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';


import SignupScreen from '../screens/Auth/SignupScreen';

import MainStack from './MainStack';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF'
    },
  };
export default function Routes() {
    const  user = useSelector(state => state.user);


    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator 
             screenOptions={{
          headerShown: false,

        }}>
         {user.email?null:<Stack.Screen
          name="onBoard"
          component={SignupScreen}
        />}
        {MainStack(Stack)}

            </Stack.Navigator>
        </NavigationContainer>

    );
}