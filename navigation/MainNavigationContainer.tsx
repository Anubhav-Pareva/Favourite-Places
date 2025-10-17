import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from '../screens/AllPlaces';
import PlaceDetail from '../screens/PlaceDetail';
import AddPlace from '../screens/AddPlace';
import Map from '../screens/Map';
import { Image, Pressable } from 'react-native';
const Stack = createNativeStackNavigator();
export default function MainNavigationContainer() {
  return (
    <PlacesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary500 },
            headerTintColor: colors.black,
            contentStyle: {
              backgroundColor: colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              headerRight: () => (
                <Pressable
                  style={({ pressed }) =>
                    pressed ? styles.pressedStyle : null
                  }
                  onPress={() => navigation.navigate('AddPlace')}
                >
                  <Image
                    source={images.add}
                    style={{ width: 24, height: 24, marginRight: 16 }}
                  />
                </Pressable>
              ),
              headerTitle: 'All Places',
            })}
          />
          <Stack.Screen
            name="PlaceDetail"
            component={PlaceDetail}
            options={{
              headerTitle: 'Place Detail',
            }}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              headerTitle: 'Add Place',
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerTitle: 'Place Location',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PlacesContextProvider>
  );
}
import { StyleSheet } from 'react-native';
import { images } from '../constant/images';
import { colors } from '../constant/colors';
import { PlacesContextProvider } from '../context/PlacesContext';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#ffffff',
  },
  listStyle: {
    paddingVertical: 12,
  },
  pressedStyle: {
    opacity: 0.25,
  },
});
