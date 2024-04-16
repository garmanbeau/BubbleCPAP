import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Font from "expo-font";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../shared/styles";
import { useRoute } from "@react-navigation/native";
import {
  fetchNursePatientRatios,
  fetchHospitalAreas,
  addHospitalData,
} from "../shared/api";
import { useValidation } from "../shared/validation";

const YearlyQuestion = ({ navigation }) => {
  route = useRoute();
  const [showCheckboxError, setShowCheckboxError] = useState(true);
  const [patient, setPatient] = useState(route.params.patient);
  const [hospital, setHospital] = useState(route.params.hospital);

  const [isLoading, setIsLoading] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Next");
  const [isTextInputVisible, setTextInputVisibility] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

  const [hospitals, setHospitals] = useState([]);
  const [nursePatientRatio, setNursePatientRatio] = useState([]);

  const [isHospitalsLoading, setIsHospitalsLoading] = useState(true);
  const [isRatiosLoading, setIsRatiosLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const BCPAPUnitsAvailableValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const PediatricAdmissionsPerMonthValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const ChildrenOnBCPAPPerMonthValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const RespiratorySpecialistsAvailableValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const NurseToPatientRatioValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );

  const renderBouncyCheckboxes = () => {
    return hospitals.map((item, index) => {
      return (
        <BouncyCheckbox
          key={index}
          style={showCheckboxError ? styles.inputError : styles.input} // Use a different style when showCheckboxError is true
          text={item.label}
          isChecked={item.value}
          textStyle={{ textDecorationLine: "none" }}
          onPress={(isChecked) => {
            // Update the value of the item in the array
            const newItems = [...hospitals];
            newItems[index].value = isChecked;
            setHospital({ ...hospital, units: newItems });

            // Check if any checkboxes are checked
            const anyChecked = newItems.some((item) => item.value);
            setShowCheckboxError(!anyChecked);
          }}
        />
      );
    });
  };

  const hospitalsWhereBCPAPAreUsedView = () => {
    return (
      <View>
        <Text>Please Select All Areas Where BCPAP is Used in the Hospital</Text>
        {showCheckboxError && isSubmitted && (
          <Text style={styles.error}>Must Select At Least One Item</Text>
        )}
        <View>{renderBouncyCheckboxes()}</View>
      </View>
    );
  };

  const handleSubmit = async (hospital) => {
    setIsLoading(true);
    setButtonTitle("Loading...");
    setIsSubmitted(true);
    BCPAPUnitsAvailableValidation.validateNow();
    PediatricAdmissionsPerMonthValidation.validateNow();
    ChildrenOnBCPAPPerMonthValidation.validateNow();
    RespiratorySpecialistsAvailableValidation.validateNow();
    NurseToPatientRatioValidation.validateNow();
    console.log(showCheckboxError);
    if (showCheckboxError) {
      setTextInputVisibility(true);
    }
    if (
      BCPAPUnitsAvailableValidation.isValid &&
      PediatricAdmissionsPerMonthValidation.isValid &&
      ChildrenOnBCPAPPerMonthValidation.isValid &&
      RespiratorySpecialistsAvailableValidation.isValid &&
      NurseToPatientRatioValidation.isValid
    ) {
      console.log(hospital);
      try {
        await addHospitalData(hospital);
        navigation.navigate("PatientPage1", { patient });
      } catch (error) {
        setIsLoading(false);
        setButtonTitle("Next");
        Alert.alert("Error", "There was an error submitting patient data.");
      }
    }
    console.log(hospital);
    setIsLoading(false);
    setButtonTitle("Next");
  };
  // Declare a state variable to track the font loading status
  const [isFontLoaded, setFontLoaded] = useState(false);

  // Use the useEffect hook to load the font
  useEffect(() => {
    // Define an async function to load the font
    const loadFont = async () => {
      // Use the Font.loadAsync method and pass the font name and the font file path as an object
      await Font.loadAsync({
        "Font Awesome 5 Free": require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf"),
      });
      // Update the state variable to true when the font is loaded
      setFontLoaded(true);
    };

    // Call the loadFont function
    loadFont();
    // getAreas();
    fetchHospitalAreas(setHospitals, setIsHospitalsLoading);
    fetchNursePatientRatios(setNursePatientRatio, setIsRatiosLoading);
  }, []);

  if (isHospitalsLoading && isRatiosLoading && !isFontLoaded) {
    return <Text>Loading </Text>; // Or some other placeholder
  }

  return (
    <SafeAreaView style={styles.container4}>
      <ScrollView contentContainerStyle={styles.container4}>
        <ImageBackground
          source={require("../assets/Designer.png")}
          style={styles.backgroundImage2}
        >
          <View>
            <Text style={styles.label}>
              Number of BCPAP Units Available at Hospital
            </Text>
            <View style={styles.fieldContainer}>
              {!BCPAPUnitsAvailableValidation.isValid && isSubmitted && (
                <Text style={styles.error}>Must fill item</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  { borderColor: BCPAPUnitsAvailableValidation.borderColor },
                ]}
                placeholder="# of BCPAP Units Available at Hospital" //make numeric
                keyboardType="numeric"
                onChangeText={(text) => {
                  BCPAPUnitsAvailableValidation.handleChange(text);
                  setHospital({ ...hospital, BCPAPUnitsAvailable: text });
                }}
                onBlur={BCPAPUnitsAvailableValidation.handleBlur}
                value={BCPAPUnitsAvailableValidation.value}
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>
              Number of Pediatric Admissions for Respitory Illnesses per Month
            </Text>
            <View style={styles.fieldContainer}>
              {!PediatricAdmissionsPerMonthValidation.isValid &&
                isSubmitted && <Text style={styles.error}>Must fill item</Text>}

              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor:
                      PediatricAdmissionsPerMonthValidation.borderColor,
                  },
                ]}
                placeholder="# of pediatric admissions for respitory illnesses per month" //add approximate to questions and make numeric
                keyboardType="numeric"
                onChangeText={(text) => {
                  PediatricAdmissionsPerMonthValidation.handleChange(text);
                  setHospital({
                    ...hospital,
                    PediatricAdmissionsPerMonth: text,
                  });
                }}
                onBlur={PediatricAdmissionsPerMonthValidation.handleBlur}
                value={PediatricAdmissionsPerMonthValidation.value}
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>
              Number of Children Placed on BCPAP per Month
            </Text>
            <View style={styles.fieldContainer}>
              {!PediatricAdmissionsPerMonthValidation.isValid &&
                isSubmitted && <Text style={styles.error}>Must fill item</Text>}
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: ChildrenOnBCPAPPerMonthValidation.borderColor,
                  },
                ]}
                placeholder="Approximate # of how many children are placed on bCPAP per month" //change to How many children placed on bCPAP per month  (approximate)- number only
                keyboardType="numeric"
                onChangeText={(text) => {
                  ChildrenOnBCPAPPerMonthValidation.handleChange(text);
                  setHospital({ ...hospital, ChildrenOnBCPAPPerMonth: text });
                }}
                onBlur={ChildrenOnBCPAPPerMonthValidation.handleBlur}
                value={ChildrenOnBCPAPPerMonthValidation.value}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setTextInputVisibility(!isTextInputVisible)}
          >
            <Text style={styles.label}>
              {" "}
              Units that use BCPAP{" "}
              {isTextInputVisible ? (
                // Use a right arrow icon from Font Awesome
                <FontAwesome5 name="angle-down" size={24} color="black" />
              ) : (
                // Use a down arrow icon from Font Awesome
                <FontAwesome5 name="angle-right" size={24} color="black" />
              )}
            </Text>
          </TouchableOpacity>
          {isTextInputVisible && (
            <View>{hospitalsWhereBCPAPAreUsedView()}</View>
          )}

          <View>
            <Text style={styles.label}>
              Number of Respitory Specialists Available
            </Text>
            <View style={styles.fieldContainer}>
              {!RespiratorySpecialistsAvailableValidation.isValid &&
                isSubmitted && <Text style={styles.error}>Must fill item</Text>}
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor:
                      RespiratorySpecialistsAvailableValidation.borderColor,
                  },
                ]}
                placeholder="# of respiratory specialists available" // make numeric
                keyboardType="numeric"
                onChangeText={(text) => {
                  RespiratorySpecialistsAvailableValidation.handleChange(text);
                  setHospital({
                    ...hospital,
                    RespiratorySpecialistsAvailable: text,
                  });
                }}
                onBlur={RespiratorySpecialistsAvailableValidation.handleBlur}
                value={RespiratorySpecialistsAvailableValidation.value}
              />
            </View>
          </View>

          {isSubmitted && !NurseToPatientRatioValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: NurseToPatientRatioValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={nursePatientRatio}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Usual Nurse to Patient Ratio" : "..."}
            value={NurseToPatientRatioValidation.value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
              NurseToPatientRatioValidation.handleBlur();
            }}
            onChange={(item) => {
              setHospital({ ...hospital, NurseToPatientRatio: item.value });
              NurseToPatientRatioValidation.handleChange(item.value);
              setIsFocus(false);
            }}
          />
          <View style={styles.buttonEndContainer}>
            <Button
              title={buttonTitle}
              onPress={() => handleSubmit(hospital)}
              disabled={isLoading}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YearlyQuestion;
