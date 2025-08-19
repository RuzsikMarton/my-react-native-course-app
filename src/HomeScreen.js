import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Modal, Image,
} from 'react-native';
import { CustomButton } from './CustomButton';
import { Header } from './Header';

const HomeScreen = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const onPressHandler = () => {
    if (submitted) {
      // Clear
      setSubmitted(false);
      setName('');
    } else {
      if (name.length > 2) {
        setSubmitted(true);
      } else {
        setShowWarning(true);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Header/>
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
              <Text style={styles.text}>WARNING!</Text>
            </View>
            <View style={styles.warning_body}>
              <Text style={styles.text}>
                The name must be longar than 2 characters
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
      <Text style={styles.text}>Please write your name:</Text>
      <TextInput
        value={name}
        editable={true}
        maxLength={10}
        keyboardType={'default'}
        multiline={false}
        style={styles.input}
        placeholder={'e.g Marci'}
        secureTextEntry={false}
        onChangeText={value => setName(value)}
      />
      {/*<Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#a00' : '#d00' },
        ]}
        onPress={onPressHandler}
        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
      >
        <Text style={styles.text}>{submitted ? 'Clear' : 'Submit'}</Text>
      </Pressable>*/}
      <CustomButton onPressFunction={onPressHandler} title={submitted ? 'Clear' : 'Submit'} color={'#d00'}/>
      <CustomButton onPressFunction={() => {}} title={'Test'} color={'#070'} style={{margin:20}}/>
      {submitted ? (
        <View style={styles.body}>
          <Text style={styles.text}>You are registered as {name}</Text>
          <Image
            source={require('../assets/done.png')}
            style={styles.image}
            resizeMode={'stretch'}
          />
        </View>
      ) : (
        <Image
          source={require('../assets/error.png')}
          style={styles.image}
          resizeMode={'stretch'}
        />
      )}
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
    backgroundColor: 'yellow',
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
  image: {
    width: '100',
    height: '100',
    margin: 10
  }
});

export default HomeScreen;
