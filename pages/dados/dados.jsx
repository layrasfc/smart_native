import { View, Text } from "react-native"
import styles from './styles.jsx'
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRoute } from '@react-navigation/native';

export function MostrarDados(){
  const [token, setToken] = useState('')

  const route = useRoute();
  const { dados, titulo, unidade } = route.params;

  useEffect(() => {
    AsyncStorage.getItem('token')
    .then((tokenY) => {
      setToken(tokenY)
    })
    .catch(error => {
      console.error("Não é possível acessar a página: ", error);
    })

  })

  useEffect(() => {
    console.log("nome: ", titulo, " tipo: ", unidade, " dados: ", dados);
  }, [])

  return (
    <View style={styles.container}>
      <Text>Sensor: {titulo}</Text>
      {dados.map((dado, index) => (
        <View key={index} style={styles.dado}>
          <Text>Dia: {dado.timestamp}</Text>
          <Text>Valor: {dado.valor}{unidade}</Text>
        </View>
      ))} 
      {/* {dados.map(dado => {
        return 
        <View style={styles.dado}>
        <Text>Dia: {dado.timestamp}</Text>
        <Text>Valor: {dado.timestamp}{unidade}</Text>
        </View>
      })} */}
  
    </View>
  )
}