import Login from "../screens/Auth/Login";

export default function MainStack(Stack){
    return(


        <Stack.Screen
          name="Home"
          component={Login}
        />


    )
}