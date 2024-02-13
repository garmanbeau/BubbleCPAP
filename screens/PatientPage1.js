import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";

const TextInputExample = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  const [text2, onChangeText2] = React.useState("");
  const [text3, onChangeText3] = React.useState("");
  const [text4, onChangeText4] = React.useState("");
  const [text5, onChangeText5] = React.useState("");


  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Diagnosis"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText3}
        value={text3}
        placeholder="Patient Sex"
      />
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText4}
            value={text2}
            placeholder="Patient Year"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText5}
            value={text2}
            placeholder="Patient Month"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText2}
            value={text2}
            placeholder="Patient Day"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.submitButton}>
        <Button
          title="Next"
          onPress={() => navigation.navigate("PatientPage2")}
        />
      </View>
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
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  submitButton: {
    bottom: -500,
  },
});

export default TextInputExample;
