import { createStackNavigator } from 'react-navigation';
import Home from './pages/home';
import Hero from './pages/hero';
export default createStackNavigator({
    Home,
    Hero
},
{
    navigationOptions:{
        headerStyle:{
            backgroundColor:"#ed1d24",
        },
        headerTintColor:"#FFF",
    },
}
);