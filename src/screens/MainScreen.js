import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, Pressable } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle'

export default function MainScreen({ navigation, route}) {

    const onPressHandler = () => {
        navigation.navigate('Second')
    }
    return (
        <View style={styles.body}>
            <Text style={[styles.text, GlobalStyle.CustomFont]}>Hello World</Text>
            <Pressable onPress={onPressHandler} style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#a00' })}>
                <Text style={GlobalStyle.ButtonText}>
                    Go to Second Screen
                </Text>
            </Pressable>
            <Text style={styles.text}>{route.params?.Message}</Text>
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
        margin: 10,
    }
})