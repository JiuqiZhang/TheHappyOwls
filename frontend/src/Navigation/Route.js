import React, {Text, useEffect,View} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';


import SignupScreen from '../screens/Auth/SignupScreen';
import { setStore,setNameLast } from "../redux/actions";
import MainStack from './MainStack';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useDispatch } from "react-redux";
import UpdateScreen from '../screens/Update/update';
const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF'
    },
  };
export default function Routes(props) {
    const  user = useSelector(state => state.user);
    const dispatch = useDispatch();



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
         {user.update?<Stack.Screen
          name="Update"
          component={UpdateScreen}
        />:null}
        {MainStack(Stack,props.store)}

            </Stack.Navigator>
        </NavigationContainer>

    );
}