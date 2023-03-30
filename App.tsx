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

const App = () => {
  const [data, setData] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  //   const [fNameInput, setFNameInput] = useState('');
  //   const [lNameInput, setLNameInput] = useState('');

  const signUp = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/signup', {
        email: emailInput,
        password: passwordInput,
        // firstName: fNameInput,
        // lastName: lNameInput,
      });
      setEmailInput('');
      setPasswordInput('');
      //   setFNameInput('');
      //   setLNameInput('');
      // getUser();
    } catch (error) {
      console.log(error);
    }
  };

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/users/me');
  //     console.log('response is:', response);
  //     setData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //   useEffect(() => {
  //     console.log('useEffect is called');
  //     getUser();
  //   }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderItemStyle}>
        <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: '600'}}>
          {item.email}
        </Text>
      </View>
    );
  };
  console.log(emailInput);
  const onPress = () => {};
  return (
    <SafeAreaView style={styles.box1}>
      <View>
        <Text style={styles.headerStyle}>Disc Golf App</Text>
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
        <Text>{emailInput}</Text>
        <Text>{passwordInput}</Text>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={{color: 'white'}}>Sign Up</Text>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={styles.flatlistStyle}
          data={data}
          renderItem={renderItem}
        />
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
    width: 50,
    padding: 10,
  },
});
