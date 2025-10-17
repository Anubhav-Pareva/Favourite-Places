import { Image, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { colors } from '../constant/colors';
import { images } from '../constant/images';

type NoDataFoundProps = {
    title:string;
    onPress:()=>void;
    btnTitle:string;
}

export default function NoDataFound({title, onPress, btnTitle}:NoDataFoundProps) {
  return (
    <View style={styles.container}>
      <Image
        source={images.emptyBox}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <PrimaryButton title={btnTitle} onPress={onPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    gap:8
  },
  imageStyle: {
    width: 250,
    height: 250,
  },
  title:{
    color: colors.white,
    fontSize:18,
  }
});
