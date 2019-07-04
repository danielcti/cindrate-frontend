import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'

import api from '../services/api'

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
    this.onSolicitaTroca = this.onSolicitaTroca.bind(this)
    this.onAceitaTroca = this.onAceitaTroca.bind(this)
    this.state = {};
  }

  onSolicitaTroca = filtro => {
		const id = filtro._id

		filtro.trocaSolicitada = true
		// console.log(`Troca do filtro do bloco ${data.bloco} e andar ${data.andar} solicitada `)

		api.post(`/filtros/${id}/solicita`)

    api.post('/notify', {bloco: filtro.bloco, andar:filtro.andar})

    console.log('troca solicitada')

		this.props.navigation.navigate('Home', filtro)
  }

  onAceitaTroca = filtro => {
		const id = filtro._id

		filtro.trocaAceita = true

		api.post(`/filtros/${id}/aceita`)

		this.props.navigation.navigate('Home', filtro)
  }

  onEfetuaTroca = filtro => {
    const id = filtro._id

		filtro.trocaAceita = false
		filtro.trocaSolicitada = false

    api.post(`/filtros/${id}/efetua`)

    this.props.navigation.navigate('Home', filtro)
  }

  render() {
      const filtro = this.props.navigation.state.params.filtro
      const isLoggedIn = this.props.navigation.state.params.isLoggedIn
    return (
			<View>

				<View style={styles.circulo}>
					<ProgressCircle
							percent={filtro.nivel}
							radius={80}
							borderWidth={10}
							color="#3399FF"
							shadowColor="#999"
							bgColor="#fff">
							<Text style={{ fontSize: 30 }}>{filtro.nivel.toString()} %</Text>
					</ProgressCircle>
				</View>
					
				<Text style={styles.info}>Bloco {filtro.bloco} - Andar {filtro.andar}: {filtro.nivel}%</Text>
				
				{!filtro.trocaSolicitada && 
				<TouchableOpacity style={styles.button} onPress={() => this.onSolicitaTroca(filtro)}>
								<Text style={styles.buttonText}>Solicitar troca</Text>
				</TouchableOpacity>}
				
				{filtro.trocaSolicitada && !filtro.trocaAceita && !isLoggedIn &&
				<View style={styles.mensagemView}>
					<Text style={styles.mensagem}>Aguardando funcionário aceitar a troca</Text>
				</View>
				}
				
				{filtro.trocaSolicitada && !filtro.trocaAceita && isLoggedIn &&
				<TouchableOpacity style={styles.button} onPress={() => this.onAceitaTroca(filtro)}>
					<Text style={styles.buttonText}>Reservar troca</Text>
				</TouchableOpacity>
				}

				{filtro.trocaSolicitada && filtro.trocaAceita && 
				<View style={styles.mensagemView}>
					<Text style={styles.mensagem}>Funcionario indo</Text>
				</View>
				}
				
				{filtro.trocaSolicitada && filtro.trocaAceita && isLoggedIn &&
				<TouchableOpacity style={styles.button}onPress={() => this.onEfetuaTroca(filtro)}>
					<Text style={styles.buttonText}>Confirmar que a troca foi efetuada</Text>
				</TouchableOpacity>
				}
			</View>

    );
  }
}

const styles = StyleSheet.create({
    info: {
        borderRadius: 5,
        margin: 10,
        backgroundColor: '#EEE',
        marginTop: 10,
        padding: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    mensagem: {
			fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
    },
    button: {
      backgroundColor: '#3399FF',
      borderRadius: 4,
      height: 42,
      marginTop: 15,
  
      justifyContent: 'center',
      alignItems: 'center',
		},
		buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
		},
		circulo: {
			margin: 10,
			alignItems: 'center',
		},
		mensagemView: {
			justifyContent: 'center',
      alignItems: 'center',
		}
});
