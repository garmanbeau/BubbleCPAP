import React, {useState} from "react";
import { View, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const TextInputExample = ({ navigation }) => {
  const [text10, onChangeText10] = React.useState("");
  const [text11, onChangeText11] = React.useState("");
  const [text12, onChangeText12] = React.useState("");
  const [text13, onChangeText13] = React.useState("");
  const [isTextInputVisible, setTextInputVisibility] = useState(false);
  const [isTextInputVisible2, setTextInputVisibility2] = useState(false);
  const [ isPneumothorax, setPneumothorax] = useState(false);

  const [items, setItems] = useState([
    { label: 'nasal prongs', value: '1' },
    { label: 'nasal mask', value: '2' },
    { label: 'nose/mouth mask', value: '3' },
    { label: 'scuba/full face mask', value: '4' },
  ]);
  
    const [outcomeItems, setOutcomeItems] = useState([
      {label: 'Discharged Home', value: '1'},
      {label: 'Transfered to Another Hospital', value: '2'},
      {label: 'Died', value: '3'},
      {label: 'Intubated', value: '4'},
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
          isChecked={false}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={(isChecked) => {
            // Update the value of the item in the array
            const newItems = [...array];
            newItems[index].value = isChecked;

            if ( array == outcomeItems){
              setOutcomeItems(newItems);
            } else if ( array == complicationItems){
              setComplicationItems(newItems);
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
          <View>{renderBouncyCheckboxes(outcomeItems)}</View>
        </View>
      )}

      const complicationView = () => {
        return(
          <View>
             <Text>Select all Complications that apply</Text>
              <View>{renderBouncyCheckboxes(complicationItems)}</View>
          </View>
        )
      }
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Method of humidification"
        onChangeText={onChangeText10}
        value={text10}
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
      <Text> Patient Outcomes \/</Text>
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
      <Text> Did complications arise</Text>
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
      <Button title="Next" onPress={() => navigation.navigate("Welcome")} />
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
