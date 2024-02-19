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
        placeholder="Patient interface (nasal, full face, seal)" //patient interface - nasal prongs, nasal mask, nose/mouth mask, scuba/full face mask
        onChangeText={onChangeText11}
        value={text11}
      />
      <TextInput
        style={styles.input}
        placeholder="Outcome" //discharged home, trasnfered to another hospital, died, intubated (check all that apply, as a child can be both intubated and transferred or intubated and died)
        onChangeText={onChangeText12}
        value={text12}
      />
      <TextInput
        style={styles.input}
        placeholder="Complications associated with Bubble CPAP "
        //discharged home, trasnfered to another hospital, died, intubated (check all that apply, as a child can be both intubated and transferred or intubated and died)
        //If other - please describe
        //if pneumothorax, can you describe the context (patient severity of illness and how it was diagnosed) - free text

        onChangeText={onChangeText13}
        value={text13}
      />

      <Button title="Next" onPress={() => navigation.navigate("Welcome")} />
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
