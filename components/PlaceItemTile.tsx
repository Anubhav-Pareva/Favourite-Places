import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constant/colors';

export default function PlaceItemTile({
  place,
  onPress=()=>console.log('heloo world'),
}: {
  place: any;
  onPress: (id:string) => void;
}) {
  const handlePress = ()=>{
    onPress(place.id);
  }
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        pressed ? styles.pressed : null,
      ]}
      onPress={handlePress}
    >
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: place?.imageUri }}
            style={styles.imageStyle}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{place?.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.75,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  text: {
    color: colors.primary700,
    fontSize: 18,
    fontWeight: 600,
  },
});
