import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
export default function MainStack(Stack){
    return(

<>
        <Stack.Screen
          name="Home"
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
        />
        </>

    )
}