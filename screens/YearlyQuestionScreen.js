import React, { useState, useEffect }from 'react';
import {Text, View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Font from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../shared/styles';
import axios from 'axios';
import { fetchData } from '../shared/api';

const YearlyQuestion = ({navigation}) => {
  const [isTextInputVisible, setTextInputVisibility] = useState(false);

    const [numOfUnitsAtHostpital, onChangeText] = React.useState('');
    const [numOfPedAdPerMonth, onChangeText2] = React.useState('');
    const [numOfPedAdReqBCPAPPerMonth, onChangeText3] = React.useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [isChecked, setChecked] = useState(false);
    const [itemz, setItemz] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([
        { label: 'Pediatric Intensive Care Unit (PICU)', value: false },
        { label: 'NeoNatal Intesive Care Unit (NICU)', value: false },
        { label: 'Cardiac Intesive Care Unit (CICU)', value: false },
        { label: 'Emergency Department', value: false },
        { label: 'Inpatient Pediatric Ward', value: false },
        { label: 'Inpatient General Ward (adults and kids)', value: false },
        { label: 'Inpatient General ICU (adults and kids)', value: false },
        { label: 'Acute Care Unit (ACU)', value: false },
        { label: 'Emergency Pediatric Unit (EPU)', value: false },
      ]);

    const nurseToPatientData = [
        {label: '1:1', value: '1'}, 
        {label: '1:2', value: '2'}, 
        {label: '1:3', value: '3'}, 
        {label: '1:4', value: '4'}, 
        {label: '1:5', value: '5'}, 
        {label: '>1:5', value: '6'}, 
    ];

    const renderBouncyCheckboxes = () => {
      return items.map((item, index) => {
        return (
          <BouncyCheckbox
            key={index}
            text={item.label}
            isChecked={item.value}
            textStyle={{ textDecorationLine: 'none' }}
            onPress={(isChecked) => {
              // Update the value of the item in the array
              const newItems = [...items];
              newItems[index].value = isChecked;
              setItems(newItems);
            }}
          />
        );
      });
    };
    const hospitalsWhereBCPAPAreUsedView = () =>{
      return(
      <View>
        <Text>Please select all areas where BCPAP is used in your hospital?</Text>
        <View>{renderBouncyCheckboxes()}</View>
      </View>)
    };
    function getAreas(){
      axios.get('http://192.168.1.128:3000/api/hosp-areas')
      .then((response) => {
        // Transform the response data into the format { label: '...', value: false }
        const hospAreas = response.data.map(area => ({ label: area.name, value: false }));
        setItemz(hospAreas);
        setIsLoading(false);
        console.log(itemz);
      })
      .catch(error => {
        console.error('Error fetching hosp areas', error);
      });

    }

    // Declare a state variable to track the font loading status
 const [isFontLoaded, setFontLoaded] = useState(false);

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
  // getAreas();
fetchData(setItemz, setIsLoading);

}, []);

if (isLoading) {
  return <Text>Loading </Text>; // Or some other placeholder
}
      /*hosp units where BCPAP is used: Which hosp areas bCPAP is used in - PICU, NICU, CICU, 
      emergency department, inpatient pediatric ward, inpatient general ward (adults and kids), 
      inpatient general ICU (adults and kids). Acute care unit (ACU), emergency pediatric unit (EPU) */
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder='# of bCPAP Units available at hostpital' //make numeric
        onChangeText={onChangeText}
        value={numOfUnitsAtHostpital}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder='Approximate # of pediatric admissions for respitory illnesses per month' //add approximate to questions and make numeric 
        onChangeText={onChangeText2}
        value={numOfPedAdPerMonth}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder='Approximate # of how many children are placed on bCPAP per month' //change to How many children placed on bCPAP per month  (approximate)- number only
        onChangeText={onChangeText3}
        value={numOfPedAdReqBCPAPPerMonth}
        keyboardType="numeric"
      />
     <TouchableOpacity onPress={() => setTextInputVisibility(!isTextInputVisible)}>
      <Text style={styles.headerText}> Units that use BCPAP {' '}
          {isTextInputVisible ? (
            // Use a right arrow icon from Font Awesome
            <FontAwesome5 name="angle-down" size={24} color="black" />
          ) : (
            // Use a down arrow icon from Font Awesome
            <FontAwesome5 name="angle-right" size={24} color="black" />
          )}</Text>
     </TouchableOpacity>
     {isTextInputVisible && <View>{hospitalsWhereBCPAPAreUsedView()}</View>}
      
      {/* <Dropdown //make multi select drop down??
        style={[styles.input, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Hospital Units where bCPAP is used' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        /> */}
<TextInput
        style={styles.input}
        placeholder='# of respiratory specialists available' // make numeric
        onChangeText={onChangeText3}
        value={numOfPedAdReqBCPAPPerMonth}
        keyboardType="numeric"
      />

      {/* 
        Add Usual nurse to patient ratio when on BCPAP - 1:1, 1:2, 1:3: 1:4, 1:5, >1:5
      */}
<Dropdown //make multi select drop down??
        style={[styles.input, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={nurseToPatientData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Usual Nurse to Patient Ratio' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          console.log(item.value);
          console.log(value)
          setIsFocus(false);
        }}
        />
      <Button title="Next"
        onPress={() => navigation.navigate("PatientPage1")}/>
    </SafeAreaView>
  );
};

export default YearlyQuestion;