import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import HostpitalSelectScreen from './screens/HospitalSelectScreen.js';
import OnceQuestionScreen from './screens/OnceQuestionScreen.js';
import PatientPage1 from './screens/PatientPage1.js';
//import GoodScreen from './GoodScreen';

const Stack = createNativeStackNavigator();

export default function App() {
      
    
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Search" component={SearchScreen}/>  
        <Stack.Screen name="HospitalSelect" component={HostpitalSelectScreen}/>  
        <Stack.Screen name="QuestionScreen" component={OnceQuestionScreen}/>  
        <Stack.Screen name="PatientPage1" component={PatientPage1}/>  
        </Stack.Navigator>
    </NavigationContainer>
  );
}