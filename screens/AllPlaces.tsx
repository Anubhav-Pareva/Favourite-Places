import { FlatList, StyleSheet, Text, View } from 'react-native';
import SafeAreaContainer from '../components/SafeAreaContainer';
import { useContext } from 'react';
import { PlacesContext } from '../context/PlacesContext';
import PlaceItemTile from '../components/PlaceItemTile';
import NoDataFound from '../components/NoDataFound';
import { useNavigation } from '@react-navigation/native';

export default function AllPlaces() {
  const navigation = useNavigation<any>();
  const { places } = useContext(PlacesContext);
  const handlePlaceTilePress = (id:string) =>{
    navigation.navigate('PlaceDetail',{id:id});
  }
  function renderPlacesList({ item }: { item: any }) {
    return <PlaceItemTile place={item} onPress={handlePlaceTilePress}/>;
  }
  const handleAddPlace = () => {
    navigation.navigate('AddPlace');
  };
  return (
    <SafeAreaContainer>
      <FlatList
      style={styles.listStyle}
        data={places}
        renderItem={renderPlacesList}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <NoDataFound
            title={'No Favourite Places Found'}
            btnTitle="Add Now"
            onPress={handleAddPlace}
          />
        }
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  listStyle:{
    paddingVertical:12,
    paddingHorizontal:12
  }
});