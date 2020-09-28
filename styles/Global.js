import {  StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
    contenedor:{
        flex: 1,

    },
    contenido:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1
    },
    titulo:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF'
    },
    input:{
        backgroundColor: "#FFF",
        marginBottom: 20
    },
    boton:{
        backgroundColor: '#28303B',
    },
    botonTexto:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
    },
    enlace:{
        color: '#FFF',
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 18
    },
    subtitulo:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 20
    }
})

export default globalStyles;