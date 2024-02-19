import React, { useState }from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const YearlyQuestion = ({navigation}) => {
    const [numOfUnitsAtHostpital, onChangeText] = React.useState('');
    const [numOfPedAdPerMonth, onChangeText2] = React.useState('');
    const [numOfPedAdReqBCPAPPerMonth, onChangeText3] = React.useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Pediatric', value: '1' },
        { label: 'NeoNatal', value: '2' },
        { label: 'Cardiac ICU', value: '3' },
      ];
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
      />
      <TextInput
        style={styles.input}
        placeholder='# of pediatric admissions for respitory illnesses per month' //add approximate to questions and make numeric 
        onChangeText={onChangeText2}
        value={numOfPedAdPerMonth}
      />
      <TextInput
        style={styles.input}
        placeholder='# of pediatric admissions requireing bCPAP per month' //change to How many children placed on bCPAP per month  (approximate)- number only
        onChangeText={onChangeText3}
        value={numOfPedAdReqBCPAPPerMonth}
      />
      <Dropdown //make multi select drop down??
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
        />
<TextInput
        style={styles.input}
        placeholder='# of respiratory specialists available' // make numeric
        onChangeText={onChangeText3}
        value={numOfPedAdReqBCPAPPerMonth}
      />

      {/* 
        Add Usual nurse to patient ratio when on BCPAP - 1:1, 1:2, 1:3: 1:4, 1:5, >1:
      */}

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