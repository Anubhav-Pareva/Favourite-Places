import { StyleSheet, Text } from "react-native";
import { colors } from "../constant/colors";

export default function CustomTitle({title}:{title:string}){
    return(
        <Text style={styles.title}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    title:{
        color:colors.white,
        fontSize:24,
        textAlign:'center',
        fontWeight:'600',
        marginVertical:8
    }
});