import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Profile from './src/screens/Profile'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Provider } from 'react-redux';
import  store  from './src/redux/store'

const Drawer = createDrawerNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName='Login'
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
            component={Home} 
            options={{title: 'Home',drawerIcon:({focused})=> (<FontAwesome6 name="house" iconStyle='solid' color={focused ? '#C19A6B' : '#444'} size={20}/>)}} 
          />
          <Drawer.Screen 
            name={'Login'} 
            component={Login} 
            options={{title: 'Login',drawerIcon:({focused})=> (<FontAwesome6 name="clipboard-user" iconStyle='solid' color={focused ? '#C19A6B' : '#444'} size={20}/>)}} 
          />
          <Drawer.Screen 
            name={'Profile'} 
            component={Profile} 
            options={{title: 'Profile', drawerIcon:({focused})=> (<FontAwesome6 name="user" iconStyle='solid' color={focused ? '#C19A6B' : '#444'} size={20}/>)}} 
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
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
