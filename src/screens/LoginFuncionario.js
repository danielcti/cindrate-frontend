import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

import firebase from 'react-native-firebase'

export default class Filtro extends Component {
    static navigationOptions = {
        title: 'CIndrate',
        leg:'',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'normal',
            flexGrow:1,
            alignSelf:'center',
            fontFamily: 'Potra',
            fontSize: 34
        },
      };
       
  constructor(props){
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
        chave: '',
    };
  }

  handleLogin = async () => {
    const fcmToken = await firebase.messaging().getToken();
    console.log(`o token = ${fcmToken}`)
    await firebase.messaging().subscribeToTopic('funcionario')
    if(this.matchLogin(this.state.chave)){
        console.log('login bateu')

        this.props.navigation.replace('Home', {isLoggedIn: true})
    }else{
        Alert.alert(
            'Login e senha nao combinaram, favor tentar novamente.',
            '',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
    }
  }

  matchLogin = (login) => {
    return login === 'admin'
  }

  render() {
    return (
      <View style={styles.containerStyle} keyboardShouldPersistTaps='never'>
        <TextInput
            keyboardShouldPersistTaps='never'
            style={styles.inputStyle}
            onChangeText={(chave) => this.setState({chave})}
            value={this.state.chave}
            placeholder='chave de acesso'
            autoCapitalize='none'
        />
        <TouchableOpacity onPress={this.handleLogin}>
            <View style={styles.trocaButton}>
                <Text style={styles.trocaTexto}>Logar</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputStyle:{
        color: '#333',
        fontSize: 16,
        lineHeight: 23,  
        borderBottomColor: '#333',
        borderBottomWidth: 0.5,
        fontFamily: 'System',
    },
    containerStyle:{
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10
    },
    trocaTexto: {
        fontSize:20,
        padding: 10,
    },
    trocaButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 70,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
      },
    
});
