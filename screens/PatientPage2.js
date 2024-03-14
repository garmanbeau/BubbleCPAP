import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  TouchableOpacity, 
  View
} from "react-native";
import Slider from "@react-native-community/slider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import styles from '../shared/styles';
import { fetchOxygenSources, fetchStartbCPAPReasons, fetchStopbCPAPReasons, fetchbCPAPTypes, fetchbCPAPUseLengths } from "../shared/api";
import * as Font from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
const TextInputExample = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  const [text2, onChangeText2] = React.useState("");
  const [text3, onChangeText3] = React.useState("");
  const [text4, onChangeText4] = React.useState("");
  
  const [isTextInputVisible, setTextInputVisibility] = useState(false);
  const [isTextInputVisible2, setTextInputVisibility2] = useState(false);

  const [isFocus, setIsFocus] = useState(false); //TODO: define different isfocus vars
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [minPressureValue, setMinPressureValue] = useState(null);
  const [maxPressureValue, setMaxPressureValue] = useState(null);
  const [oxygenSource, setOxygenSource] = useState('');
  const [bcpapUseLength, setBcpapUseLength] = useState(null);
  const [bcpapDeviceType, setBcpapDeviceType] = useState(null);
  const [startbCPAPReason, setStartbCPAPReason] = useState(null);
  const [stopbCPAPReason, setStopbCPAPReason] = useState(null);


  
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

  const data = [
    { label: "Tank/Cylinder", value: "Tank/Cylinder" },
    { label: "Wall", value: "Wall" },
    { label: "Oxygen Concentrator", value: "Oxygen Concentrator" },
    { label: "Other", value: "Other" },
  ];

  const dayData = [
    { label: "<1 day", value: "<1 day" },
    { label: "1-3 days", value: "1-3 days" },
    { label: "3-7 days", value: "3-7 days" },
    { label: ">7 days", value: ">7 days" },
  ];
