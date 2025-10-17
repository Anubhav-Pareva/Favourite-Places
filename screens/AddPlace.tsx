import { ScrollView, StyleSheet, View } from 'react-native';
import SafeAreaContainer from '../components/SafeAreaContainer';
import CustomTitle from '../components/CustomTitle';
import CustomTextInput from '../components/CustomTextInput';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import CameraInput from '../components/CameraInput';
import LocationInput from '../components/LocationInput';
import ErrorText from '../components/ErrorText';
import { Region } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { images } from '../constant/images';
import IconButton from '../components/IconButton';
import { PlacesContext } from '../context/PlacesContext';

export default function AddPlace() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const id = route?.params?.id;
  const [placeName, setPlaceName] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [region, setRegion] = useState<Region | null>(null);
  const [error, setError] = useState({
    placeError: false,
    imageError: false,
    regionError: false,
  });
  const { addPlace, getPlace, updatePlace } = useContext(PlacesContext);
  useEffect(() => {
    if (id) {
      const placeData: any = getPlace(id);
      setPlaceName(placeData?.name);
      setImageUrl(placeData?.imageUri);
      setRegion(placeData?.location);
    }
  }, [navigation, id]);
  const handleSaveBtn = () => {
    if (
      placeName === '' ||
      imageUrl === '' ||
      region === null ||
      region === undefined
    ) {
      setError({
        placeError: placeName === '',
        imageError: imageUrl === '',
        regionError: region === null || region === undefined,
      });
      return;
    }
    if (id) {
      updatePlace(id, {
        placeName,
        placeImage: imageUrl || '',
        placeLocation: region,
      });
    } else {
      addPlace({
        placeName,
        placeImage: imageUrl || '',
        placeLocation: region,
      });
    }
    setPlaceName('');
    setImageUrl('');
    setRegion(null);
    setError({
      placeError: false,
      imageError: false,
      regionError: false,
    });
    navigation.popToTop();
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        console.log(handleSaveBtn);
        return <IconButton onPress={handleSaveBtn} icon={images.save} />
      },
    });
  }, [navigation, handleSaveBtn]);
  return (
    <SafeAreaContainer>
      <View style={styles.container}>
        <CustomTitle
          title={
            id ? 'Update Your Favourite Place' : 'Add Your Favourite Place'
          }
        />

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <CustomTextInput
            label="Name your favourite place"
            value={placeName}
            setValue={setPlaceName}
          />
          {error?.placeError && (
            <ErrorText errorMessage="Title of Place is required" />
          )}
          <CameraInput imageUrl={imageUrl} setImageUrl={setImageUrl} />
          {error?.imageError && (
            <ErrorText errorMessage="Photo of Place is required" />
          )}
          <LocationInput coords={region} setCoords={setRegion} />
          {error?.regionError && (
            <ErrorText errorMessage="Location of Place is required" />
          )}
        </ScrollView>
      </View>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 12,
    marginBottom: 24,
  },
});
