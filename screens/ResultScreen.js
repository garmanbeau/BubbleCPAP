import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, useWindowDimensions, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../shared/styles';

export default function ResultsScreen({navigation}) {
  return (
    <View style={styles.container2}>
      <Text>Results for total bCPAP Patients for hospital</Text>
      <StatusBar style="auto" />
      <LineChart
     data={{
       labels: ["NeoNatal", "Pediatric", "Cardiac ICU"],
       datasets: [
         {
           data: [
              32 ,
              12,
              40,
           ]
         }
       ]
     }}
     width={Dimensions.get("window").width} // from react-native
     height={220}
     
     yAxisInterval={1} // optional, defaults to 1
     chartConfig={{
       backgroundColor: "#e26a00",
       backgroundGradientFrom: "#fb8c00",
       backgroundGradientTo: "#ffa726",
       decimalPlaces: 0, // optional, defaults to 2dp
       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
       labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
       style: {
         borderRadius: 16
       },
       propsForDots: {
         r: "6",
         strokeWidth: "2",
         stroke: "#ffa726"
       }
     }}
     bezier
     style={{
       marginVertical: 8,
       borderRadius: 16
     }}
   />
      <Button 
      title="Home"
      onPress={() => navigation.navigate("Welcome")}/>
    </View>
    
  );
}
