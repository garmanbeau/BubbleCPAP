import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Text,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../shared/styles";
import { fetchSexAtBirth } from "../shared/api";
import { useRoute } from "@react-navigation/native";

const TextInputExample = ({ navigation }) => {
  route = useRoute();

  const [patient, setPatient] = useState(route.params.patient);

  const [text, onChangeText] = React.useState("");
  const [text2, onChangeText2] = React.useState("");
  const [text3, onChangeText3] = React.useState("");
  const [text4, onChangeText4] = React.useState("");
  const [text5, onChangeText5] = React.useState("");

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");

  const [sexAtBirth, setSexAtBirth] = useState([]); //TODO: change name to something that designates it a dropdown value

  const [isLoading, setIsLoading] = useState(true);

  const data = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  useEffect(() => {
    fetchSexAtBirth(setSexAtBirth, setIsLoading);
  }, []);
  // useEffect(() => {
  //   setPatient(route.params.patient);
  // }, [route.params.patient]);
  //might need this code to update if route.params.patient changes.

  if (isLoading) {
    return <Text>Loading </Text>; // Or some other placeholder
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setPatient({ ...patient, Diagnosis: text });
        }}
        value={patient.Diagnosis}
        placeholder="Diagnosis"
      />
      {/* <TextInput
        style={styles.input} // change to Assigned sex at birth - male, female, other
        onChangeText={onChangeText2}
        value={text2}
        placeholder="Patient Sex"
      /> */}
      <Dropdown //make multi select drop down??
        style={[styles.input, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={sexAtBirth}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Patients Sex Assigned at Birth" : "..."}
        searchPlaceholder="Search..."
        // value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setPatient({...patient, AssignedSexAtBirth: item.value});
          console.log(item.value);
          console.log(value);
          setIsFocus(false);
        }}
      />
      {value.includes("other") && (
        // Render a textinput element if the condition is true
        <TextInput placeholder="Please specify" />
      )}
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setPatient({ ...patient, AgeYears: text });
            }}
            value={patient.AgeYears}
            placeholder="Patient Year"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setPatient({ ...patient, AgeMonths: text });
            }}
            value={patient.AgeMonths}
            placeholder="Patient Month"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setPatient({ ...patient, AgeDays: text });
            }}
            value={patient.AgeDays}
            placeholder="Patient Day"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.submitButton}>
        <Button
          title="Next"
          onPress={() => navigation.navigate("PatientPage2", {patient})}
          // onPress={() => console.log(patient)}
        />
      </View>
    </SafeAreaView>
  );
};

export default TextInputExample;
