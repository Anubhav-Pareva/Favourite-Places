import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../constant/colors';
type CustomTextInputProps = {
  label: string;
  value: string;
  setValue: (arg: string) => void;
};
export default function CustomTextInput({
  label,
  value,
  setValue,
}: CustomTextInputProps) {
  return (
    <View>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        style={styles.inputStyle}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    color: colors.primary500,
    fontWeight: 'bold',
    marginBottom:4,
  },
  inputStyle: {
    backgroundColor: colors.primary100,
    marginVertical:4,
    paddingVertical:8,
    paddingHorizontal:4,
    fontSize:16,
    borderBottomColor:colors.primary700,
    borderBottomWidth:2
  },
});
