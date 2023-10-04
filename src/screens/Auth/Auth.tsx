import { View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { useState } from "react";
import { login, register } from "../../services/firebase";
import LayoutScreen from "../../components/LayoutScreen/LayoutScreen";
import AuthForm from "../../components/AuthForm/AuthForm";
import Heading from "../../components/Heading/Heading";

const Auth = () => {

  return (
    <>
      <Heading withLogo account={false} />
      <LayoutScreen style={styles.container}>
        <AuthForm />
      </LayoutScreen>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Auth;
