import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, Pressable } from 'react-native';

export default function SecondScreen({ navigation }) {
  const onPressHandler = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Second Screen</Text>
      <Pressable onPress={onPressHandler} style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#a00' })}>
        <Text style={styles.text}>
          Back to Home Screen
        </Text>
      </Pressable>
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