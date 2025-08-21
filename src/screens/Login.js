import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Alert} from "react-native";
import GlobalStyle from "../utils/GlobalStyle";
import { TextInput } from "react-native-gesture-handler";
import { CustomButton } from "../utils/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage"
import SQLite from "react-native-sqlite-storage"

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default'
    },
    () => {},
    error=>{console.log(error)}
)

export default function Login({navigation}) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    useEffect(()=> {
        createTable();
        getData();
    }, []);

    const createTable=() => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                +"Users"
                +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER)"
            )
        })
    }

    const getData = async () => {
        try{
           db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, AGE from Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length
                        if(len>0){
                           navigation.navigate('Home');
                        }
                    }
                )
            })
        } catch(e){
            console.log(e);
        }
    }

    const onPressHandler = async () => {
        if(name.length == 0 || age.length == 0) {
            Alert.alert('Warning', 'Please enter your data.')
        }else {
            try{
                // let user = {
                //     Name: name,
                //     Age: age,
                // }
                // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
                await db.transaction(async (tx)=>{
                    // await tx.executeSql(
                    //     "INSERT INTO Users (Name, Age) VALUES ('"+name+"',"+age+")"
                    // );
                    await tx.executeSql(
                        "INSERT INTO Users (Name, Age) VALUES (?,?)",
                        [name, age]
                    );
                })
                navigation.navigate('Home');
            } catch(e){
                console.log(e);
            }
        }
    }

    return(
        <View style={styles.body}>
            <Image 
                style={styles.logo}
                source={require('../../assets/asyncstorage.png')}
            />
            <Text style={[styles.text, GlobalStyle.ButtonText]}>
                Async Storage
            </Text>
            <TextInput style={styles.input} placeholder="Enter your name" onChangeText={(value) => setName(value)}/>
            <TextInput style={styles.input} placeholder="Enter your age" onChangeText={(value) => setAge(value)}/>
            <CustomButton title={'Login'} color={'#C19A6B'} onPressFunction={onPressHandler}></CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        alignItems: 'center'
    },
    logo:{
        width: 100,
        height: 100,
        margin: 20,
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: '75%',
        borderWidth: 1,
        fontSize: 20,
        marginTop: 10,
        backgroundColor: '#B0895A',
        borderColor: '#444',
        borderRadius: 10,
        textAlign: 'center'
    }
})