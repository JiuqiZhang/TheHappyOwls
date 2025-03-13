
import TabScreen from './BottomTab'
import DetailPage from "../screens/Store_detail/DetailPage";
import InfoScreen from '../screens/Profile/InfoScreen';
import FeedbackScreen from '../screens/Profile/FeedbackScreen';
import SecurityScreen from '../screens/Profile/SecurityScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import SignupNameScreen from '../screens/Auth/SignupNameScreen';
import Privacy_policy from '../screens/Profile/Privacy_policy';
import ManageCheckInScreen from '../screens/Profile/ManageCheckIn';
// import EmailConfirm from '../screens/Auth/EmailConfirm';
import { useSelector } from 'react-redux';

import Login from '../screens/Auth/Login';
export default function MainStack(Stack, store) {
  const user = useSelector(state => state.user);

  return (

    <>
      <Stack.Screen
        name="Home"
        component={TabScreen}
        options={{ title: "Happy Owls" }}
        initialParams={{ store: store ? { _id: store } : 'no' }}
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
        initialParams={{ 'key': 'value' }}

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
      <Stack.Screen
        name="Policy"
        component={Privacy_policy}

      />

      <Stack.Screen
        name="ManageCheckInScreen"
        component={ManageCheckInScreen}

      />

    </>
  )

}