//industry/commerical, homemade/who-style/ constructed, other, unknown
  const deviceData = [
    {label: "industry/commerical", value:"industry/commerical"},
    {label: "homemade/who-style/ constructed", value:"homemade/who-style/ constructed"},
    {label: "other", value:"other"},
    {label: "unknown", value:"unknown"},
  ];
  // <1 day
  //         1-3days
  //         3-7days
  //         >7days

  const renderBouncyCheckboxes = (array) => {
    return array.map((item, index) => {
      return (
        <BouncyCheckbox
          key={index}
          text={item.label}
          isChecked={item.value}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={(isChecked) => {
            // Update the value of the item in the array
            const newItems = [...array];
            newItems[index].value = isChecked;

            if ( array == startbCPAPReasonOptions){
              setStartbCPAPReason(newItems);
            } else if ( array == stopbCPAPReasonOptions){
              setStopbCPAPReason(newItems);
            }
          }}
        />
      );
    });
  };
  const startBCPAPView = () => {
    return(
      <View>
        <Text>Select all reasons that apply</Text>
        <View>{renderBouncyCheckboxes(startbCPAPReasonOptions)}</View>
      </View>
    )}

    const stopBCPAPView = () => {
      return(
        <View>
           <Text>Select all reasons that apply</Text>
            <View>{renderBouncyCheckboxes(stopbCPAPReasonOptions)}</View>
        </View>
      )
    }
  useEffect(() => {

    const loadFont = async () => {
      // Use the Font.loadAsync method and pass the font name and the font file path as an object
      await Font.loadAsync({
        'Font Awesome 5 Free': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf'),
      });
      // Update the state variable to true when the font is loaded
      setFontLoaded(true);
    };
    // Call the loadFont function
    loadFont();

    fetchbCPAPTypes(setBcpapDeviceTypeOptions, setIsBcpapTypesLoading);
    fetchOxygenSources(setOxygenSourceOptions, setIsOxygenLoading);
    fetchbCPAPUseLengths(setBcpapUseLengthOptions, setIsLengthsLoading);
    fetchStartbCPAPReasons(setStartbCPAPReasonOptions, setIsLoadingStartReasons);
    fetchStopbCPAPReasons(setStopbCPAPReasonOptions, setIsLoadingStopReasons);
  }, []);

  if (!isFontLoaded && (isBcpapTypesLoading || isOxygenLoading || isLengthsLoading ||isLoadingStartReasons || isLoadingStopReasons)) {
    return <Text>Loading </Text>; // Or some other placeholder
  }
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
        placeholder="Bubble CPAP expiratory limb size (measured in millimeters or centimeters)" //( do we want to put tubing types instead? - standard oxygen tubing, corrugated tubing, or other?)
        onChangeText={onChangeText2}
        value={text2}
      />
      {/* <Dropdown
        style={[styles.input, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={bcpapDeviceTypeOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "BCPAP device used" : "..."}
        searchPlaceholder="Search..."
        value={bcpapUseLength}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setBcpapUseLength(item.value);
          console.log(item.value);
          setIsFocus(false);
        }}
      />
      <Dropdown
        style={[styles.input, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={startbCPAPReasonOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Reason for Bubble CPAP use" : "..."}
        searchPlaceholder="Search..."
        value={startbCPAPReason}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setStartbCPAPReason(item.value);
          console.log(item.value);
          setIsFocus(false);
        }}
      /> */}
 <TouchableOpacity onPress={() => setTextInputVisibility(!isTextInputVisible)}>
      <Text style ={styles.headerText}> Patient Outcomes {' '}
          {isTextInputVisible ? (
            // Use a right arrow icon from Font Awesome
            <FontAwesome5 name="angle-down" size={24} color="black" />
          ) : (
            // Use a down arrow icon from Font Awesome
            <FontAwesome5 name="angle-right" size={24} color="black" />
          )}</Text>
     </TouchableOpacity>

        {isTextInputVisible && <View>{startBCPAPView()}</View>}
{/* <Dropdown
        style={[styles.input, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={stopbCPAPReasonOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Reason for Bubble CPAP discontinuation" : "..."}
        searchPlaceholder="Search..."
        value={stopbCPAPReason}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setStopbCPAPReason(item.value);
          console.log(item.value);
          setIsFocus(false);
        }}
      /> */}

        <TouchableOpacity onPress={() => setTextInputVisibility2(!isTextInputVisible2)}>
      <Text style={styles.headerText}> Did complications arise {' '}
      {isTextInputVisible2 ? (
            // Use a right arrow icon from Font Awesome
            <FontAwesome5 name="angle-down" size={24} color="black" />
          ) : (
            // Use a down arrow icon from Font Awesome
            <FontAwesome5 name="angle-right" size={24} color="black" />
          )}</Text>
     </TouchableOpacity>
     {isTextInputVisible2 && <View>{stopBCPAPView()}</View>}

      {/* consider For how long used - wonder if we put some parameters or if we want the actual number of days?
        <1 day
        1-3days
        3-7days
        >7days
        */}
      {/* <TextInput
        style={styles.input}
        placeholder="Duration of Bubble CPAP use (hours, days)"
        onChangeText={onChangeText5}
        value={text5}
      /> */}

      <Dropdown
        style={[styles.input, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={bcpapUseLengthOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Duration of Bubble CPAP use" : "..."}
        searchPlaceholder="Search..."
        value={bcpapDeviceType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setBcpapDeviceType(item.value);
          console.log(item.value);
          setIsFocus(false);
        }}
      />

      {/* <TextInput //(buttons would be the numbers 1 thorugh 10, and other/free text)
        style={styles.input}
        placeholder="Lowest Bubble CPAP pressure used"
        onChangeText={onChangeText6}
        value={text6}
      /> */}
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={minPressureValue}
        // Update the state variable when the slider changes
        onValueChange={(newValue) => setMinPressureValue(newValue)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text>Minimum Pressure: {minPressureValue}</Text>
      {/* <TextInput //(buttons would be the numbers 1 thorugh 10, and other/free text)
        style={styles.input}
        placeholder="Highest Bubble CPAP pressure used"
        onChangeText={onChangeText7}
        value={text7}
      /> */}
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={maxPressureValue}
        // Update the state variable when the slider changes
        onValueChange={(newValue) => setMaxPressureValue(newValue)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text>Maximum Pressure: {maxPressureValue}</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Source of oxygen" //primary source of oxygen - tank/cylinder, wall, oxygen concentrator, other
        onChangeText={onChangeText8}
        value={text8}
      /> */}

      <Dropdown
        style={[styles.input, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={oxygenSourceOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Primary Source of Oxygen" : "..."}
        searchPlaceholder="Search..."
        value={oxygenSource}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setOxygenSource(item.value);
          console.log(item.value);
          setIsFocus(false);
        }}
      />
      {oxygenSource.includes('other') && (
        // Render a textinput element if the condition is true
        <TextInput placeholder="Please specify" />
      )}
      

      <Button
        title="Next"
        onPress={() => navigation.navigate("PatientPage3")}
      />
    </SafeAreaView>
  );
};

export default TextInputExample;
