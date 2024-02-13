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

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder='# of bCPAP Units available at hostpital'
        onChangeText={onChangeText}
        value={numOfUnitsAtHostpital}
      />
      <TextInput
        style={styles.input}
        placeholder='# of pediatric admissions for respitory illnesses per month'
        onChangeText={onChangeText2}
        value={numOfPedAdPerMonth}
      />
      <TextInput
        style={styles.input}
        placeholder='# of pediatric admissions requireing bCPAP per month'
        onChangeText={onChangeText3}
        value={numOfPedAdReqBCPAPPerMonth}
      />
      <Dropdown
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
        placeholder='# of respiratory specialists available'
        onChangeText={onChangeText3}
        value={numOfPedAdReqBCPAPPerMonth}
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