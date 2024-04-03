
import TabScreen from './BottomTab'
import DetailPage from "../screens/Store_detail/DetailPage";
import InfoScreen from '../screens/Profile/InfoScreen';
import FeedbackScreen from '../screens/Profile/FeedbackScreen';
import SecurityScreen from '../screens/Profile/SecurityScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import SignupNameScreen from '../screens/Auth/SignupNameScreen';
// import EmailConfirm from '../screens/Auth/EmailConfirm';
import { useSelector } from 'react-redux';

import Login from '../screens/Auth/Login';
export default function MainStack(Stack){
  const  user = useSelector(state => state.user);
    return(

<>     
        <Stack.Screen
          name="Home"
          component={TabScreen}
          options={{ title: "Happy Owls" }}
        />
          <Stack.Screen
          name="Signup"
          component={SignupScreen}

        />
                  <Stack.Screen
          name="SignupName"
          component={SignupNameScreen}

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

</>
    )
}