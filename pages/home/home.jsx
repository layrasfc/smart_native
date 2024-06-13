import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import { styles } from './styles.jsx';

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
    <View style={styles.container}>
      <View style={styles.content}>
      <View style={styles.banner}>
        <View style={styles.logo}>
      <Image
          style={styles.logoImg}
          source={require('../../assets/logotipo.png')}
        />
      </View>
      <View style={styles.infoBanner}>
        <View style={styles.esq}>
          <View style={styles.infoCont}>
          <Text style={styles.infoText}>SmartCity</Text>
        </View>
        <Text style={styles.tituloPage}>
        Seu aliado na gestão do conforto escolar
        </Text>
        </View>
        <View style={styles.dir}>
          <Image
        style={styles.illusBanner}
        source={require('../../assets/illus.png')}
        /> 
        </View>
        
        

      </View>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionsTitle}>
           <View style={styles.infoCont}>
          <Text style={styles.infoText}>Descubra</Text>
        </View>
        <Text style={styles.subtituloPage}>
        O quê gostaria de realizar hoje?
        </Text>
        </View>

        <View style={styles.optionsButtons}>
          <TouchableOpacity style={styles.btHome}>
            <View style={styles.btInfo}>
            <Image
            style={styles.btImg}
            source={require('../../assets/mapa.png')}
            />
            <Text style={styles.btText}>Visualizar mapa sensores</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btHome}>
          <View style={styles.btInfo}>
          <Image
            style={styles.btImg}
            source={require('../../assets/salas.png')}
            />
            <Text style={styles.btText}>Visualizar todas as salas</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      </View>
    </View>
  )
}