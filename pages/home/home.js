import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"
import { Text, View } from "react-native"

export default function Home(){
  const [token, setToken] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('token')
    .then((tokenY) => {
      setToken(tokenY)
    })
    .catch(error => {
      console.error("Não é possível acessar a página: ", error);
    })

  })

  return(
    <Text>
      Olá
    </Text>
  )
}