import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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

  render() {
    return (
      <View style={styles.containerStyle}>
          <Text>Você é funcionário?</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('LoginFuncionario')}>
              <Text style={styles.buttonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.replace('Home', {isLoggedIn: false})}>
              <Text style={styles.buttonText}>Não</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    containerStyle:{
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10
    },
    buttonText: {
        fontSize:20,
        padding: 10,
    },
    button: {
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
