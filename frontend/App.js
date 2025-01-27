// import { StatusBar } from "expo-status-bar";
// import { Button, StyleSheet, TextInput, View, Text,Platform } from "react-native";
// import { useState, useEffect,useRef } from "react";
// import FlashMessage from "react-native-flash-message";
// import * as React from "react";
// import Routes from './src/Navigation/Route';
// import { Provider } from "react-redux";
// import { Store } from "./src/redux/store";
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { useSelector, useDispatch } from "react-redux";
// import { setToken } from "./src/redux/actions";
// import Constants from 'expo-constants';
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

// function handleRegistrationError(errorMessage) {
//   alert(errorMessage);
//   throw new Error(errorMessage);
// }

// async function registerForPushNotificationsAsync() {
//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       handleRegistrationError('Permission not granted to get push token for push notification!');
//       return;
//     }
//     const projectId =
//       Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//     if (!projectId) {
//       handleRegistrationError('Project ID not found');
//     }
//     try {
//       const pushTokenString = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       // console.log(pushTokenString);
//       return pushTokenString;
//     } catch (e) {
//       handleRegistrationError(`${e}`);
//     }
//   } else {
//     handleRegistrationError('Must use physical device for push notifications');
//   }
// }

// import { enableScreens } from 'react-native-screens';
// enableScreens();



// export default function App() {
  
//   const [msg, setMsg] = useState('initial set\n')
//   const [devicetoken, setDevicetoken] = useState();
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(
//     {
//       message:"nothing yet",
//       data: null
//     }
//   );
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     // getDevicetoken().then(token=>{setDevicetoken(token);console.log(token);


    
//     // })
//     registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));


//     registerForPushNotificationsAsync()
//       .then(token => setExpoPushToken(token ?? ''))
//       .catch((error) => setExpoPushToken(`${error}`));

//     notificationListener.current = Notifications.addNotificationReceivedListener(notif => {
//       setNotification((data)=>({message:"Got our notification",data:JSON.stringify(notif)}));
//       console.log(notif)
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       setNotification((data)=>({...data,response:response}));
//       console.log(response);
//     });

//     return () => {
//       notificationListener.current &&
//         Notifications.removeNotificationSubscription(notificationListener.current);
//       responseListener.current &&
//         Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);


//   return (
//     <Provider store={Store}>
//   <View style={{ alignItems: 'center', justifyContent: 'center',top:'20%' }}>
//         <Text>Data: {notification && notification.data}</Text>
//         <Text>Store info(Trying to access data.request.trigger.payload.store_id):{'\n'}{notification.data && JSON.stringify(notification.request.trigger.payload.store_id)}</Text>
//         <Text>(Trying to access data.request):{'\n'}{notification.data && JSON.stringify(notification.request)}</Text>
//         <Text>(Trying to access data.request.trigger):{'\n'}{notification.data && JSON.stringify(notification.request.trigger)}</Text>
//         <Text>(Trying to access data.request.trigger.payload):{'\n'}{notification.data && JSON.stringify(notification.request.trigger.payload)}</Text>
        

        
//         {/* <Button
//         title="Press to Send Notification"
//         onPress={async () => {
//           await sendPushNotification(expoPushToken);
//         }}
//         /> */}
//       </View>
//     <FlashMessage
//         position="top"
//       />
//      </Provider>

   
//   );
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });



// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// async function getDevicetoken(){
//   const token = await Notifications.getDevicePushTokenAsync();
//   return token
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here', test: { test1: 'more data' } },
//     },
//     trigger: { seconds: 2 },
//   });
// }


import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View, Text,Platform } from "react-native";
import { useState, useEffect,useRef } from "react";
import FlashMessage from "react-native-flash-message";
import * as React from "react";
import Routes from './src/Navigation/Route';
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./src/redux/actions";
import Constants from 'expo-constants';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      // console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } 
}

import { enableScreens } from 'react-native-screens';
enableScreens();



export default function App() {
  
  const [store, setStore] = useState(null)
  const [devicetoken, setDevicetoken] = useState();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(
    {
      message:"nothing yet",
      data: null
    }
  );
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // getDevicetoken().then(token=>{setDevicetoken(token);console.log(token);


    
    // })
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));


    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notif => {
      setNotification((data)=>({message:"Got our notification",data:JSON.stringify(notif)}));
      if(notif.request.trigger.payload.store_id){
        setStore(notif.request.trigger.payload.store_id)
      }
      // console.log(notif)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  return (
    <Provider store={Store}>
 <Routes store={store}/>
    <FlashMessage
        position="top"
      />
     </Provider>

   
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function getDevicetoken(){
  const token = await Notifications.getDevicePushTokenAsync();
  return token
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: { seconds: 2 },
  });
}

