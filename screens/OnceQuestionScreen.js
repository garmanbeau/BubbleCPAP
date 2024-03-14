import React from 'react';
import {SafeAreaView, TextInput, Button} from 'react-native';
import styles from '../shared/styles';
import { addHospital } from '../shared/api';


const TextInputExample = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [text2, onChangeText2] = React.useState('');
  const [text3, onChangeText3] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder='Hospital City'
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        placeholder='Hospital Country'
        onChangeText={onChangeText2}
        value={text2}
      />
      <TextInput
        style={styles.input}
        placeholder='Hospital Name'
        onChangeText={onChangeText3}
        value={text3}
      />
      <Button title="Next"
  onPress={() => {
    const hospital = {
      city: text,
      country: text2,
      name: text3
    };
    addHospital(hospital)
      .then(() => {
        navigation.navigate("HospitalSelect", { reload: Date.now() });
      })
      .catch((error) => {
        console.error('Error adding hospital', error);
      });
  }}
/>

    </SafeAreaView>
  );
};



export default TextInputExample;