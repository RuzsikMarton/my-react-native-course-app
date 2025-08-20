import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import MainScreen from './src/screens/MainScreen'
import SecondScreen from './src/screens/SecondaryScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const Drawer = createDrawerNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerType: 'front',
            drawerPosition: 'left',
            swipeEdgeWidth: 100,
            drawerStyle: {
              backgroundColor: '#fff',
              width: 250,
            },
            drawerActiveTintColor: '#C19A6B',
            headerStyle: {
              backgroundColor: '#C19A6B',
            },
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: 'PlayfairDisplay-Regular',
            }
        }}
        >
          <Drawer.Screen 
            name={'Home'} 
            component={MainScreen} 
            options={{title: 'Home', drawerIcon:({focused})=> (<FontAwesome6 name="house" iconStyle='solid' color={focused ? '#C19A6B' : '#444'}/>)}} />
          <Drawer.Screen 
            name={'Second'} 
            component={SecondScreen} 
            options={{title: 'Second Screen',drawerIcon:({focused})=> (<FontAwesome6 name="door-open" iconStyle='solid' color={focused ? '#C19A6B' : '#444'}/>)}} 
            initialParams={{ itemName: 'Item from Tab', itemId: 12 }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
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
