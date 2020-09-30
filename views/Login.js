import React, { useState } from 'react';
import {View} from 'react-native'
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

//Estilos globales
import globalStyles from '../styles/Global';

//apollo 
import { gql, useMutation } from '@apollo/client';
const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput){
        autenticarUsuario(input: $input){
            token
        }
    }
`;

const Login = () => {

    //State del login
    const [ password, guardarPassword ] = useState('');
    const [ email, guardarEmail ] = useState('');

    const [mensaje, guardarMensaje ] = useState(null);

    //Mutation de apollo
    const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);


    //React Navigation
    const navigation = useNavigation();

    //Cuando el usuario presiona en iniciar sesiones
    const handleSubmit = async () => {
        //Validar
        if(email === '' || password === '') {
            //Mostrar Error
            guardarMensaje('Todos los campos son obligatorios');

            return;
        }

        try {
            //Autenticar al usuario
            const { data } = await autenticarUsuario({
                variables:{
                    input:{
                        email,
                        password
                    }
                }
            })

            const {token} = data.autenticarUsuario;
            //Colocar token en storage
            await AsyncStorage.setItem('token', token);

            //Redireccionar a proyectos
            navigation.navigate('Proyectos');

        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error:', ''));
        }
    }

    //Muestra un mensaje Toast
    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'Ok',
            duration: 5000
        })
    }

    return (  
        <Container style={ [ globalStyles.contenedor, {backgroundColor: '#E84347'}]  }>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>UpTask</H1>

                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Email"
                            onChangeText={ texto => guardarEmail(texto.toLowerCase())}
                            value={email}
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={ texto => guardarPassword(texto)}
                        />
                    </Item>
                </Form>

                <Button
                    square
                    block
                    style={globalStyles.boton}
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
                </Button>

                <Text 
                    onPress={() => navigation.navigate("CrearCuenta")}
                    style={globalStyles.enlace}
                >Crear Cuenta</Text>

                {mensaje && mostrarAlerta()}
                
            </View>
        </Container>
    );
}
 
export default Login;