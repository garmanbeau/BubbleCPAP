import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';

const TextInputExample = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [text2, onChangeText2] = React.useState('');
  const [text3, onChangeText3] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder='Diagnosis'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText2}
        value={text2}
        placeholder='Patient Age'
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText3}
        value={text3}
        placeholder='Patient Sex'
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
});

export default TextInputExample;