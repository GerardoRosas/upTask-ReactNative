import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Container, Button, H1, Form, Item, Toast, Input } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';

const NUEVO_PROYECTO = gql`
    mutation nuevoProyecto($input: ProyectoInput){
        nuevoProyecto(input: $input){
            nombre,
            id
        }
    }
`;

//Estilos globales
import globalStyles from '../styles/Global';



const NuevoProyecto = () => {

    //navigation
    const navigation = useNavigation();
    
    const [mensaje, guardarMensaje ] = useState(null);
    const [nombre, guardarNombre ] = useState('');

    //Apollo
    const [ nuevoProyecto ] = useMutation(NUEVO_PROYECTO);

    //Muestra un mensaje Toast
    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'Ok',
            duration: 5000
        })
    }

    //Validar crear Proyecto
    const handleSubmit = async () => {
        if(nombre === ''){
            guardarMensaje('El nombre del proyecto es obligatorio');

            return;
        }

        //Guardar el proyecto en la base de datos
        try {
            const { data } = await nuevoProyecto({
                variables:{
                    input:{
                        nombre
                    }
                }
            });
            //console.log(data);
            guardarMensaje('Proyecto Creado Correctamente');
            navigation.navigate('Proyectos');

        } catch (error) {
            //console.log(error);
            guardarMensaje(error.message.replace('GraphQL error:', ''));
            
        }
    }

    return (  
        <Container style={[globalStyles.contenedor], {backgroundColor: '#E84347'}}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.subtitulo}>Nuevo Proyecto</H1>
            
            
                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Nombre del Proyecto"
                            onChangeText={texto => guardarNombre(texto)}
                        />
                    </Item>
                </Form>

                    <Button
                        style={[globalStyles.boton, {marginTop: 30}]}
                        square
                        block
                        onPress={() => handleSubmit()}
                    >
                        <Text style={globalStyles.botonTexto}>Crear</Text>
                    </Button>

                    {mensaje && mostrarAlerta()}
            </View>
            
        </Container>
    );
}
 
export default NuevoProyecto;