import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Text,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Dropdown } from "react-native-element-dropdown";
import styles from '../shared/styles';
import { fetchOxygenSources, fetchbCPAPTypes } from "../shared/api";
const TextInputExample = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  const [text2, onChangeText2] = React.useState("");
  const [text3, onChangeText3] = React.useState("");
  const [text4, onChangeText4] = React.useState("");

  const [minPressureValue, setMinPressureValue] = useState(null);
  const [maxPressureValue, setMaxPressureValue] = useState(null);
  const [oxygenSource, setOxygenSource] = useState('');

  const [isFocus, setIsFocus] = useState(false); //TODO: define different isfocus vars
  const [bcpapUseLength, setBcpapUseLength] = useState(null);
  const [bcpapDeviceType, setBcpapDeviceType] = useState(null);

  const [oxygenSourceOptions, setOxygenSourceOptions] = useState([]);
  const [bcpapUseLengthOptions, setBcpapUseLengthOptions] = useState([]);
  const [bcpapDeviceTypeOptions, setBcpapDeviceTypeOptions] = useState([]);

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

  const [isBcpapTypesLoading, setIsBcpapTypesLoading] = useState(true);
  const [isOxygenLoading, setIsOxygenLoading] = useState(true);

  useEffect(() => {
    fetchbCPAPTypes(setBcpapDeviceTypeOptions, setIsBcpapTypesLoading);
    fetchOxygenSources(setOxygenSourceOptions, setIsOxygenLoading);
  }, []);

  if (isBcpapTypesLoading || isOxygenLoading) {
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
      <Dropdown
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
