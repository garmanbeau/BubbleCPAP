import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  Text,
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
  fetchbCPAPComplications,
  fetchPatientOutcomes,
  fetchO2BlendingOptions,
  fetchPatientInterfaces,
  fetchHumidificationOptions,
  submitPatientData,
} from "../shared/api";
import { useValidation } from "../shared/validation";
import CustomProgressSteps from "../shared/CustomProgressSteps";
import Progress from "../Components/Progress";

const PatientOutcomeInfo = ({ navigation }) => {
  route = useRoute();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patient, setPatient] = useState(route.params.patient);

  const [isLoading, setIsLoading] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Next");
  const [isTextInputVisible, setTextInputVisibility] = useState(false);
  const [isTextInputVisible2, setTextInputVisibility2] = useState(false);

  const [isFocus, setIsFocus] = useState(false);
  const [isBlendingFocus, setIsBlendingFocus] = useState(false);
  const [isInterfaceFocus, setIsInterfaceFocus] = useState(false);
  const [isHumidificationFocus, setIsHumidificationFocus] = useState(false);

  // Declare a state variable to track the font loading status
  const [isFontLoaded, setFontLoaded] = useState(false);

  const [o2BlendingOptions, setO2BlendingOptions] = useState([]);
  const [patientOutcomeOptions, setPatientOutcomeOptions] = useState([]);
  const [patientInterfaceOptions, setPatientInterfaceOptions] = useState([]);
  const [bCPAPComplicationOptions, setbCPAPComplicationOptions] = useState([]);
  const [humidificationOptions, setHumidificationOptions] = useState([]);

  const [isLoadingOutcomes, setIsLoadingOutcomes] = useState(true);
  const [isLoadingComplications, setIsLoadingComplications] = useState(true);
  const [isLoadingBlendingOptions, setIsLoadingBlending] = useState(true);
  const [isLoadingInterfaceOptions, setIsLoadingInterfaceOptions] =
    useState(true);
  const [isLoadingHumidificationOptions, setIsLoadingHumidificationOptions] =
    useState(true);

  const [showComplicationError, setShowComplicationError] = useState(false);
  const [showOutcomeError, setShowOutcomeError] = useState(false);

  const BlendingValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const InterfaceValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const HumidificaitonValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const handleSubmit = async (patient) => {
    setIsLoading(true);
    setButtonTitle("Loading...");
    setIsSubmitted(true);
    BlendingValidation.validateNow();
    InterfaceValidation.validateNow();
    HumidificaitonValidation.validateNow();
    let error = false;
    if (
      (patient.PatientComplications &&
        patient.PatientComplications.length === 0) ||
      showComplicationError
    ) {
      setShowComplicationError(true);
      setTextInputVisibility2(true);
      error = true;
    }
    if (
      (patient.PatientOutcomes && patient.PatientOutcomes.length === 0) ||
      showOutcomeError
    ) {
      setShowOutcomeError(true);
      setTextInputVisibility(true);
      error = true;
    }
    //TODO: add validation so that severity must be selected if a Complication is selected
    if (
      BlendingValidation.isValid &&
      InterfaceValidation.isValid &&
      HumidificaitonValidation.isValid &&
      !error
    ) {
      try {
        await submitPatientData(patient);
        navigation.navigate("Success!");
        console.log(patient);
      } catch (error) {
        setIsLoading(false);
        setButtonTitle("Next");
        Alert.alert("Error", "There was an error submitting patient data.");
      }
    } else {
      setIsLoading(false);
      setButtonTitle("Next");
    }
  };
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
    fetchHumidificationOptions(
      setHumidificationOptions,
      setIsLoadingHumidificationOptions
    );
    fetchPatientOutcomes(setPatientOutcomeOptions, setIsLoadingOutcomes);
    fetchbCPAPComplications(
      setbCPAPComplicationOptions,
      setIsLoadingComplications
    );
    fetchO2BlendingOptions(setO2BlendingOptions, setIsLoadingBlending);
    fetchPatientInterfaces(
      setPatientInterfaceOptions,
      setIsLoadingInterfaceOptions
    );
  }, []);

  const renderBouncyCheckboxes = (array, isComplication) => {
    return array.map((item, index) => {
      const showError = isComplication
        ? showComplicationError
        : showOutcomeError;
      const setShowError = isComplication
        ? setShowComplicationError
        : setShowOutcomeError;

      return (
        <View key={index}>
          <BouncyCheckbox
            style={showError ? styles.inputError : styles.input}
            text={item.label}
            isChecked={item.value}
            textStyle={{ textDecorationLine: "none" }}
            onPress={(isChecked) => {
              // Update the value of the item in the array
              const newItems = [...array];
              newItems[index].value = isChecked;

              if (array == patientOutcomeOptions) {
                setPatient({ ...patient, PatientOutcomes: newItems });
              } else if (array == bCPAPComplicationOptions) {
                setPatient({ ...patient, PatientComplications: newItems });
              }
              // Check if any checkboxes are checked
              const anyChecked = newItems.some((item) => item.value);
              setShowError(!anyChecked);
            }}
          />
          {isComplication && item.value && (
            <Dropdown
              style={[styles.input, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Severity" : "..."}
              searchPlaceholder="Search..."
              value={item.severity}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(selectedItem) => {
                const newItems = [...array];
                newItems[index].severity = selectedItem.value;
                if (array == bCPAPComplicationOptions) {
                  setPatient({ ...patient, PatientComplications: newItems });
                }
              }}
            />
          )}
        </View>
      );
    });
  };

  const patientOutcomeView = () => {
    return (
      <View>
        <Text>Select all Outcomes that apply</Text>
        {showOutcomeError && isSubmitted && (
          <Text style={styles.error}>Must Select At Least One Item</Text>
        )}
        <View>{renderBouncyCheckboxes(patientOutcomeOptions, false)}</View>
      </View>
    );
  };

  const complicationView = () => {
    return (
      <View>
        <Text>Select all Complications that apply</Text>
        {showComplicationError && isSubmitted && (
          <Text style={styles.error}>Must Select At Least One Item</Text>
        )}
        <View>{renderBouncyCheckboxes(bCPAPComplicationOptions, true)}</View>
      </View>
    );
  };

  return isFontLoaded &&
    !isLoadingComplications &&
    !isLoadingOutcomes &&
    !isLoadingBlendingOptions &&
    !isLoadingHumidificationOptions &&
    !isLoadingInterfaceOptions ? (
    <SafeAreaView style={styles.container4}>
      <Progress completed1='outline' completed2='outline' completed3='outline' completed4='outline'/>
      <ScrollView contentContainerStyle={styles.container4}>
        <ImageBackground
          source={require("../assets/Designer.png")}
          style={styles.backgroundImage2}
        >
          <CustomProgressSteps activeStep={4}></CustomProgressSteps>
          <Text style={styles.label}>Main Method of Oxygen Blending</Text>
          {isSubmitted && !BlendingValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: BlendingValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={o2BlendingOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isBlendingFocus ? "Method of Oxygen Blending" : "..."}
            searchPlaceholder="Search..."
            //value={o2BlendSelected}
            onFocus={() => setIsBlendingFocus(true)}
            onBlur={() => {
              setIsBlendingFocus(false);
              BlendingValidation.handleBlur();
            }}
            onChange={(item) => {
              setPatient({ ...patient, MethodOfOxygenBlending: item.value });
              BlendingValidation.handleChange(item.value);
              //setO2BlendSelected(item.value);
              console.log(item.value);
              setIsBlendingFocus(false);
            }}
          />
          <Text style={styles.label}>Patient Interface Used</Text>
          {isSubmitted && !BlendingValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: InterfaceValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={patientInterfaceOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isInterfaceFocus ? "Patient Interface" : "..."}
            searchPlaceholder="Search..."
            //value={patientInterfaceSelected}
            onFocus={() => setIsInterfaceFocus(true)}
            onBlur={() => {
              setIsInterfaceFocus(false);
              InterfaceValidation.handleBlur();
            }}
            onChange={(item) => {
              // setPatientInterfaceOptions(item.value);
              setPatient({ ...patient, PatientInterface: item.value });
              InterfaceValidation.handleChange(item.value);
              console.log(item.value);
              setIsFocus(false);
            }}
          />

          <Text style={styles.label}>Method of Humification Used</Text>
          {isSubmitted && !BlendingValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: HumidificaitonValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={humidificationOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              !isHumidificationFocus ? "Method of humidification" : "..."
            }
            searchPlaceholder="Search..."
            //value={patientInterfaceSelected}
            onFocus={() => setIsHumidificationFocus(true)}
            onBlur={() => {
              setIsHumidificationFocus(false);
              HumidificaitonValidation.handleBlur();
            }}
            onChange={(item) => {
              // setPatientInterfaceOptions(item.value);
              setPatient({ ...patient, MethodOfHumidification: item.value });
              HumidificaitonValidation.handleChange(item.value);
              console.log(item.value);
              setIsFocus(false);
            }}
          />

          <TouchableOpacity
            onPress={() => setTextInputVisibility(!isTextInputVisible)}
          >
            <Text style={styles.label}>
              {" "}
              Patient Outcomes{" "}
              {isTextInputVisible ? (
                // Use a right arrow icon from Font Awesome
                <FontAwesome5 name="angle-down" size={24} color="black" />
              ) : (
                // Use a down arrow icon from Font Awesome
                <FontAwesome5 name="angle-right" size={24} color="black" />
              )}
            </Text>
          </TouchableOpacity>

          {isTextInputVisible && <View>{patientOutcomeView()}</View>}

          <TouchableOpacity
            onPress={() => setTextInputVisibility2(!isTextInputVisible2)}
          >
            <Text style={styles.label}>
              {" "}
              Did complications arise{" "}
              {isTextInputVisible2 ? (
                // Use a right arrow icon from Font Awesome
                <FontAwesome5 name="angle-down" size={24} color="black" />
              ) : (
                // Use a down arrow icon from Font Awesome
                <FontAwesome5 name="angle-right" size={24} color="black" />
              )}
            </Text>
          </TouchableOpacity>
          {isTextInputVisible2 && <View>{complicationView()}</View>}
          <View style={styles.buttonEndContainer}>
            <Button
              title={buttonTitle}
              onPress={() => handleSubmit(patient)}
              disabled={isLoading}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Text>Loading...</Text>
  );
};

export default PatientOutcomeInfo;
