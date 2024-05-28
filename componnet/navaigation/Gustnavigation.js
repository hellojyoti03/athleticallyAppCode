import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Signin from '../../src/Signin';
import Homeee from '../Screen/Homeee';



const GuestStackNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Signin' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="Homeee" component={Homeee} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default GuestStackNavigator;

const styles = StyleSheet.create({})