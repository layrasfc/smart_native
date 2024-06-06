// import { NavigationContainer } from "@react-navigation/native"
// import { createStackNavigator } from "@react-navigation/stack"
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Feather } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

// Importação das páginas
import Mapa from "./pages/mapa/mapa"
import Login from "./pages/login/login"
import Teste2 from "./pages/teste2"
import Home from "./pages/home/home"


const Stack = createStackNavigator()

function MyTabs(){
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Login" 
      component={Login}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  )
}

export default function Routers(){
  return(
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  )
}
