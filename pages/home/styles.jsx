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
    paddingHorizontal: 20,
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
    alignItems: 'center',
    
  },

  optionsTitle: {
    gap: 10,
    marginVertical: 30,
    width: '100%',
    paddingHorizontal: 10,
  },

  optionsButtons: {
    width: '90%',
    flex: 1,
    gap: 20,
    justifyContent: 'center',
  },

  btHome: {
    height: '40%',
    backgroundColor: '#F7F7F7',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#63768D',
    flexDirection: 'row',

    elevation: 2,
  },

  btImg: {
    width: '30%',
    resizeMode: 'contain',
    
  },

  btInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 13,
  },

  btText: {
    width: '45%',
    fontWeight: 'bold',
    fontSize: 19,
    color: '#63768D',

  }
});
