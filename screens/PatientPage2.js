import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import Slider from "@react-native-community/slider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../shared/styles";
import {
  fetchOxygenSources,
  fetchStartbCPAPReasons,
  fetchStopbCPAPReasons,
  fetchbCPAPTypes,
  fetchbCPAPUseLengths,
} from "../shared/api";
import * as Font from "expo-font";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useValidation } from "../shared/validation";
import CustomProgressSteps from "../shared/CustomProgressSteps";
const PatientTreatmentInfo = ({ navigation }) => {
  route = useRoute();

  const [patient, setPatient] = useState(route.params.patient);

  const [isTextInputVisible, setTextInputVisibility] = useState(false);
  const [isTextInputVisible2, setTextInputVisibility2] = useState(false);

  const [isDeviceFocus, setIsDeviceFocus] = useState(false); //TODO: define different isfocus vars
  const [isDurationFocus, setIsDurationFocus] = useState(false); //TODO: define different isfocus vars
  const [isOxygenFocus, setIsOxygenFocus] = useState(false); //TODO: define different isfocus vars

  const [isDeviceOtherSelected, setDeviceOtherSelected] = useState(false);
  const [isOxygenOtherSelected, setOxygenOtherSelected] = useState(false);


  const [isFontLoaded, setFontLoaded] = useState(false);
  const [minPressureValue, setMinPressureValue] = useState(0);
  const [maxPressureValue, setMaxPressureValue] = useState(0);

  const [oxygenSourceOptions, setOxygenSourceOptions] = useState([]);
  const [bcpapUseLengthOptions, setBcpapUseLengthOptions] = useState([]);
  const [bcpapDeviceTypeOptions, setBcpapDeviceTypeOptions] = useState([]);
  const [startbCPAPReasonOptions, setStartbCPAPReasonOptions] = useState([]);
  const [stopbCPAPReasonOptions, setStopbCPAPReasonOptions] = useState([]);

  const [isLoadingStartReasons, setIsLoadingStartReasons] = useState(true);
  const [isLoadingStopReasons, setIsLoadingStopReasons] = useState(true);
  const [isBcpapTypesLoading, setIsBcpapTypesLoading] = useState(true);
  const [isOxygenLoading, setIsOxygenLoading] = useState(true);
  const [isLengthsLoading, setIsLengthsLoading] = useState(true);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showStartbCPAPReasonError, setShowStartbCPAPReasonError] =
    useState(false);
  const [showStopbCPAPReasonError, setShowStopbCPAPReasonError] =
    useState(false);

  const [pressureError, setPressureError] = useState(false);

  const HistoryValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );

  const LimbSizeValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );

  const DeviceValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );

  const DurationValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );

  const OxygenValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );

  const OtherDeviceValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const OtherOxygenValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );

  const validatePressures = () => {
    if (maxPressureValue < minPressureValue) {
      setPressureError(true);
    } else {
      setPressureError(false);
    }
  };

  const renderBouncyCheckboxes = (array, checkboxType) => {
    // Define your error states

    return array.map((item, index) => {
      // Determine which error state to use
      const showError =
        checkboxType === "start"
          ? showStartbCPAPReasonError
          : showStopbCPAPReasonError;
      const setShowError =
        checkboxType === "start"
          ? setShowStartbCPAPReasonError
          : setShowStopbCPAPReasonError;

      return (
        <BouncyCheckbox
          key={index}
          style={showError ? styles.inputError : styles.input} // Use a different style when showError is true
          text={item.label}
          isChecked={item.value}
          textStyle={{ textDecorationLine: "none" }}
          onPress={(isChecked) => {
            // Update the value of the item in the array
            const newItems = [...array];
            newItems[index].value = isChecked;

            if (checkboxType === "start") {
              setPatient({ ...patient, StartBCPAPReasons: newItems });
            } else if (checkboxType === "stop") {
              setPatient({ ...patient, StopBCPAPReasons: newItems });
            }

            // Check if any checkboxes are checked
            const anyChecked = newItems.some((item) => item.value);
            setShowError(!anyChecked);
          }}
        />
      );
    });
  };

  const handleNext = (patient) => {
    setIsSubmitted(true);
    validatePressures();
    DeviceValidation.validateNow();
    OxygenValidation.validateNow();
    HistoryValidation.validateNow();
    LimbSizeValidation.validateNow();
    DurationValidation.validateNow();
    OtherDeviceValidation.validateNow();
    OtherOxygenValidation.validateNow();

    if (
      (patient.StartBCPAPReasons && patient.StartBCPAPReasons.length === 0) ||
      showStartbCPAPReasonError
    ) {
      setShowStartbCPAPReasonError(true);
      setTextInputVisibility(true);
    }

    if (
      (patient.StopBCPAPReasons && patient.StopBCPAPReasons.length === 0) ||
      showStopbCPAPReasonError
    ) {
      setShowStopbCPAPReasonError(true);
      setTextInputVisibility2(true);
    }
    console.log(pressureError);
    if (
      DeviceValidation.isValid &&
      OxygenValidation.isValid &&
      HistoryValidation.isValid &&
      LimbSizeValidation.isValid &&
      DurationValidation.isValid &&
      !showStartbCPAPReasonError &&
      !showStopbCPAPReasonError &&
      !pressureError&&
      (!isDeviceOtherSelected || (isDeviceOtherSelected && OtherDeviceValidation.isValid)) &&
      (!isOxygenOtherSelected || (isOxygenOtherSelected && OtherOxygenValidation.isValid))
    ) {
      navigation.navigate("PatientPage3", { patient });
    }
  };
  const startBCPAPView = () => {
    return (
      <View>
        <Text>Select all reasons that apply</Text>
        {showStartbCPAPReasonError && isSubmitted && (
          <Text style={styles.error}>Must Select At Least One Item</Text>
        )}
        <View>{renderBouncyCheckboxes(startbCPAPReasonOptions, "start")}</View>
      </View>
    );
  };

  const stopBCPAPView = () => {
    return (
      <View>
        <Text>Select all reasons that apply</Text>
        {showStopbCPAPReasonError && isSubmitted && (
          <Text style={styles.error}>Must Select At Least One Item</Text>
        )}
        <View>{renderBouncyCheckboxes(stopbCPAPReasonOptions, "stop")}</View>
      </View>
    );
  };
  useEffect(() => {
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

    fetchbCPAPTypes(setBcpapDeviceTypeOptions, setIsBcpapTypesLoading);
    fetchOxygenSources(setOxygenSourceOptions, setIsOxygenLoading);
    fetchbCPAPUseLengths(setBcpapUseLengthOptions, setIsLengthsLoading);
    fetchStartbCPAPReasons(
      setStartbCPAPReasonOptions,
      setIsLoadingStartReasons
    );
    fetchStopbCPAPReasons(setStopbCPAPReasonOptions, setIsLoadingStopReasons);
  }, []);

  if (
    !isFontLoaded &&
    (isBcpapTypesLoading ||
      isOxygenLoading ||
      isLengthsLoading ||
      isLoadingStartReasons ||
      isLoadingStopReasons)
  ) {
    return <Text>Loading </Text>; // Or some other placeholder
  }
  return (
    <SafeAreaView style={styles.container4}>
      <ScrollView contentContainerStyle={styles.container4}>
        <ImageBackground
          source={require("../assets/Designer.png")}
          style={styles.backgroundImage2}
        >
          <CustomProgressSteps activeStep={3}></CustomProgressSteps>
          <View>
            <Text style={styles.label}>
              Prior Medical History of Chronic Disease
            </Text>
            <View style={styles.fieldContainer}>
              {!HistoryValidation.isValid && isSubmitted && (
                <Text style={styles.error}>Must fill item</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: HistoryValidation.borderColor,
                  },
                ]}
                onChangeText={(text) => {
                  setPatient({ ...patient, MedicalHistory: text });
                  HistoryValidation.handleChange(text);
                }}
                value={patient.MedicalHistory}
                placeholder="Prior medical history of chronic disease"
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>
              Bubble CPAP Expiratory Limb Size (in mm)
            </Text>
            <View style={styles.fieldContainer}>
              {!LimbSizeValidation.isValid && isSubmitted && (
                <Text style={styles.error}>Must fill item</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: LimbSizeValidation.borderColor,
                  },
                ]}
                onChangeText={(text) => {
                  setPatient({
                    ...patient,
                    BubbleCPAPExpiratoryLimbSizeMM: text,
                  });
                  LimbSizeValidation.handleChange(text);
                }}
                value={patient.BubbleCPAPExpiratoryLimbSizeMM}
                placeholder="Bubble CPAP expiratory limb size (measured in millimeters)" //( do we want to put tubing types instead? - standard oxygen tubing, corrugated tubing, or other?)
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.label}>BCPAP Device Type Used</Text>
          {isSubmitted && !DeviceValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: DeviceValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={bcpapDeviceTypeOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isDeviceFocus ? "BCPAP device used" : "..."}
            searchPlaceholder="Search..."
            //value={bcpapUseLength}
            onFocus={() => setIsDeviceFocus(true)}
            onBlur={() => {
              setIsDeviceFocus(false);
              DeviceValidation.handleBlur();
            }}
            onChange={(item) => {
              setPatient({ ...patient, BCPAPTypeDeviceUsed: item.value });
              DeviceValidation.handleChange(item.value);
              setDeviceOtherSelected(item.value ==="Other");
              console.log(item.value);
              setIsDeviceFocus(false);
            }}
          />
          {isDeviceOtherSelected && (
  <View>
  <Text style={styles.label}>Please Specify Device Type</Text>
  <View style={styles.fieldContainer}>
    {!OtherDeviceValidation.isValid && isSubmitted && (
      <Text style={styles.error}>Must fill item</Text>
    )}
    <TextInput
      style={[
        styles.input,
        {
          borderColor: OtherDeviceValidation.borderColor,
        },
      ]}
      onChangeText={(text) => {
        setPatient({ ...patient, BCPAPTypeDeviceUsed: text });
        OtherDeviceValidation.handleChange(text);
      }}
      placeholder="Specify DeviceType"
    />
  </View>
</View>
)}
          <TouchableOpacity
            onPress={() => setTextInputVisibility(!isTextInputVisible)}
          >
            <Text style={styles.label}>
              {" "}
              Reasons to Start BCPAP{" "}
              {isTextInputVisible ? (
                // Use a right arrow icon from Font Awesome
                <FontAwesome5 name="angle-down" size={24} color="black" />
              ) : (
                // Use a down arrow icon from Font Awesome
                <FontAwesome5 name="angle-right" size={24} color="black" />
              )}
            </Text>
          </TouchableOpacity>

          {isTextInputVisible && <View>{startBCPAPView()}</View>}

          <TouchableOpacity
            onPress={() => setTextInputVisibility2(!isTextInputVisible2)}
          >
            <Text style={styles.label}>
              {" "}
              Reasons to Stop BCPAP{" "}
              {isTextInputVisible2 ? (
                // Use a right arrow icon from Font Awesome
                <FontAwesome5 name="angle-down" size={24} color="black" />
              ) : (
                // Use a down arrow icon from Font Awesome
                <FontAwesome5 name="angle-right" size={24} color="black" />
              )}
            </Text>
          </TouchableOpacity>
          {isTextInputVisible2 && <View>{stopBCPAPView()}</View>}

          <Text style={styles.label}>Duration of BCPAP Use</Text>
          {isSubmitted && !DurationValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}

          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: DurationValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={bcpapUseLengthOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              !isDurationFocus ? "Duration of Bubble CPAP use" : "..."
            }
            searchPlaceholder="Search..."
            //value={bcpapDeviceType}
            onFocus={() => setIsDurationFocus(true)}
            onBlur={() => {
              setIsDurationFocus(false);
              DurationValidation.handleBlur();
            }}
            onChange={(item) => {
              //setBcpapDeviceType(item.value);
              setPatient({ ...patient, DurationOfBubbleCPAPUse: item.value });
              DurationValidation.handleChange(item.value);
              console.log(item.value);
              setIsDurationFocus(false);
            }}
          />

          <Text style={styles.label}>Minimum Pressure</Text>
          <Text>Minimum Pressure: {minPressureValue}</Text>
          {pressureError && isSubmitted && (
            <Text style={styles.error}>
              Minimum Pressure Must Be Less than Maximum Pressure
            </Text>
          )}
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={minPressureValue}
            // Update the state variable when the slider changes
            onValueChange={(newValue) => {
              setPatient({ ...patient, MinPressure: newValue });
              setMinPressureValue(newValue);
              validatePressures();
            }}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />

          <Text style={styles.label}>Maximum Pressure</Text>
          <Text>Maximum Pressure: {maxPressureValue}</Text>
          {pressureError && isSubmitted && (
            <Text style={styles.error}>
              Minimum Pressure Must Be Less than Maximum Pressure
            </Text>
          )}
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={15}
            step={1}
            value={maxPressureValue}
            // Update the state variable when the slider changes
            onValueChange={(newValue) => {
              setPatient({ ...patient, MaxPressure: newValue });
              setMaxPressureValue(newValue);
              validatePressures();
            }}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />

          <Text style={styles.label}>Primary Source of Oxygen</Text>
          {isSubmitted && !OxygenValidation.isValid && (
            <Text style={{ color: "red" }}>You must select an item</Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: OxygenValidation.borderColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={oxygenSourceOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isOxygenFocus ? "Primary Source of Oxygen" : "..."}
            searchPlaceholder="Search..."
            //value={oxygenSource}
            onFocus={() => setIsOxygenFocus(true)}
            onBlur={() => {
              setIsOxygenFocus(false);
              OxygenValidation.handleBlur();
            }}
            onChange={(item) => {
              // setOxygenSource(item.value);
              setPatient({ ...patient, PrimarySourceOfOxygen: item.value });
              OxygenValidation.handleChange(item.value);
              setOxygenOtherSelected(item.value ==="Other");
              console.log(item.value);
              setIsOxygenFocus(false);
            }}
          />

{isOxygenOtherSelected && (
  <View>
  <Text style={styles.label}>Please Specify Source of Oxygen</Text>
  <View style={styles.fieldContainer}>
    {!OtherOxygenValidation.isValid && isSubmitted && (
      <Text style={styles.error}>Must fill item</Text>
    )}
    <TextInput
      style={[
        styles.input,
        {
          borderColor: OtherOxygenValidation.borderColor,
        },
      ]}
      onChangeText={(text) => {
        setPatient({ ...patient, PrimarySourceOfOxygen: text });
        OtherOxygenValidation.handleChange(text);
      }}
      placeholder="Specify Oxygen Source"
    />
  </View>
</View>
)}

          <Button title="Next" onPress={() => handleNext(patient)} />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientTreatmentInfo;
