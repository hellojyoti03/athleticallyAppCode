import {StyleSheet} from 'react-native';
import React from 'react';
import Stacknavigation from './src/navigation/Stacknavigation';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/redux/store/Store';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacknavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
