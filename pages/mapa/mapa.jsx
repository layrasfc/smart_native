
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles.jsx';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState,
   useRef // Usar uma referencia
  } from 'react';
import { 
  // Permissão de acesso à localização
  requestForegroundPermissionsAsync,
  // Pegar acesso do celular
  getCurrentPositionAsync,
  // Observar mudanças na localização
  watchPositionAsync,
  // Escolher quão preciso será
  LocationAccuracy,
 } from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';

// Calculo de distância
import { getDistance } from 'geolib';
import axios from 'axios';


export default function Mapa({ navigation }) {
  const[location, setLocation] = useState(null);
  const[lat, setLat] = useState(null);
  const[long, setLong] = useState(null);
  const mapRef = useRef(MapView);

  const [mensagem, setMensagem] = useState(null)
  const[sensores, setSensores] = useState([])
  const[token, setToken] = useState(null)

  const[sensorId, setSensorId] = useState(0)


  useEffect(() =>{
    const pegarToken = async() => {
      const tokenSalvo = await AsyncStorage.getItem('token')
      setToken(tokenSalvo)
    }

    pegarToken()
  }, [])

  useEffect(() => {
    if(token){
      const pegarSensores = async() => {
        let lista = []
        for (let i = 1; i <= 9; i++) {
          try{
          const response = await axios.get(`https://layrasfc.pythonanywhere.com/api/sensores/${i}`,
          {
          headers:
            {
              'Authorization': `Bearer ${token}`
            }
          })
          
          lista.push(response.data)
        }catch(error){
          console.error(`Não foi possível pegar o sensor ${i}: `, error);
        }}
        setSensores(lista);
      }

      pegarSensores()
    } 
  }, [token])


  // Função assíncrona para verificar o acesso
  const solicitarAcesso = async () => {
    // Armazenar a escolha
    const { granted } = await requestForegroundPermissionsAsync();
    if(granted){
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setLat(currentPosition.coords.latitude);
      setLong(currentPosition.coords.longitude);
    }}
  
  useEffect(() => {
    if(sensorId != 0) {
      const sensor = sensores.find(sensor => sensor.id === sensorId)
      
      setMensagem(
        <View><Text>Informações do sensor:</Text>
        <Text>Tipo: {sensor.tipo}</Text>
        <Text>Localização: {sensor.localizacao}</Text>
        <Text>Responsaveis: {sensor.responsavel}</Text>
        <Text>Status: {sensor.status_operacional ? "Ligado" : "Desligado"}</Text>
        <Text>Distância em relação ao sensor: {getDistance({latitude: sensor.latitude, longitude: sensor.longitude}, {latitude: lat, longitude: long})}km</Text>
        <TouchableOpacity style={styles.formButton} onPress={() => {pegarDados(sensor.id, sensor.tipo.toLowerCase())}}><Text>Ver mais</Text></TouchableOpacity>
        </View>
      )

    }
  }, [sensorId])

  const pegarDados = async(id, tipo) => {
    const sensor = sensores.find(sensor => sensor.id === id)
    const response = await axios.post(`https://layrasfc.pythonanywhere.com/api/${tipo}_filter/`, 
      {
        sensor_id: id
      },
      {
        headers:
          {
            'Authorization': `Bearer ${token}`
          }
        })
    const dados = response.data.results
    const titulo = sensor.tipo
    const unidade = sensor.unidade_medida
    navigation.navigate('Dados', {dados, titulo, unidade})
  }

  // Pegar a localização padrão
  useEffect(() => {
    solicitarAcesso();
  }, []);

  // Mudar em tempo real
  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest, // alta precisão
      timeInterval: 1000, // tempo de mudança, 1000 milisegundos
      distanceInterval: 1,
    }, (response) => { // Armazenar as alterações

      // Definir que a posição atual estará sempre centralizada
      mapRef.current?.animateCamera({
        center: response.coords
      })

      setLocation(response)
      setLat(response.coords.latitude)
      setLong(response.coords.longitude)
    })
  }, [])



  return (
    <View style={styles.container}>
      {
        // Se tiver alguma localização
        location && 
        <MapView 
        ref={mapRef} // A referência será a posição atual
        style={styles.map} 
        initialRegion={{
          latitude: lat, 
          longitude: long, 
          latitudeDelta: 0.005, // valor padrão!
          longitudeDelta: 0.005,
        }}>
          {/* Colocar um marcador da posição no mapa */}
          <Marker
          title="Posição atual"
          description="Sua posição na escola!"
          coordinate={{latitude: lat, longitude: long}}/>
          {sensores.length > 0 ? 
            sensores.map(sensor => {
              return <Marker key={sensor.id} 
              pinColor='blue' 
              onPress={()=> {
                setSensorId(sensor.id)
              }} 
              coordinate={{latitude: sensor.latitude, longitude: sensor.longitude}}
              description={sensor.localizacao}
              />
            }) : () => console.log("Não deu")
            }
              

            {/* <Polyline
            coordinates={[
              { latitude: lat, longitude: long },
              { latitude: latSensor, longitude: longSensor }
            ]}
            strokeColor="#d90000"
            strokeWidth={2}
          /> */}
          </MapView>
          

        }
    
    {mensagem}
    </View>


  );
}


