import { StyleSheet, Text } from "react-native";
import { colors } from "../constant/colors";

type ErrorTextProps = {
    errorMessage:string
}

export default function ErrorText({errorMessage}:ErrorTextProps){
    return(
        <Text style={styles.errorText}>{errorMessage}</Text>
    )
}

const styles = StyleSheet.create({
    errorText:{
        color:colors.error50,
        fontSize:16,
        fontWeight:'600',
      },
});