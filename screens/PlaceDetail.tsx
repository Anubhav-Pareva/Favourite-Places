import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import SafeAreaContainer from '../components/SafeAreaContainer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { PlacesContext } from '../context/PlacesContext';
import { colors } from '../constant/colors';
import MapView, { Marker } from 'react-native-maps';
import { images } from '../constant/images';
import PrimaryButton from '../components/PrimaryButton';

export default function PlaceDetail() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { getPlace, deletePlace } = useContext(PlacesContext);
  const id = route?.params?.id;
  const place: any = getPlace(id);
  console.log('i am here:',place)
  const handleDeletePlace = ()=>{
    deletePlace(id);
    navigation.goBack();
  }
  const handleEditPlace = () =>{
    navigation.navigate('AddPlace', {id:id});
  }
  return (
    <SafeAreaContainer>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>{place?.name}</Text>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Place Photo:</Text>
          <Image
            source={{ uri: place?.imageUri }}
            style={styles.imageStyle}
            resizeMode="cover"
          />
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Place Location:</Text>
          <MapView style={styles.mapStyle} initialRegion={place?.location}>
            <Marker
              coordinate={{
                latitude: place?.location?.latitude,
                longitude: place?.location?.longitude,
              }}
            />
          </MapView>
        </View>
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title="Delete"
            isIcon
            icon={images.delete}
            onPress={handleDeletePlace}
            style={styles.buttonStyle}
          />
          <PrimaryButton
            title="Edit"
            isIcon
            icon={images.edit}
            style={styles.buttonStyle}
            onPress={handleEditPlace}
          />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contentContainer: {
    gap: 14,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 400,
    textAlign: 'center',
  },
  wrapper: {
    gap: 8,
  },
  text: {
    color: colors.primary200,
    fontSize: 16,
  },
  imageStyle: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  mapStyle: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:8
  },
  buttonStyle:{
    flex:1
  }
});
