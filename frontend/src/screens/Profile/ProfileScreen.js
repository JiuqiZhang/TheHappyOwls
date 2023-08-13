import { Text } from "react-native";
import { useSelector } from 'react-redux';
export default ProfileScreen = ({ }) => {
  const state = useSelector(state => state.userReducer);
    return (
      <Text>{'\n\n\n   '}Email:{state.email}</Text>
    );
  };