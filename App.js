
import { Text, View, Image, Pressable } from 'react-native';
import { styles } from './styles';
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
import MapView, { Marker } from 'react-native-maps';

// Calculo de distância
import { getDistance } from 'geolib';




export default function App() {

  const[location, setLocation] = useState(null);
  const[lat, setLat] = useState(null);
  const[long, setLong] = useState(null);
  const mapRef = useRef(MapView);
  const [mensagem, setMensagem] = useState(null)

  const latSensor = -22.9141414329
  const longSensor = -47.0683364555

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

  const verificarDistancia = () => {
    if(lat && long){
      const distancia = getDistance(
      {latitude: lat, longitude: long},
      {latitude: latSensor, longitude: longSensor}
    )
    return `Distância em relação ao sensor mais próximo: ${distancia}m`
    } else {
      return "Pegando informações..."
    }
  }
  useEffect(() => {
    setMensagem(verificarDistancia())

  }, [lat, long])

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
          
          
              <Marker pinColor='blue' onPress={()=> {console.log("Cliquei");}}coordinate={{latitude: latSensor, longitude: longSensor}}>
            <Image style={styles.sensorImg} source={require('./assets/SensorImg.png')}/>
            </Marker> 
          </MapView>

        }
        <Text>{mensagem}</Text>
      
    </View>

  );
}


