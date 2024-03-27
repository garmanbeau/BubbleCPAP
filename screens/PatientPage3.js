import React, {useState, useEffect} from "react";
import { View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity, Text, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Font from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../shared/styles';
import { useRoute } from "@react-navigation/native";

import { fetchbCPAPComplications, fetchPatientOutcomes, fetchO2BlendingOptions, fetchPatientInterfaces, fetchHumidificationOptions, submitPatientData } from "../shared/api";


const TextInputExample = ({ navigation }) => {
  route = useRoute();

  const [patient, setPatient] = useState(route.params.patient);

  const [isLoading, setIsLoading] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Next');

  const [text9, onChangeText9] = React.useState("");

  const [text10, onChangeText10] = React.useState("");
  const [text11, onChangeText11] = React.useState("");
  const [text12, onChangeText12] = React.useState("");
  const [text13, onChangeText13] = React.useState("");
  const [isTextInputVisible, setTextInputVisibility] = useState(false);
  const [isTextInputVisible2, setTextInputVisibility2] = useState(false);
  const [ isPneumothorax, setPneumothorax] = useState(false);

  const [isFocus, setIsFocus] = useState(false); 

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
  const [isLoadingInterfaceOptions, setIsLoadingInterfaceOptions] = useState(true);
const [isLoadingHumidificationOptions, setIsLoadingHumidificationOptions] = useState(true);

  const[o2BlendSelected, setO2BlendSelected] = useState(null);
  const[patientInterfaceSelected, setPatientInterfaceSelected] = useState(null);

const handleSubmit = async (patient) => {
    setIsLoading(true);
    setButtonTitle('Loading...');

    try {
      await submitPatientData(patient);
      navigation.navigate('Welcome');
    } catch (error) {
      setIsLoading(false);
      setButtonTitle('Next');
      Alert.alert('Error', 'There was an error submitting patient data.');
    }
  };
 // Use the useEffect hook to load the font
 useEffect(() => {
  // Define an async function to load the font
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
  fetchHumidificationOptions(setHumidificationOptions, setIsLoadingHumidificationOptions)
  fetchPatientOutcomes(setPatientOutcomeOptions, setIsLoadingOutcomes);
  fetchbCPAPComplications(setbCPAPComplicationOptions, setIsLoadingComplications);
  fetchO2BlendingOptions(setO2BlendingOptions, setIsLoadingBlending);
  fetchPatientInterfaces(setPatientInterfaceOptions, setIsLoadingInterfaceOptions);
}, []);
  
    const [outcomeItems, setOutcomeItems] = useState([
      {label: 'Discharged Home', value: false},
      {label: 'Transfered to Another Hospital', value: false},
      {label: 'Died', value: false},
      {label: 'Intubated', value: false},
    ]);

    const [complicationItems, setComplicationItems] = useState([
      {label: 'Nasal Irritation', value: false}, 
      {label: 'Nasal Septal Injury', value: false}, 
      {label: 'Abdominal Distension Requiring Decompression', value: false}, 
      {label: 'Aspiration', value: false}, 
      {label: 'Pneumothorax', value: false}, 
      {label: 'Other', value: false}, 
    ])

    //- nasal irritation, nasal septal injury, abdominal distension requiring decompression, aspiration, pneumothorax, other (can check more than one)
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

            if ( array == patientOutcomeOptions){
              // setOutcomeItems(newItems);
              setPatient({ ...patient, PatientOutcomes: newItems });
            } else if ( array == bCPAPComplicationOptions){
              // setComplicationItems(newItems);
              setPatient({ ...patient, PatientComplications: newItems });
            }
          }}
        />
      );
    });
  };

  // const patientInterfaceView = () =>{
  //   return(
  //     <View>
  //       <Text>Select all interfaces that apply</Text>
  //       <View>{renderBouncyCheckboxes()}</View>
  //     </View>
  //   )}

    const patientOutcomeView = () => {
      return(
        <View>
          <Text>Select all interfaces that apply</Text>
          <View>{renderBouncyCheckboxes(patientOutcomeOptions)}</View>
        </View>
      )}

      const complicationView = () => {
        return(
          <View>
             <Text>Select all Complications that apply</Text>
              <View>{renderBouncyCheckboxes(bCPAPComplicationOptions)}</View>
          </View>
        )
      }


  return (
    isFontLoaded && !isLoadingComplications && !isLoadingOutcomes && !isLoadingBlendingOptions && !isLoadingHumidificationOptions && !isLoadingInterfaceOptions?  (
    <SafeAreaView>
      <Dropdown
        style={[styles.input, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={o2BlendingOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Method of Oxygen Blending" : "..."}
        searchPlaceholder="Search..."
        //value={o2BlendSelected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setPatient({ ...patient, MethodOfOxygenBlending: item.value });
          //setO2BlendSelected(item.value);
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
        data={patientInterfaceOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Patient Interface" : "..."}
        searchPlaceholder="Search..."
        //value={patientInterfaceSelected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          // setPatientInterfaceOptions(item.value);
          setPatient({ ...patient, PatientInterface: item.value });

          console.log(item.value);
          setIsFocus(false);
        }}
      />
      {/* TODO: Change this to dropdown */}
      {/* <TextInput
        style={styles.input}
        placeholder="Method of humidification"
        onChangeText={(text) => {
          
        }}
        value={patient.MethodOfHumidification}
      /> */}

      <Dropdown
        style={[styles.input, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={humidificationOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Method of humidification" : "..."}
        searchPlaceholder="Search..."
        //value={patientInterfaceSelected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          // setPatientInterfaceOptions(item.value);
          setPatient({ ...patient, MethodOfHumidification: item.value });

          console.log(item.value);
          setIsFocus(false);
        }}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Patient interface (nasal, full face, seal)" //patient interface - nasal prongs, nasal mask, nose/mouth mask, scuba/full face mask
        onChangeText={onChangeText11}
        value={text11}
      /> */}


      {/* <TextInput
        style={styles.input}
        placeholder="Outcome" //discharged home, trasnfered to another hospital, died, intubated (check all that apply, as a child can be both intubated and transferred or intubated and died)
        onChangeText={onChangeText12}
        value={text12}
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

        {isTextInputVisible && <View>{patientOutcomeView()}</View>}
      {/* <TextInput
        style={styles.input}
        placeholder="Complications associated with Bubble CPAP "
        //- nasal irritation, nasal septal injury, abdominal distension requiring decompression, aspiration, pneumothorax, other (can check more than one)
        //If other - please describe
        //if pneumothorax, can you describe the context (patient severity of illness and how it was diagnosed) - free text

        onChangeText={onChangeText13}
        value={text13}
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
     {isTextInputVisible2 && <View>{complicationView()}</View>}

     {complicationItems.some(
        (item) => item.label === 'Other' && item.value === true
      ) &&  (
        // Render a textinput element if the condition is true
        <TextInput placeholder="Please specify" />
      )}
     {complicationItems.some(
        (item) => item.label === 'Pneumothorax' && item.value === true
      ) &&  (
        // Render a textinput element if the condition is true
        <TextInput placeholder="Please Describe Patient Severity of illness and hot it was diagnosed." />
      )}
      <Button
      title={buttonTitle}
      onPress={() => handleSubmit(patient)}
      disabled={isLoading}
    />
    </SafeAreaView>) : <Text>Loading...</Text>
  );
};

export default TextInputExample;
