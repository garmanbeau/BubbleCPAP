import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

export default function App({navigation}) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [numOfUnitsAtHostpital, onChangeText] = React.useState('');
    const [numOfPedAdPerMonth, onChangeText2] = React.useState('');
    const [numOfPedAdReqBCPAPPerMonth, onChangeText3] = React.useState('');

    const data = [
      { label: 'Mayo Clinic | Rochester', value: '1' },
      { label: 'Abbott Northwestern Hospital | Minneapolis', value: '2' },
      { label: 'CentraCare-St. Cloud Hospital | St. Cloud', value: '3' },
      { label: 'Park Nicollet Methodist Hospital | St. Louis Park', value: '4' },
      { label: 'Essentia Health-St. Mary’s Medical Center | Duluth', value: '5' },
      { label: 'M Health Fairview Southdale Hospital | Edina', value: '6' },
      { label: 'United Hospital | St. Paul', value: '7' },
      { label: 'Mercy Hospital | Coon Rapids', value: '8' },
    ];

  return (
    <View style={styles.container3}>
      <TextInput
        style={styles.input}
        placeholder='Patient Age'
        onChangeText={onChangeText}
        value={numOfUnitsAtHostpital}
      />
      <TextInput
        style={styles.input}
        placeholder='Patient sex'
        onChangeText={onChangeText2}
        value={numOfPedAdPerMonth}
      />
      <TextInput
        style={styles.input}
        placeholder='Duration'
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
        placeholder={!isFocus ? 'Hospital Name' : '...'}
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
        placeholder='Outcome'
        onChangeText={onChangeText3}
        value={numOfPedAdReqBCPAPPerMonth}
      />
      <Button 
      title="Search"
      onPress={() => navigation.navigate("Results")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  
});