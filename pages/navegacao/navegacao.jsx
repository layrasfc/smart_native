import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons";

import Home from "../home/home";
import Mapa from "../mapa/mapa"
import { MostrarDados } from '../dados/dados';


const Tab = createBottomTabNavigator();

export default function Navegacao(){

  return(
    <Tab.Navigator initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: '#3083E5',
      tabBarInactiveTintColor: '#000',
    }}>
      <Tab.Screen name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ size, color }) => (
          <Feather name="home" size={size} color={color} />
        )
      }}/>
      <Tab.Screen
      name="Mapa"
      component={Mapa}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ size, color }) => (
          <Feather name="map" size={size} color={color} />
        )
      }}/>
      <Tab.Screen
      name="Dados"
      component={MostrarDados}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: () => null
      }}/>

    </Tab.Navigator>
  )
}