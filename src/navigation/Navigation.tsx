import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Home from '../screens/Home/Home';
import Catch from '../screens/Catch/Catch';
import Places from '../screens/Places/Places';
import Footer from '../components/Footer/Footer';
import AddPlace from '../screens/AddPlace/AddPlace';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const ref = useNavigationContainerRef();
  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => setName(ref.getCurrentRoute()?.name), 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const listener = ref.addListener('state', () => {
      setName(ref.getCurrentRoute()?.name)
    })

    return () => {
      ref.removeListener('state', listener);
    }
  }, []);

  return (
    <>
      <NavigationContainer ref={ref}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Group>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Catch' component={Catch} />
            <Stack.Screen name='Places' component={Places} />
            <Stack.Screen name='AddPlace' component={AddPlace} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <Footer navigate={ref.navigate} currentRoute={name} />
    </>

  )
};

export default Navigation;
