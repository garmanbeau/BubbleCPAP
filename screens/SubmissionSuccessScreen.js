import {
  SafeAreaView,
  ScrollView,
  Button,
  Text,
  ImageBackground,
} from "react-native";
import React from "react";
import styles from "../shared/styles";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container4}>
      <ScrollView contentContainerStyle={styles.container4}>
        <ImageBackground
          source={require("../assets/Designer.png")}
          style={styles.backgroundImage}
        >
          <Text style={{ fontSize: 30, color: "green", textAlign: "center" }}>
            Submission Successful! Press the button to go back to the main page.
          </Text>

          <Button
            title="To Main Page"
            onPress={() => navigation.navigate("Welcome")}
          />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
