import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from './screens/Home'
import Filtro from './screens/Filtro'
import LoginFuncionario from './screens/LoginFuncionario'
import AskLogin from './screens/AskLogin'

const AppNavigator = createStackNavigator({
    Home, Filtro, LoginFuncionario, AskLogin
},
{
    initialRouteName: 'AskLogin',
    headerLayoutPreset: 'center' ,
    cardStyle: {
        backgroundColor: '#87CEEB'
    }
  }
)

export default createAppContainer(AppNavigator)
