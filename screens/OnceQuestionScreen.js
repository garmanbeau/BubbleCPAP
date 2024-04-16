import React, { useState} from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  ImageBackground,
  Text,
  View,
} from "react-native";
import styles from "../shared/styles";
import { addHospital } from "../shared/api";
import { useValidation } from "../shared/validation.js"; // Import your validation function

const HospitalOneTimeQuestions = ({ navigation }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cityValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const countryValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );
  const nameValidation = useValidation(
    "",
    (value) => value.trim() !== "",
    false
  );

  const handleNextPress = () => {
    setIsSubmitted(true);
    cityValidation.validateNow();
    countryValidation.validateNow();
    nameValidation.validateNow();

    if (
      cityValidation.isValid &&
      countryValidation.isValid &&
      nameValidation.isValid
    ) {
      const hospital = {
        city: cityValidation.value,
        country: countryValidation.value,
        name: nameValidation.value,
      };
      addHospital(hospital)
        .then(() => {
          navigation.navigate("HospitalSelect", { reload: Date.now() });
        })
        .catch((error) => {
          console.error('Error adding hospital', error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container4}>
    <ScrollView contentContainerStyle={{...styles.container4, flexGrow: 1}} >
        <ImageBackground
          source={require("../assets/Designer.png")}
          style={styles.backgroundImage2}
        >
          
          <View>
            <Text style={styles.label}>Hospital City</Text>
            <View style={styles.fieldContainer}>
              {!cityValidation.isValid && isSubmitted && (
                <Text style={styles.error}>Must fill item</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  { borderColor: cityValidation.borderColor },
                ]}
                placeholder="Hospital City"
                onChangeText={cityValidation.handleChange}
                onBlur={cityValidation.handleBlur}
                value={cityValidation.value}
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>Hospital Country</Text>
            <View style={styles.fieldContainer}>
              {!countryValidation.isValid && isSubmitted && (
                <Text style={styles.error}>Must fill item</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  { borderColor: countryValidation.borderColor },
                ]}
                placeholder="Hospital Country"
                onChangeText={countryValidation.handleChange}
                onBlur={countryValidation.handleBlur}
                value={countryValidation.value}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Hospital Name</Text>
            <View style={styles.fieldContainer}>
              {!nameValidation.isValid && isSubmitted && (
                <Text style={styles.error}>Must fill item</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  { borderColor: nameValidation.borderColor },
                ]}
                placeholder="Hospital Name"
                onChangeText={nameValidation.handleChange}
                onBlur={nameValidation.handleBlur}
                value={nameValidation.value}
              />
            </View>
          </View>
          <View style={styles.buttonEndContainer}>
    <Button
      title="Next"
      onPress={handleNextPress}
    />
  </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalOneTimeQuestions;
