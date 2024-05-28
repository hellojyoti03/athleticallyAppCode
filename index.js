/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
	webClientId: "931334454225-12a6ifc2hvn88oi8se2ks63u5hvu4d19.apps.googleusercontent.com",
	androidClientId:"931334454225-psus81o19tr6j14f2gvs5uv9frgigmlh.apps.googleusercontent.com",
	
	scopes: ['profile', 'email'],
});

AppRegistry.registerComponent(appName, () => App);
