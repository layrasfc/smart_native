
import { Text, View, Image, Pressable } from 'react-native';
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

export default function Mapa() {
  const[location, setLocation] = useState(null);
  const[lat, setLat] = useState(null);
  const[long, setLong] = useState(null);
  const mapRef = useRef(MapView);
  const [mensagem, setMensagem] = useState(null)
  const[sensores, setSensores] = useState([])
  const[indiceMenor, setIndiceMenor] = useState(null)

  const latSensor = -22.9143462
  const longSensor = -47.0686296

  useEffect(() => {
    AsyncStorage.getItem('token')
    .then(async(token) => {
        const response = await axios.get('https://layrasfc.pythonanywhere.com/api/sensores/',
          {
          headers:
            {
              'Authorization': `Bearer ${token}`
            }}
          )
        const lista = response.data
        setSensores(lista.slice(0, 3))
      })
      }, [])
          

  // Pegar o menor valor
  useEffect(() => {
    var distancias = []
    for (let i = 0; i < sensores.length; i++) {
      const sensor = sensores[i];
      let sensorLat = sensor.latitude
      let sensorLong = sensor.longitude
      distancias.push(verificarDistancia(sensorLat, sensorLong))
    }
    var menorValor = Math.min(...distancias)

    setIndiceMenor(distancias.indexOf(menorValor))
    console.log(indiceMenor);
    
  }, [lat, long, sensores])

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


  const verificarDistancia = (sensorLat, sensorLong) => {
    if(lat && long){
      var distancia = getDistance(
      {latitude: lat, longitude: long},
      {latitude: sensorLat, longitude: sensorLong}
    )
    return distancia
    } 
  }



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
          
          
              {/* <Marker pinColor='blue' onPress={()=> {console.log("Cliquei");}}coordinate={{latitude: latSensor, longitude: longSensor}}>
            <Image style={styles.sensorImg} source={require('./assets/SensorImg.png')}/>
            </Marker>  */}
            <Marker pinColor='blue' onPress={()=> {console.log("Cliquei");}} coordinate={{latitude: latSensor, longitude: longSensor}}/>
       
            <Polyline
            coordinates={[
              { latitude: lat, longitude: long },
              { latitude: latSensor, longitude: longSensor }
            ]}
            strokeColor="#d90000"
            strokeWidth={2}
          />
          </MapView>

        }

    </View>

  );
}


