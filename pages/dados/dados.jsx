import { View, Text, ScrollView } from "react-native"
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
    console.log("DADOS: ", dados);
  }, [])


  return (
    <ScrollView  style={styles.container}>
      <View style={styles.options}>
      {dados.map((dado) => (
        <View key={dado.id} style={styles.dado}>
          <Text style={styles.titulo}>Informações: </Text>
          <View>
            <Text style={styles.info}>
            <Text style={styles.subtitle}>- Dia: </Text>{dado.timestamp}</Text>
          </View>
          <View>
            <Text style={styles.info}><Text style={styles.subtitle}>- Valor: </Text>{dado.valor}{unidade}</Text>
          </View>
        </View>
      ))}
      </View>
    </ScrollView>
  )
}