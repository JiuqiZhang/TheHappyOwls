
import TabScreen from './BottomTab'
import DetailPage from "../screens/Store_detail/DetailPage";

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

</>
    )
}