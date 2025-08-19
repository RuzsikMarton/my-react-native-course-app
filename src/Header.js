import React from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const Header = (props) => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>
          React Native Tutorial
        </Text>
      </View>
    )
}

const styles = StyleSheet.create({
    header:{
      width: '100%',
      height: 50,
      backgroundColor: '#a00',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text:{
      fontSize: 25,
      fontWeight: 'bold',
      color: '#ffffff'
    }
})