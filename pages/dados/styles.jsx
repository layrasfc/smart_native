import { StyleSheet } from "react-native"


const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        
        
    },
    dado: {
        backgroundColor: 'white',
        padding: 20,
        width: '90%',
        borderRadius: 5,
        elevation: 1,
    },
    options: {
        flex: 1,
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color:  "#407BFF"
    },
    info: {
        fontSize: 15,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    principalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default styles;