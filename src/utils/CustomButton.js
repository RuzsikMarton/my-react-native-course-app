import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export const CustomButton = (props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? '#a00' : props.color },
                { ...props.style }
            ]}
            onPress={props.onPressFunction}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
        >
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#000000',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    button: {
        width: 150,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#777',
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
        margin: 5,
    },
})