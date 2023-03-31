import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

const App = () => {
  //   AsyncStorage.setItem('access_token', access_token);
  const [data, setData] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [lastName, setLastname] = useState('');
  const [firstName, setFirstName] = useState('');

  //   setAccessToken1 = async value => {
  //     try {
  //       await AsyncStorage.setItem('key', value);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     console.log('Done.');
  //   };
  //   getMyToken = async () => {
  //     try {
  //       return await AsyncStorage.getItem('@key');
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     console.log('Done.');
  //   };

  const signUp = async () => {
    try {
      const signUpRes = await axios.post('http://localhost:3000/auth/signup', {
        email: emailInput,
        password: passwordInput,
        firstName: firstName,
        lastName: lastName,
      });
      setEmailInput('');
      setPasswordInput('');
      setFirstName('');
      setLastname('');
    } catch (error) {
      console.log(error);
    }
  };
  const signIn = async () => {
    try {
      const signInRes = await axios.post('http://localhost:3000/auth/signin', {
        email: emailInput,
        password: passwordInput,
      });
      setEmailInput('');
      setPasswordInput('');
      setFirstName('');
      setLastname('');
      setAccessToken(signInRes.data.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  const getMe = async () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const getMeRes = await axios.get('http://localhost:3000/users/me', {
        headers,
      });
      console.log(userDetails);
      setUserDetails(getMeRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderItemStyle}>
        <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: '600'}}>
          {item}
        </Text>
      </View>
    );
  };
  console.log(emailInput);
  //   const onPress = () => {};
  return (
    <SafeAreaView style={styles.box1}>
      <View>
        <Text style={styles.headerStyle}>Disc Golf App</Text>
        {/* <TextInput
          style={styles.textInput}
          onChangeText={setEmailInput}
          value={emailInput}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPasswordInput}
          value={passwordInput}
        /> */}
        {/* <Text>{emailInput}</Text>
        <Text>{passwordInput}</Text> */}
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={getMe}>
            <Text style={styles.buttonText}>Get Profile</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmailInput}
          value={emailInput}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPasswordInput}
          value={passwordInput}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setFirstName}
          value={firstName}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setLastname}
          value={lastName}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <Text>{(userDetails.email, userDetails.userName)}</Text>
          {/* <FlatList
            contentContainerStyle={styles.flatlistStyle}
            data={userDetails}
            renderItem={renderItem}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flatlistStyle: {
    width: 300,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
  headerStyle: {
    paddingTop: 40,
    fontSize: 40,
    padding: 10,
    alignSelf: 'center',
  },
  renderItemStyle: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    width: 80,
    padding: 10,
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
  },
});
