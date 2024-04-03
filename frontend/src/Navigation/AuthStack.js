import Login from "../screens/Auth/Login";
import SignupScreen from "../screens/Auth/SignupScreen";
export default function MainStack(Stack){
    return(

<>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
        />
        </>

    )
}