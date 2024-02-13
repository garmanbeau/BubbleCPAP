import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen.js';
import SearchScreen from './screens/SearchScreen.js';
import HostpitalSelectScreen from './screens/HospitalSelectScreen.js';
import OnceQuestionScreen from './screens/OnceQuestionScreen.js';
import YearlyQuestion from './screens/YearlyQuestionScreen.js';
import PatientPage1 from './screens/PatientPage1.js';
import PatientPage2 from './screens/PatientPage2.js';
import PatientPage3 from './screens/PatientPage3.js';
import ResultPage from './screens/ResultScreen.js';
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
        <Stack.Screen name="Yearly Questions" component={YearlyQuestion}/>  
        <Stack.Screen name="PatientPage1" component={PatientPage1}/>  
        <Stack.Screen name="PatientPage2" component={PatientPage2}/>  
        <Stack.Screen name="PatientPage3" component={PatientPage3}/>  
        <Stack.Screen name="Results" component={ResultPage}/>  

        
        </Stack.Navigator>
    </NavigationContainer>
  );
}