import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, H2, Content, List, ListItem, Left, Right, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';

const OBTENER_PROYECTOS = gql`
    query obtenerProyectos{
        obtenerProyectos{
            id
            nombre
        }
    }
`;

//Estilos globales
import globalStyles from '../styles/Global';

const Proyectos = () => {

    const navigation = useNavigation();

    //Apollo
    //data: lo datos una vez que se hizo la consulta
    //loading: cambia a true mientras se hace la consutla
    //Error: en caso de tener un error
    const { data, loading, error } = useQuery(OBTENER_PROYECTOS);

    console.log(data);
    console.log(loading);
    console.log(error);

    return (  
        
        <Container style={[globalStyles.contenedor], {backgroundColor: '#E84347'}}>
            <Button
                style={[globalStyles.boton, {marginTop: 30}]}
                square
                block
                onPress={() => navigation.navigate('NuevoProyecto')}
            >
                <Text style={globalStyles.botonTexto}>Nuevo Proyecto</Text>
            </Button>

            <H2 style={globalStyles.subtitulo}>Selecciona un Proyecto</H2>

            <Content>
                <List style={styles.contenido}>
                    {data.obtenerProyectos.map(proyecto => (
                        <ListItem
                            key={proyecto.id}
                            onPress={() => navigation.navigate('Proyecto', proyecto)}       
                        >
                            <Left>
                                <Text>{proyecto.nombre}</Text>
                            </Left>
                            <Right>

                            </Right>
                        </ListItem>
                        
                    ))}
                </List>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: '2.5%'
    }
})
 
export default Proyectos;