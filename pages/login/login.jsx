
import { Text, Pressable, View, Image, TextInput } from "react-native"
import { styles } from './styles.jsx';
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Login({ navigation }){

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    try {
      if(token){
        AsyncStorage.setItem('token', token)
      }
    }catch(error){
      console.error("Erro: ", error);
    }
  }, [token])

  const fazerLogin = async() => {
    try{
      const response = await axios.post(
        'https://layrasfc.pythonanywhere.com/api/token/', {        
        username: usuario,
        password: senha
      })
      console.log(response.data.access);
      setToken(response.data.access)
      navigation.navigate('Home')
    }catch(error){
      console.error("Deu erro: ", error);
      // setMessage("Não foi possível realizar o login, tente novamente.")
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.content}>
      <View style={styles.logo}>
        <Image
          style={styles.logoImg}
          source={require('../../assets/logo.png')}
        />
      </View>

      <View style={styles.formContainer}>
      <View style={styles.formContent}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Olá, bem-vindo(a)!</Text>
        <Text style={styles.titleText}>Para continuar <Text style={{color: '#3083E5'}}>faça seu login.</Text></Text>
      </View>

      <View style={styles.form}>
        <View style={styles.campo}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
        placeholder="Insira seu usuário aqui..."
        style={styles.formInput}
        value={usuario}
        onChangeText={setUsuario}
        />
        </View>
        <View style={styles.campo}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
        placeholder="Insira sua senha aqui..."
        style={styles.formInput}
        value={senha}
        secureTextEntry={true}
        onChangeText={setSenha}/>
        </View>
        
        <Pressable style={styles.formButton} onPress={fazerLogin}>
          <Text style={styles.textButton}>Entrar</Text>
        </Pressable>
        <Text>{message}</Text>
      </View></View></View></View>
      

    {/* <TouchableOpacity onPress={() => navigation.navigate('Principal')}><Text>Cliquei</Text></TouchableOpacity> */}
    </View>

  )
}