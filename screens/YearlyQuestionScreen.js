import React, { useState }from 'react';
import {Text, View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";



const YearlyQuestion = ({navigation}) => {
  const [isTextInputVisible, setTextInputVisibility] = useState(false);

    const [numOfUnitsAtHostpital, onChangeText] = React.useState('');
    const [numOfPedAdPerMonth, onChangeText2] = React.useState('');
    const [numOfPedAdReqBCPAPPerMonth, onChangeText3] = React.useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [isChecked, setChecked] = useState(false);
    const [items, setItems] = useState([
        { label: 'Pediatric Intensive Care Unit (PICU)', value: '1' },
        { label: 'NeoNatal Intesive Care Unit (NICU)', value: '2' },
        { label: 'Cardiac Intesive Care Unit (CICU)', value: '3' },
        { label: 'Emergency Department', value: '4' },
        { label: 'Inpatient Pediatric Ward', value: '5' },
        { label: 'Inpatient General Ward (adults and kids)', value: '6' },
        { label: 'Inpatient General ICU (adults and kids)', value: '7' },
        { label: 'Acute Care Unit (ACU)', value: '8' },
        { label: 'Emergency Pediatric Unit (EPU)', value: '9' },
      ]);

    const nurseToPatientData = [
        {label: '1:1', value: '1'}, 
        {label: '1:2', value: '2'}, 
        {label: '1:3', value: '3'}, 
        {label: '1:4', value: '4'}, 
        {label: '1:5', value: '5'}, 
        {label: '>1:1', value: '6'}, 
    ];

    const renderBouncyCheckboxes = () => {
      return items.map((item, index) => {
        return (
          <BouncyCheckbox
            key={index}
            text={item.label}
            isChecked={false}
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
        <Text>Do you agree to the terms and conditions?</Text>
        <View>{renderBouncyCheckboxes()}</View>
      </View>)
    };
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
      <Text> Units that use BCPAP \/</Text>
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default YearlyQuestion;