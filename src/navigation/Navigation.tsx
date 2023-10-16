import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Home from '../screens/Home/Home';
import Auth from '../screens/Auth/Auth';
import Places from '../screens/Places/Places';
import Footer from '../components/Footer/Footer';
import AddPlace from '../screens/AddPlace/AddPlace';
import Place from '../screens/Place/Place';
import GlobalMap from '../screens/GlobalMap/GlobalMap';
import Profile from '../screens/Profile/Profile';
import { useTheme } from '../hooks/useTheme';
import { useData } from '../hooks/useData';
import EditPlace from '../screens/EditPlace/EditPlace';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const ref = useNavigationContainerRef();
  const [name, setName] = useState<string | undefined>(undefined);

  const { themeStyles } = useTheme();
  const { currentUser } = useData();

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

  console.log(currentUser);


  return (
    <>
      <NavigationContainer ref={ref}>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: themeStyles.backgroundColor, animation: 'none' }}>

          {!currentUser ? (
            <Stack.Group>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Auth' component={Auth} />
              <Stack.Screen name='GlobalMap' component={GlobalMap} />
              <Stack.Screen name='Place' component={Place} />
            </Stack.Group>
          ) :
            (
              <Stack.Group>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Auth' component={Auth} />
                <Stack.Screen name='GlobalMap' component={GlobalMap} />
                <Stack.Screen name='Place' component={Place} />
                <Stack.Screen name='Profile' component={Profile} />
                <Stack.Screen name='Places' component={Places} />
                <Stack.Screen name='AddPlace' component={AddPlace} />
                <Stack.Screen name='EditPlace' component={EditPlace} />
              </Stack.Group>
            )
          }

        </Stack.Navigator>
      </NavigationContainer>
      <Footer navigate={ref.navigate} currentRoute={name} />
    </>

  )
};

export default Navigation;
