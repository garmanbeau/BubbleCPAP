import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button } from "react-native";

const TextInputExample = ({ navigation }) => {
  const [text10, onChangeText10] = React.useState("");
  const [text11, onChangeText11] = React.useState("");
  const [text12, onChangeText12] = React.useState("");
  const [text13, onChangeText13] = React.useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Method of humidification"
        onChangeText={onChangeText10}
        value={text10}
      />
      <TextInput
        style={styles.input}
        placeholder="Patient interface (nasal, full face, seal)"
        onChangeText={onChangeText11}
        value={text11}
      />
      <TextInput
        style={styles.input}
        placeholder="Outcome"
        onChangeText={onChangeText12}
        value={text12}
      />
      <TextInput
        style={styles.input}
        placeholder="Complications associated with Bubble CPAP "
        onChangeText={onChangeText13}
        value={text13}
      />

      <Button
        title="Next"
        onPress={() => navigation.navigate("Welcome")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputExample;
