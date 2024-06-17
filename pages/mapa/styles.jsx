import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  map: {
    width: '100%',
    height: '100%',
  },

  formButton: {
    backgroundColor: '#3083E5',
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },


  // Modal
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Optional: Semi-transparent background
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    elevation: 10,
  },
  fecharButton: {
    backgroundColor: '#f44336',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
});
