import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import io from 'socket.io-client'
import firebase from 'react-native-firebase'
// import type { Notification } from 'react-native-firebase'

import api from '../services/api'

const myNavigationOptions = {
    title: 'CIndrate',
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

    }
}

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        if(navigation.state.params.isLoggedIn){
            myNavigationOptions.headerRight = (
                <View style={styles.headerStar}>
                    <Icon name="star-o" size={30} color="#900" />
                </View>
            )
            return myNavigationOptions
        } else {
            return myNavigationOptions
        }
      }
       
  constructor(props){
    super(props)
    
    this.state = {
      filtros: [],
      isLoggedIn: false,
      isLoading: true,
  };
  
  }


  async componentDidMount(){

    // const fcmToken = await firebase.messaging().getToken();
    // console.log(`o token = ${fcmToken}`)
    

    this.registerSocket();

    const response = await api.get('filtros');

    const isLoggedIn = this.props.navigation.state.params.isLoggedIn


    this.setState({ filtros: response.data, isLoggedIn, isLoading: false })
    }
    
	registerSocket = () => {
		const socket = io('http://192.168.0.114:3333')

		socket.on('filtro', newFiltro => {
				this.setState({ filtros: [newFiltro, ... this.state.filtros] })
		})

		socket.on('solicita', filtroSolicitado => {
				this.setState({
						filtros: this.state.filtros.map(filtro => (
								filtro._id === filtroSolicitado._id ? filtroSolicitado : filtro
						))
				})
        })
        
        socket.on('aceita', filtroAceito => {
            this.setState({
                    filtros: this.state.filtros.map(filtro => (
                            filtro._id === filtroAceito._id ? filtroAceito : filtro
                    ))
            })
        })

        socket.on('efetua', filtroTrocado => {
            this.setState({
                    filtros: this.state.filtros.map(filtro => (
                            filtro._id === filtroTrocado._id ? filtroTrocado : filtro
                    ))
            })
        })

}
		
	// ir para a pagina do filtro escolhido
	handleInfo = (id) => { 
		const selectedFilter = this.state.filtros.find(
			filtro => (filtro._id === id)
		)
        this.props.navigation.navigate('Filtro',{ filtro: selectedFilter, isLoggedIn: this.state.isLoggedIn }) 
        //passa pra pagina filtro o filtro selecionado e se a pessoa está logada
    }

  renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => this.handleInfo(item._id)}>

            <Text style={styles.textoFiltro}>Bloco {item.bloco} - Andar {item.andar}: {item.nivel}%</Text>

            {item.trocaSolicitada && !item.trocaAceita && 
            // <Text style={styles.trocaSolicitada}> 
            //     Troca solicitada
            // </Text>
            <View style={styles.statusIcon}>
                <Icon2 name="water-off" size={30} color="#f4511e" />
            </View>            
            }

            {item.trocaSolicitada && item.trocaAceita && 
            // <Text style={styles.trocaAceita}>
            //     Funcionario a caminho
            // </Text>
            <View style={styles.statusIcon}>
                <Icon2 name="truck-delivery" size={30} color="#f4511e" />
            </View>
            }

        </TouchableOpacity>
  );

  render() {

    if (this.state.isLoading) {
        return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        )
    }
    return (
        <View>
            <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={styles.list}
            data={this.state.filtros}
            renderItem={this.renderItem}
            keyExtractor = { item => item._id }
            />
        </View>

    );
  }
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 10,
    },
    loading: {
        justifyContent: 'center',
        flex: 1,
    },
    listItem: {
        backgroundColor: '#EEE',
        marginTop: 10,
        padding: 20,
        flexDirection: 'row',
        borderRadius: 5,
    },
    info:{
        fontSize:30,
        marginTop: 14
    },
    troca:{
        fontSize:20,
        padding: 15
    },
    funcionarioIndo:{
        // padding: 15,
        fontSize: 10
    },
    button:{
        position: 'absolute',
        right: 20
    },
    textoFiltro: {
        fontWeight: 'bold',
        fontSize: 18,
        // fontFamily: 'stibold'
    },
    headerStar: {
        paddingRight: 10
    },
    statusIcon: {
      flex: 1,
      alignItems: 'flex-end'
    },
});
