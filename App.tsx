import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View, Text, Pressable } from 'react-native';
import MainScreen from './src/screens/MainScreen'
import SecondScreen from './src/screens/SecondaryScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Home'} component={MainScreen}/>
        <Tab.Screen name={'Second'} component={SecondScreen} initialParams={{itemName: 'Item from Tab', itemId: 12}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10
  }
})


export default App;
