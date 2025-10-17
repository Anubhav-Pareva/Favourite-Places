import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { colors } from '../constant/colors';

type IconButtonProps = {
  onPress: () => void;
  icon: ImageSourcePropType;
};

export default function IconButton({ onPress, icon }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressableStyle,
        pressed ? styles.pressedStyle : null,
      ]}
    >
      <View style={styles.titleWrapper}>
        <Image source={icon} style={styles.imageStyle} resizeMode="contain" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableStyle: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 6,
    marginVertical: 6,
  },
  pressedStyle: {
    opacity: 0.75,
  },
  title: {
    color: colors.primary50,
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    alignItems: 'flex-end',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
});
