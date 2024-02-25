import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import WeightTracker from './screens/WeightTracker';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  
  return (
    <>
      <StatusBar style='dark'/>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='WeightTracker' component={WeightTracker}/>
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 60,
  },
  weightInputContainer: {
    flexDirection: 'row',
    paddingTop: 24,
  },
  weightInput: {
    borderWidth: 1,
    padding: 10,
  },
  list: {
    flexDirection: 'row',
    padding: 10,
  },
  date: {
    paddingRight: 10,
  },
});
