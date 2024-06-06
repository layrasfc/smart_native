import { Text, View } from "react-native"
import Mapa from "../mapa/mapa"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Teste2 from "../teste2";
import { Feather } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export default function Home(){
  return(
    <Tab.Navigator initialRouteName="Principal">
      <Tab.Screen name="Salas"
      component={Teste2}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <Feather name="map" size={size} color={color} />
        )
      }}/>
      <Tab.Screen
      name="Mapa"
      component={Mapa}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <Feather name="file-minus" size={size} color={color} />
        )
      }}/>

    </Tab.Navigator>
  )
}