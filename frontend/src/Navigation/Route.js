import React, {Text} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';




import MainStack from './MainStack';
import AuthStack from './AuthStack';
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
    const {email, name} = useSelector(state => state.userReducer);


    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator 
             screenOptions={{
          headerShown: false,

        }}>
        {MainStack(Stack)}
        {/* {!email ? MainStack(Stack)
            : AuthStack(Stack)
        } */}
            </Stack.Navigator>
        </NavigationContainer>

    );
}