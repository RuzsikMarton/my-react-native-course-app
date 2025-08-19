import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, Pressable } from 'react-native';

export default function SecondScreen({ navigation, route }) {
  const {itemName, itemId} = route.params;

  const onPressHandler = () => {
    navigation.navigate('Home', {Message: 'message from Second Screen'});
    //navigation.goBack();
    navigation.setParams({itemId: 14});
  }
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Second Screen</Text>
      <Pressable onPress={onPressHandler} style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#a00' })}>
        <Text style={styles.text}>
          Back to Home Screen
        </Text>
      </Pressable>
      <Text style={styles.text}>{itemName}</Text>
      <Text style={styles.text}>Id: {itemId}</Text>
    </View>
  )
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