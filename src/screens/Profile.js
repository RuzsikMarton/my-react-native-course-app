import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import { CustomButton } from '../utils/CustomButton';
import GlobalStyle from '../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from "react-native-sqlite-storage"
import { useDispatch, useSelector } from "react-redux";
import { setName, setAge, increaseAge } from "../redux/slice";

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default'
  },
  () => { },
  error => { console.log(error) }
)

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { name, age} = useSelector(state => state.user);

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      // await AsyncStorage.getItem('UserData')
      //   .then(value => {
      //     if (value != null) {
      //       let user = JSON.parse(value);
      //       setName(user.Name);
      //       setAge(user.Age);
      //     }
      //   })
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT Name, AGE from Users",
          [],
          (tx, results) => {
            var len = results.rows.length
            if (len > 0) {
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

  const updateData = async () => {
    if (name.length === 0) {
      Alert.alert('Warning', 'Please enter your name.')
    } else {
      try {
        // let user = {
        //   Name: name,
        //   Age: age
        // }
        // await AsyncStorage.setItem('UserData', JSON.stringify(user));
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Users SET Name=?",
            [name],
            () => { setShowWarning(true) },
            error => { console.log(error) }
          )
        })
      } catch (e) {
        console.log(e);
      }
    }
  };

  const removeData = async () => {
    try {
      //await AsyncStorage.removeItem('UserData');
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Users",
          [],
          () => {
            setName('');
            setAge('');
            navigation.navigate('Login');
          },
          error => { console.log(error) }
        )
      })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.body}>
      <Modal
        visible={showWarning}
        transparent
        onRequestClose={() => setShowWarning(false)}
        animationType={'fade'}
        hardwareAccelerated
      >
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <View style={styles.warning_title}>
              <Text style={[styles.text, GlobalStyle.CustomFont]}>Success!</Text>
            </View>
            <View style={styles.warning_body}>
              <Text style={styles.text}>
                your data has been updated.
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.warning_button,
                {
                  backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#aaa',
                },
              ]}
              onPress={() => setShowWarning(false)}
            >
              <Text style={styles.text}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={[styles.text, GlobalStyle.CustomFont]}>Your profile: {name}</Text>
      <Text style={[styles.text, GlobalStyle.CustomFont]}>Your age is: {age}</Text>
      <TextInput
        value={name}
        editable={true}
        maxLength={10}
        keyboardType={'default'}
        multiline={false}
        style={styles.input}
        placeholder={'e.g Martin'}
        secureTextEntry={false}
        onChangeText={value => dispatch(setName(value))}
      />
      <CustomButton onPressFunction={updateData} title={'Update'} color={'#C19A6B'} />
      <CustomButton onPressFunction={removeData} title={'Remove'} color={'#A00'} />
      <CustomButton onPressFunction={() => dispatch(increaseAge())} title={'Increase Age'} color={'#0080ff'} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  input: {
    width: 200,
    borderRadius: 5,
    borderColor: '#777',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
    marginTop: 20,
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
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
  },
  warning_modal: {
    width: '300',
    height: '300',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C19A6B',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
