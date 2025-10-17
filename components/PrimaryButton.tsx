import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../constant/colors';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  isIcon?: boolean;
  icon?: ImageSourcePropType;
  style?:{} | undefined;
};

export default function PrimaryButton({
  title,
  onPress,
  isIcon = false,
  icon,
  style=undefined
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressableStyle,
        pressed ? styles.pressedStyle : null,
        style ? style : null
      ]}
    >
      <View style={styles.titleWrapper}>
        {isIcon && <Image source={icon} style={styles.imageStyle} resizeMode="contain" />}
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableStyle: {
    borderWidth: 1,
    borderColor: colors.primary200,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
    marginVertical: 6,
  },
  pressedStyle: {
    opacity:0.75
  },
  title: {
    color: colors.primary50,
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    alignItems:'flex-end'
  },
  titleWrapper: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:8
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
});
