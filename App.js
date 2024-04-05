import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./src/login"; // Corrected import statement
import Detail from "./src/Detail";
import Dashboard from "./src/Dashboard";
import { initializeApp } from '@react-native-firebase/app';

const Stack = createStackNavigator(); // Corrected component name

// Initialize Firebase
initializeApp(); // Call initializeApp before rendering any Firebase services

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login} // Corrected component name
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
