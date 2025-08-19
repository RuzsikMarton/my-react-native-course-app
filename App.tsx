import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, useColorScheme, View, Text, Pressable } from 'react-native';
import MainScreen from './src/MainScreen'
import SecondScreen from './src/SecondaryScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: '#a00',
          tabBarInactiveTintColor: '#555',
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if(route.name==='Home'){
              iconName = 'image';
              color = focused ? '#a00' : '#555'
            }else if(route.name==='Second'){
              iconName = 'user';
              color = focused ? '#a00' : '#555'
            }
            const iconSize = focused ? 25 : 20;
            return (<FontAwesome6 name={iconName} size={iconSize} color={color}></FontAwesome6>)
          }
        })}
      >
        <Tab.Screen name={'Home'} component={MainScreen} options={{tabBarBadge: 3}}/>
        <Tab.Screen name={'Second'} component={SecondScreen} />
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
