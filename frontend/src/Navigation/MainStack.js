
import TabScreen from './BottomTab'
import DetailPage from "../screens/Store_detail/DetailPage";
import InfoScreen from '../screens/Profile/InfoScreen';
import FeedbackScreen from '../screens/Profile/FeedbackScreen';
import SecurityScreen from '../screens/Profile/SecurityScreen';
import EmailConfirm from '../screens/Auth/EmailConfirm';
import AuthStack from './AuthStack';

import Login from '../screens/Auth/Login';
export default function MainStack(Stack){
    return(

<>
        <Stack.Screen
          name="Home"
          component={TabScreen}
          options={{ title: "Happy Owls" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailPage}

        />
          <Stack.Screen
          name="Info"
          component={InfoScreen}

        />
         <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}

        />
                 <Stack.Screen
          name="Security"
          component={SecurityScreen}

        />
        {/* {AuthStack(Stack)} */}
        <Stack.Screen
          name="Login"
          component={EmailConfirm}

        />
          
        {/* <Stack.Screen name="Map" component={MapScreen} /> */}

</>
    )
}