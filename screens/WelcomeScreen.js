import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function WelcomeScreen({ navigation }) {
  const [isTextInputVisible, setTextInputVisibility] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Welcome to the BcPAP App!</Text>

      <Button
        title="Go to Search"
        onPress={() => navigation.navigate("Search")}
      />

      <Button
        title="Record Information"
        onPress={() => navigation.navigate("HospitalSelect")}
      />
<Button
        title="Toggle TextInput"
        onPress={() => setTextInputVisibility(!isTextInputVisible)}
      />
      {isTextInputVisible && <TextInput placeholder="Type here..." />}
      </View>
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
