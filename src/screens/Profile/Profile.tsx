import { View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button/Button";
import LayoutScreen from "../../components/LayoutScreen/LayoutScreen";
import { useTheme } from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

  const { user, logout } = useAuth();

  const { themeStyles } = useTheme();

  const navigation = useNavigation<any>();

  const logoutHandler = () => {
    logout().then(() => navigation.navigate('Home'));
  };

  return (
    <LayoutScreen>
      <Text style={[themeStyles.color]}>{user?.email}</Text>
      <Button title="Показать юзера" onPress={() => console.log(user)} />
      <Button title="Выйти" onPress={logoutHandler} />
    </LayoutScreen>
  );
}

export default Profile;