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
        onPress={() => navigation.navigate("Yearly Questions")}/>
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