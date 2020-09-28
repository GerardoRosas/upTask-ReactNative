import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//Importamos la configuración de apollo
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';

const upTaks = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)


AppRegistry.registerComponent(appName, () => upTaks);
