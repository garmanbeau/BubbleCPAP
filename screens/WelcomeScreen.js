import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState } from "react";
import styles from '../shared/styles';

export default function WelcomeScreen({ navigation }) {

  return (
    
      <ImageBackground source={require('../assets/Designer.png')} style={styles.backgroundImage}>

      <Text>Welcome to the BcPAP App!</Text>

      <Button
        title="Go to Search"
        onPress={() => navigation.navigate("Search")}
        />

      <Button
        title="Record Information"
        onPress={() => navigation.navigate("HospitalSelect")}
        />
        </ImageBackground>
      
  );
}
