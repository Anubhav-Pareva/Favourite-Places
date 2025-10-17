import { Image, StyleSheet, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { images } from '../constant/images';
import {
  getUserLocation,
  handleRecenter,
} from '../utils/helperFunction';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';

type LocationInputProps = {
  coords: Region | null;
  setCoords: Dispatch<SetStateAction<Region | null>>;
};

export default function LocationInput({coords, setCoords}: LocationInputProps) {
  const MapRef = useRef<MapView>(null);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const region = route?.params?.region;
  const DEFAULT_DELTAS = { latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
  const handleCurrentLocation = async () => {
    const currentPosition: any = await getUserLocation();
    setCoords({
      latitude: Number(currentPosition?.coords?.latitude),
      longitude: Number(currentPosition?.coords?.longitude),
      ...DEFAULT_DELTAS
    });
    handleRecenter(MapRef, {
      latitude: Number(currentPosition?.coords?.latitude),
      longitude: Number(currentPosition?.coords?.longitude),
      ...DEFAULT_DELTAS
    });
  };
  const handlePickLocation = ()=>{
    navigation.navigate('Map',{onLocationPicked:(loc:any)=>{
      setCoords(loc);
    }});
  }
  useEffect(()=>{
    setCoords(region);
  },[])
  return (
    <View style={styles.conatiner}>
      <View style={styles.mapWrapper}>
        {coords?.latitude && coords?.longitude ? (
          <MapView
          ref={MapRef}
          style={{width:'100%', height:'100%'}}
            region={coords}
          >
            <Marker coordinate={{latitude:coords.latitude, longitude:coords.longitude}}/>
          </MapView>
        ) : (
          <Image
            source={images.locationPlaceholder}
            style={styles.imageStyle}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.actionWrapper}>
        <PrimaryButton
          onPress={handleCurrentLocation}
          title="Locate User"
          isIcon={true}
          icon={images.currentLocation}
        />
        <PrimaryButton
          onPress={handlePickLocation}
          title="Pin on Map"
          isIcon={true}
          icon={images.mapLocation}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    marginVertical: 8,
  },
  mapWrapper: {
    width: '100%',
    height: 200,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  actionWrapper: {},
});
