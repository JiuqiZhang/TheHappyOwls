import React, {Text} from 'react';
import { NavigationContainer } from '@react-navigation/native';


import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


export default function Routes() {
    const {email, name} = useSelector(state => state.userReducer);


    return (
        <NavigationContainer>
            <Stack.Navigator  screenOptions={{
          headerShown: false,
        }}>
        {email ? MainStack(Stack)
            : AuthStack(Stack)
        }
            </Stack.Navigator>
        </NavigationContainer>

    );
}