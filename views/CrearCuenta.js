import React, { useState } from 'react';
import {View} from 'react-native'
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native'

//Estilos globales
import globalStyles from '../styles/Global';

//apollo 
import { gql, useMutation } from '@apollo/client';

const NUEVACUENTA = gql`
    mutation crearusuario($input: UsuarioInput){
        crearUsuario(input: $input)
    }
`;

const CrearCuenta = () => {

    //State del formulario
    const [ nombre, guardarNombre ] = useState('');
    const [ password, guardarPassword ] = useState('');
    const [ email, guardarEmail ] = useState('');

    const [mensaje, guardarMensaje ] = useState(null);

    //Mutation de apollo
    const [ crearUsuario ] = useMutation(NUEVACUENTA);
    
    
    //Cuando el usuario presione en crear cuenta
    const handleSubmit = async () => {
        //Validar
        if(nombre === '' || email === '' || password === '') {
            //Mostrar Error
            guardarMensaje('Todos los campos son obligatorios');

            return;
        }

        //Password al menos 6 caracteres
        if(password.length < 6){
            guardarMensaje('El password debe ser al menos 6 caracteres');
            return;
        }

        //Guardar Usuario
        try {
            //data es la respuesta del servidor
            const { data } = await crearUsuario({
                variables: {
                    input: {
                        nombre,
                        email,
                        password,                        
                    }
                }
            })
            guardarMensaje(data.crearUsuario);
            navigation.navigate('Login');
            

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

    //React Navigation
    const navigation = useNavigation();

    return (  
        <Container style={ [ globalStyles.contenedor, {backgroundColor: '#E84347'}]  }>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>UpTask</H1>

                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Nombre"
                            onChangeText={ texto => guardarNombre(texto)}
                        />
                    </Item> 
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Email"
                            onChangeText={ texto => guardarEmail(texto)}
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
                    <Text style={globalStyles.botonTexto}>Crear Cuenta</Text>
                </Button>

                {mensaje && mostrarAlerta()}
                
            </View>
        </Container>
    );
}
 
export default CrearCuenta;