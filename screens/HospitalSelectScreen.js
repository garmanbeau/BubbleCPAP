import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Select hospital screen</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from '../shared/styles';
import { fetchHospitals } from '../shared/api';

//import AntDesign from '@expo/vector-icons/AntDesign';

// const data = [
//   { label: 'Mayo Clinic | Rochester', value: '1' },
//   { label: 'Abbott Northwestern Hospital | Minneapolis', value: '2' },
//   { label: 'CentraCare-St. Cloud Hospital | St. Cloud', value: '3' },
//   { label: 'Park Nicollet Methodist Hospital | St. Louis Park', value: '4' },
//   { label: 'Essentia Health-St. Mary’s Medical Center | Duluth', value: '5' },
//   { label: 'M Health Fairview Southdale Hospital | Edina', value: '6' },
//   { label: 'United Hospital | St. Paul', value: '7' },
//   { label: 'Mercy Hospital | Coon Rapids', value: '8' },
// ];


const DropdownComponent = ({ navigation }) => {
  const route = useRoute();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [hospitalOptions, setHospitalOptions] = useState([]);
    const [isLoadingHospitals, setIsLoadingHospitals] = useState(true);

    useEffect(() => {
      fetchHospitals(setHospitalOptions, setIsLoadingHospitals);
    }, [route.params?.reload]);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  if (isLoadingHospitals) {
    return <Text>Loading </Text>; // Or some other placeholder
  }
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={hospitalOptions}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? 'blue' : 'black'}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
      <Text style={{color: 'blue'}} onPress={() => navigation.navigate("QuestionScreen")}>Don't See your hostpital?  </Text>
      <Button
      title="Next"
        onPress={() => navigation.navigate("PatientPage1")}/>

   
      </View>
  );
};

export default DropdownComponent;
