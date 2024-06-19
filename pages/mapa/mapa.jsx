
import { Text, View, TouchableOpacity, Modal } from 'react-native';
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
import MapView, { Marker} from 'react-native-maps';

// Calculo de distância
import { getDistance } from 'geolib';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';



export default function Mapa({ navigation }) {
  const[location, setLocation] = useState(null);
  const[lat, setLat] = useState(null);
  const[long, setLong] = useState(null);
  const mapRef = useRef(MapView);

  const[sensores, setSensores] = useState([])
  const[token, setToken] = useState(null)


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);



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

  
    const mostrarInfo = (id) => {
      const sensor = sensores.find((sensor) => sensor.id === id);
      setSelectedSensor(sensor);
      setModalVisible(true);
    };

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
    setModalVisible(!modalVisible)
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
          {selectedSensor && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.exitContainer}>
              <Text style={styles.modalTitle}>Informações do sensor</Text>
                <TouchableOpacity style={styles.exitBt} onPress={() => setModalVisible(!modalVisible)}>
                <Feather name="x" size={20} color={'#9D9D9D'} />
                </TouchableOpacity>
              </View>
              <View style={styles.textContainer}>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Tipo: </Text> 
                {selectedSensor.tipo}</Text>
              <Text style={styles.modalText}>
              <Text style={styles.boldText}>Localização: </Text> 
                {selectedSensor.localizacao}</Text>
              <Text style={styles.modalText}>
              <Text style={styles.boldText}>Responsáveis: </Text> 
                {selectedSensor.responsavel}</Text>
              <Text style={styles.modalText}>
              <Text style={styles.boldText}>Status: </Text> 
                {selectedSensor.status_operacional ? 'Ligado' : 'Desligado'}
              </Text>
              <Text style={styles.modalText}>
              <Text style={styles.boldText}>Distância em relação ao sensor: </Text> 
                {getDistance(
                  { latitude: selectedSensor.latitude, longitude: selectedSensor.longitude },
                  { latitude: lat, longitude: long }
                )} km
              </Text></View>
              <TouchableOpacity
                style={styles.formButton}
                onPress={() => {
                  pegarDados(selectedSensor.id, selectedSensor.tipo.toLowerCase());
                }}
              >
                <Text style={styles.textStyle}>Ver mais</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      
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
                mostrarInfo(sensor.id)
              }} 
              coordinate={{latitude: sensor.latitude, longitude: sensor.longitude}}
              description={sensor.localizacao}
              />
            }) : () => console.log("Não deu")
            }
              
          </MapView>
        }


    </View>


  );
}


