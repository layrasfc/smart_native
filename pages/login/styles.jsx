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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
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

  title: {
    // backgroundColor: 'pink',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 20,
  },

  form: {
    
    // backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
  },
  campo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  formInput: {
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 15,
    color: '#B0B0B0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C5C5C5',
  },
  formButton: {
    width: '100%',
    backgroundColor: '#3083E5',
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    
  },
 
  label: {
    fontSize: 18,
    color: '#6C6C6C'
  },

  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
  },
  formContent: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: 70,
  
  },


});
