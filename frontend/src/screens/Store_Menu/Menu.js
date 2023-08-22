import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList
} from 'react-native';
import { ListItem } from 'react-native-elements'
import axios from "axios";
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },

]
export default MenuScreen = ({}) => {
  const [data, setData] = useState('')
  useEffect(()=>{
    axios
    .get("https://randomuser.me/api/?results=5")
    .then(response =>
      response.data.results.map(user => ({
        name: `${user.name.first} ${user.name.last}`,
        username: `${user.login.username}`,
        email: `${user.email}`,
        image: `${user.picture.thumbnail}`
      }))
    )
    .then(users => {
      setData({
        users,
        isLoading: false
      });
    })
    .catch(error => this.setState({ error, isLoading: false }));
  },[])

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
    <Text>placeholder for MenuScree</Text>
    <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.text}>{item.key}</Text>}
      />
          <Text>{JSON.stringify(data)}</Text>
    </ScrollView> 

  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });
  