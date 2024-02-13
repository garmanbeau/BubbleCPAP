import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button } from "react-native";

const TextInputExample = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  const [text2, onChangeText2] = React.useState("");
  const [text3, onChangeText3] = React.useState("");
  const [text4, onChangeText4] = React.useState("");
  const [text5, onChangeText5] = React.useState("");
  const [text6, onChangeText6] = React.useState("");
  const [text7, onChangeText7] = React.useState("");
  const [text8, onChangeText8] = React.useState("");
  const [text9, onChangeText9] = React.useState("");
  const [text10, onChangeText10] = React.useState("");
  const [text11, onChangeText11] = React.useState("");
  const [text12, onChangeText12] = React.useState("");
  const [text13, onChangeText13] = React.useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Prior medical history of chronic disease"
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        placeholder="Bubble CPAP expiratory limb size (measured in millimeters or centimeters)"
        onChangeText={onChangeText2}
        value={text2}
      />
      <TextInput
        style={styles.input}
        placeholder="Reason for Bubble CPAP use"
        onChangeText={onChangeText3}
        value={text3}
      />
      <TextInput
        style={styles.input}
        placeholder="Reason for Bubble CPAP discontinuation"
        onChangeText={onChangeText4}
        value={text4}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration of Bubble CPAP use (hours, days)"
        onChangeText={onChangeText5}
        value={text5}
      />
      <TextInput
        style={styles.input}
        placeholder="Lowest Bubble CPAP pressure used"
        onChangeText={onChangeText6}
        value={text6}
      />
      <TextInput
        style={styles.input}
        placeholder="Highest Bubble CPAP pressure used"
        onChangeText={onChangeText7}
        value={text7}
      />
      <TextInput
        style={styles.input}
        placeholder="Source of oxygen"
        onChangeText={onChangeText8}
        value={text8}
      />
      <TextInput
        style={styles.input}
        placeholder="Method of oxygen blending"
        onChangeText={onChangeText9}
        value={text9}
      />

      <Button
        title="Next"
        onPress={() => navigation.navigate("PatientPage3")}
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
