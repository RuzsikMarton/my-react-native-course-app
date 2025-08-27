import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, Pressable } from 'react-native';
import GlobalStyle from '../utils/GlobalStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from "react-native-sqlite-storage"
import { useDispatch, useSelector } from "react-redux";
import { setName, setAge } from "../redux/slice";

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default'
    },
    () => { },
    error => { console.log(error) }
)

export default function Home({ navigation, route }) {
    const dispatch = useDispatch();
    const { name, age} = useSelector(state => state.user);

    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            // await AsyncStorage.getItem('UserData')
            //     .then(value => {
            //         if (value != null) {
            //             let user = JSON.parse(value);
            //             setName(user.Name);
            //             setAge(user.Age);
            //         }
            //     })
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, AGE from Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length
                        if(len>0){
                            var userName = results.rows.item(0).Name;
                            var userAge = results.rows.item(0).Age;
                            dispatch(setName(userName));
                            dispatch(setAge(userAge));
                        }
                    }
                )
            })
        } catch (e) {
            console.log(e);
        }
    }

    const onPressHandler = () => {
        navigation.navigate('Registration')
    }
    return (
        <View style={styles.body}>
            <Text style={[styles.text, GlobalStyle.CustomFont]}>Welcome {name}!</Text>
            {name != null
                ?
                <></>
                :
                <Pressable onPress={onPressHandler} style={({ pressed }) => ({ borderRadius: 15, backgroundColor: pressed ? '#E3BC8D' : '#C19A6B' })}>
                    <Text style={GlobalStyle.ButtonText}>
                        Go to Registration Screen
                    </Text>
                </Pressable>
            }
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