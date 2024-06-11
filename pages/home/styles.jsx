import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  content: {
    height: '90%',
    width: '100%',
    display: 'flex',
  },

  banner: {
    flex: 3,
    width: '100%',
    
  },



  logo: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  logoImg: {
    flex: 1,
    height: undefined,
    resizeMode: 'contain',
    width: "35%",
    marginHorizontal: 20,
  },

  infoBanner: {
    flex: 4,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  esq: {
    flex: 2 ,
    justifyContent: 'center',
    gap: 15,
    
  },

  dir: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  illusBanner: {
    width: "auto",
    height: "80%",
    resizeMode: 'contain',
  },
  infoCont: {
    backgroundColor: '#F8F9FE',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 5,
  },

  infoText: {
    fontSize: 15,
    color: "#407BFF",
    fontWeight: 'bold',
  },

  tituloPage: {
    fontSize: 23,
    fontWeight: '900',
  },

  subtituloPage: {

    fontSize: 19,
    fontWeight: '900',
    width: '45%',
  },
  
  optionsContainer: {
    flex: 5,
    width: '100%',
    paddingHorizontal: 15,
  },

  optionsTitle: {
    gap: 10,
  },
});
