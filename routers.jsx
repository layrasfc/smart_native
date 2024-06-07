
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

// Importação das páginas
import Login from "./pages/login/login"
import Navegacao from "./pages/navegacao/navegacao"


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
      name="Navegacao"
      component={Navegacao}
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
