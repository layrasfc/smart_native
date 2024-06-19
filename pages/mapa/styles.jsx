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
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    borderRadius: 2,
    width: '50%',
  },
  textStyle: {
    fontSize: 15,
  },
  textContainer: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },


  // Modal
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    margin: 30,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    elevation: 25,
  },
  exitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#407BFF',

  }
});
