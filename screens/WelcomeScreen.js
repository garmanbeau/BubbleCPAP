import {
  SafeAreaView,
  ScrollView,
  Button,
  Text,
  ImageBackground,
  View
} from "react-native";
import React from "react";
import styles from "../shared/styles";
import CustomProgressSteps from "../shared/CustomProgressSteps";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container4}>
      <ScrollView contentContainerStyle={styles.container4}>
        <ImageBackground
          source={require("../assets/Designer.png")}
          style={styles.backgroundImage}
        >
          <Text
            style={{ fontSize: 30, textAlign: "center" }}
          >
            Welcome to the BcPAP App!
          </Text>

          <Button
            title="Record Information"
            onPress={() => navigation.navigate("Hospital Select")}
          />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
