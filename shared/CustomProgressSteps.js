import React from 'react';
import { View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const CustomProgressSteps = ({ activeStep }) => {
  return (
    <View style={{marginBottom: "-10%"}}>
  <ProgressSteps 
    activeStep={activeStep}  // Adjust the style here
  >
    <ProgressStep removeBtnRow={true}>
      <View style={{ alignItems: 'center' }}></View>
    </ProgressStep>
    <ProgressStep removeBtnRow={true}>
      <View style={{ alignItems: 'center' }}></View>
    </ProgressStep>
    <ProgressStep removeBtnRow={true}>
      <View style={{ alignItems: 'center' }}></View>
    </ProgressStep>
    <ProgressStep removeBtnRow={true}>
      <View style={{ alignItems: 'center' }}></View>
    </ProgressStep>
    <ProgressStep removeBtnRow={true}>
      <View style={{ alignItems: 'center' }}></View>
    </ProgressStep>
  </ProgressSteps>
</View>

  );
};

export default CustomProgressSteps;
