import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../shared/styles";
import { fetchHospitals } from "../shared/api";
import { useValidation } from "../shared/validation";
import CustomProgressSteps from "../shared/CustomProgressSteps";

const HospitalSelect = ({ navigation }) => {
  const route = useRoute();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(true);
  const hospitalDropdownValidation = useValidation(
    "",
    (value) => value !== "",
    isSubmitted
  );
  const [patient, setPatient] = useState({
    AssignedSexAtBirth: "",
    Diagnosis: "",
    Age: "",
    GestAge: "",
    MedicalHistory: "",
    BubbleCPAPExpiratoryLimbSizeMM: null,
    BCPAPTypeDeviceUsed: "",
    DurationOfBubbleCPAPUse: "",
    MinPressure: null,
    MaxPressure: null,
    PrimarySourceOfOxygen: "",
    PatientInterface: "",
    MethodOfOxygenBlending: "",
    MethodOfHumidification: "",
    Hospital_Id: null,

    StartBCPAPReasons: [],
    StopBCPAPReasons: [],
    PatientOutcomes: [],
    PatientComplications: [],
  });

  const [hospital, setHospital] = useState({
    id: null,
    year: null,
    lastQuestionAsked: null,
    BCPAPUnitsAvailable: null,
    PediatricAdmissionsPerMonth: null,
    ChildrenOnBCPAPPerMonth: null,
    RespiratorySpecialistsAvailable: null,
    NurseToPatientRatio: "",
    units: [],
  });
  const handlePress = () => {
    setIsSubmitted(true);
    hospitalDropdownValidation.validateNow();
    if (!patient.Hospital_Id) {
      return;
    }
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    // setHospital({...hospital, year: currentDate.getFullYear()});

    console.log(
      "Last Wustion asked before assignment: " + hospital.lastQuestionAsked
    );
    // Create a new hospital object with the updated year
    const updatedHospital = { ...hospital, year: currentDate.getFullYear() };
    setHospital(updatedHospital);

    // If lastQuestionAsked is null, set lastQuestionDate to a date more than a year ago
    var lastQuestionDate = null;
    if (
      hospital.lastQuestionAsked == null ||
      hospital.lastQuestionAsked == undefined
    ) {
      lastQuestionDate = new Date(oneYearAgo.getTime() - 60 * 60 * 1000);
    } else {
      lastQuestionDate = new Date(hospital.lastQuestionAsked);
    }

    console.log(lastQuestionDate);
    if (lastQuestionDate <= oneYearAgo) {
      // If it's been a year or more since the last question was asked
      console.log("Navigate" + updatedHospital.year);
      navigation.navigate("Yearly Questions", {
        patient,
        hospital: updatedHospital,
      });
    } else {
      // If it hasn't been a year
      navigation.navigate("PatientPage1", { patient });
      console.log("Hasnt been year" + hospital);
    }
  };

  useEffect(() => {
    fetchHospitals(setHospitalOptions, setIsLoadingHospitals);
  }, [route.params?.reload]);

  useEffect(() => {
    // This code runs after hospital state changes
    console.log("use effect" + hospital.year);
  }, [hospital]); // Pass hospital as a dependency

  if (isLoadingHospitals) {
    return <Text>Loading </Text>; // Or some other placeholder
  }
  return (
    <SafeAreaView style={styles.container4}>
      <ScrollView contentContainerStyle={styles.container4}>
        <ImageBackground
          source={require("../assets/Designer.png")}
          style={styles.backgroundImage2}
        >
          <CustomProgressSteps activeStep={0}>
          </CustomProgressSteps>
          {isSubmitted && !hospitalDropdownValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: hospitalDropdownValidation.borderColor },
              { marginTop: 20 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={hospitalOptions}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select Your Hospital" : "..."}
            searchPlaceholder="Search..."
            value={hospitalDropdownValidation.value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
              hospitalDropdownValidation.handleBlur();
            }}
            onChange={(item) => {
              setPatient({ ...patient, Hospital_Id: item.value });
              setHospital({
                ...hospital,
                id: item.value,
                lastQuestionAsked: item.lastQuestionAsked,
              });
              hospitalDropdownValidation.handleChange(item.value);
              setIsFocus(false);
            }}
          />
          <Text
            style={{ color: "blue", marginTop: 20 }}
            onPress={() => navigation.navigate("QuestionScreen")}
          >
            Don't See your hostpital?{" "}
          </Text>
          <View style={styles.buttonEndContainer}>
            <Button title="Next" onPress={handlePress} />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalSelect;
