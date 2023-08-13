
import TabScreen from './BottomTab'


export default function MainStack(Stack){
    return(


        <Stack.Screen
          name="Home"
          component={TabScreen}
          options={{ title: "Happy Owls" }}
        />


    )
}