import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Button,
  Text,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../shared/styles";
import {
  fetchSexAtBirth,
  fetchPatientAge,
  fetchPatientGestationalAge,
} from "../shared/api";
import { useRoute } from "@react-navigation/native";
import { useValidation } from "../shared/validation";
import CustomProgressSteps from "../shared/CustomProgressSteps";

const BasicPatientInfo = ({ navigation }) => {
  route = useRoute();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patient, setPatient] = useState(route.params.patient);
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const [isSexDropFocus, setIsSexDropFocus] = useState(false);
  const [isAgeDropFocus, setIsAgeDropFocus] = useState(false);
  const [isGestAgeDropFocus, setIsGestAgeDropFocus] = useState(false);
  const [value, setValue] = useState("");

  const [sexAtBirth, setSexAtBirth] = useState([]); //TODO: change name to something that designates it a dropdown value
  const [patientAgeOptions, setPatientAgeOptions] = useState([]);
  const [patientGestAgeOptions, setPatientGestAgeOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isAgeLoading, setAgeIsLoading] = useState(true);
  const [isGestAgeLoading, setGestAgeIsLoading] = useState(true);

  const DiagnosisValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const PatientSexValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const PatientAgeValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const GestationalAgeValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const OtherValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );

  const handleNext = (patient) => {
    setIsSubmitted(true);
    DiagnosisValidation.validateNow();
    PatientAgeValidation.validateNow();
    PatientSexValidation.validateNow();
    GestationalAgeValidation.validateNow();
    OtherValidation.validateNow();

    if (
      DiagnosisValidation.isValid &&
      PatientAgeValidation.isValid &&
      PatientSexValidation.isValid &&
      GestationalAgeValidation.isValid&&
      (!isOtherSelected || (isOtherSelected && OtherValidation.isValid))
    ) {
      navigation.navigate("PatientPage2", { patient });
    }
  };

  useEffect(() => {
    fetchSexAtBirth(setSexAtBirth, setIsLoading);
    fetchPatientAge(setPatientAgeOptions, setAgeIsLoading);
    fetchPatientGestationalAge(setPatientGestAgeOptions, setGestAgeIsLoading);
  }, []);

  if (isLoading || isAgeLoading || isGestAgeLoading) {
    return <Text>Loading </Text>; // Or some other placeholder
  }

  return (
    <SafeAreaView style={styles.container4}>
      <ScrollView contentContainerStyle={styles.container4}>
        <ImageBackground
          source={require("../assets/Designer.png")}
          style={styles.backgroundImage2}
        >
          <CustomProgressSteps activeStep={2}></CustomProgressSteps>
          <View>
            <Text style={styles.label}>Initial Diagnosis of Patient</Text>
            <View style={styles.fieldContainer}>
              {!DiagnosisValidation.isValid && isSubmitted && (
                <Text style={styles.error}>Must fill item</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: DiagnosisValidation.borderColor,
                  },
                ]}
                onChangeText={(text) => {
                  setPatient({ ...patient, Diagnosis: text });
                  DiagnosisValidation.handleChange(text);
                }}
                value={patient.Diagnosis}
                placeholder="Diagnosis"
              />
            </View>
          </View>

          <Text style={styles.label}>Patient's Sex Assigned at Birth</Text>
          {isSubmitted && !PatientSexValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: PatientSexValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={sexAtBirth}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              !isSexDropFocus ? "Select Patient's Sex Assigned at Birth" : "..."
            }
            searchPlaceholder="Search..."
            value={PatientSexValidation.value}
            onFocus={() => setIsSexDropFocus(true)}
            onBlur={() => {
              setIsSexDropFocus(false);
              PatientSexValidation.handleBlur();
            }}
            onChange={(item) => {
              setPatient({ ...patient, AssignedSexAtBirth: item.value });
              PatientSexValidation.handleChange(item.value);
              setIsOtherSelected(item.value === "Other");
              console.log(item.value);
              console.log(value);
              setIsSexDropFocus(false);
            }}
          />
         {isOtherSelected && (
  <View>
  <Text style={styles.label}>Please Specify Sex</Text>
  <View style={styles.fieldContainer}>
    {!OtherValidation.isValid && isSubmitted && (
      <Text style={styles.error}>Must fill item</Text>
    )}
    <TextInput
      style={[
        styles.input,
        {
          borderColor: OtherValidation.borderColor,
        },
      ]}
      onChangeText={(text) => {
        setPatient({ ...patient, AssignedSexAtBirth: text });
        OtherValidation.handleChange(text);
      }}
      placeholder="Specify Sex"
    />
  </View>
</View>
)}

          <Text style={styles.label}>Patient's Age Range</Text>
          {isSubmitted && !PatientAgeValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: PatientAgeValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={patientAgeOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isAgeDropFocus ? "Select Patient's Age" : "..."}
            searchPlaceholder="Search..."
            value={PatientAgeValidation.value}
            onFocus={() => setIsAgeDropFocus(true)}
            onBlur={() => {
              setIsAgeDropFocus(false);
              PatientAgeValidation.handleBlur();
            }}
            onChange={(item) => {
              setPatient({ ...patient, Age: item.value });
              PatientAgeValidation.handleChange(item.value);
              console.log(item.value);
              console.log(value);
              setIsAgeDropFocus(false);
            }}
          />

          <Text style={styles.label}>
            Patient's Gestational Age (Premature?)
          </Text>
          {isSubmitted && !GestationalAgeValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: GestationalAgeValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={patientGestAgeOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              !isGestAgeDropFocus ? "Select Patient's Gestational Age" : "..."
            }
            searchPlaceholder="Search..."
            // value={value}
            onFocus={() => setIsGestAgeDropFocus(true)}
            onBlur={() => {
              setIsGestAgeDropFocus(false);
              GestationalAgeValidation.handleBlur();
            }}
            onChange={(item) => {
              setPatient({ ...patient, GestAge: item.value });
              GestationalAgeValidation.handleChange(item.value);
              console.log(item.value);
              console.log(value);
              setIsGestAgeDropFocus(false);
            }}
          />
          <View style={styles.buttonEndContainer}>
            <Button title="Next" onPress={() => handleNext(patient)} />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicPatientInfo;
