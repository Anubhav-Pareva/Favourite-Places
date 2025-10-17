import { Alert, Image, StyleSheet, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { images } from '../constant/images';
import ImagePicker from 'react-native-image-crop-picker';
import { useState } from 'react';
type CameraInputProps={
    imageUrl: string | undefined;
    setImageUrl: (agr:string | undefined)=>void
}
export default function CameraInput({imageUrl, setImageUrl}:CameraInputProps) {
    const handleImagePicker = async () =>{
        try{
        const image = await ImagePicker.openPicker({
            width:300,
            height:200,
            cropping:true,
        })
        setImageUrl(image?.sourceURL);
    }
    catch(err:any){
        Alert.alert(err);
    }
    }
  return (
    <View>
      <View style={styles.imageWrapper}>
        <Image
          source={imageUrl !== '' ? {uri:imageUrl} : images.imagePlaceholder}
          style={styles.imageStyle}
          resizeMode="cover"
        />
      </View>
      <PrimaryButton title='Add Picture' onPress={handleImagePicker} isIcon={true} icon={images.camera}/>
    </View>
  );
}

const styles = StyleSheet.create({
    imageWrapper:{
        alignItems:'center',
        marginVertical:4
    },
  imageStyle: {
    width: '100%',
    height: 200,
  },
});
