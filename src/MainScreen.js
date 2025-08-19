import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, Pressable } from 'react-native';

export default function MainScreen({ navigation }) {
    const onPressHandler = () => {
        navigation.navigate('Second')
    }
    return (
        <View style={styles.body}>
            <Text style={styles.text}>Hello World</Text>
            <Pressable onPress={onPressHandler} style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#a00' })}>
                <Text style={styles.text}>
                    Go to Second Screen
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