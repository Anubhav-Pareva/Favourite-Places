import { StyleSheet, View } from 'react-native';
import SafeAreaContainer from '../components/SafeAreaContainer';
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Map() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const onLocationPicked = route.params.onLocationPicked;
  const regionTempData = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [flag, setFlag] = useState(false);
  const [region, setRegion] = useState(regionTempData);

  const handleMapPress = (event: any) => {
    setFlag(true);
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;
    setRegion(prev => ({ ...prev, latitude: lat, longitude: long }));
  };
  const handleSaveLocation = () => {
    console.log('inside map reegion:', region);
    onLocationPicked(region);
    navigation.goBack();
    setRegion(regionTempData);
  };
  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <MapView
          initialRegion={region}
          region={region}
          style={styles.mapStyle}
          onPress={handleMapPress}
        >
          {flag && (
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            />
          )}
        </MapView>
        <PrimaryButton title="Save Location" onPress={handleSaveLocation} />
      </View>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  mapStyle: {
    flex: 1,
  },
});
