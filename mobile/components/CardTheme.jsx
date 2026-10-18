import { StyleSheet,useColorScheme,Text , View} from "react-native";
import React from 'react'
import { colors } from "../constant/colors";

const CardTheme =  ({style, ...prop}) => {
      const colorScheme=useColorScheme();
        const theme=colors[colorScheme]??colors.light
  return (
    <View 
    style={[{backgroundColor:theme.cardColor},styles.card, {borderColor:theme.borderColor} ,style]}
    
    {...prop}
    />
      
  )
}

export default CardTheme

const styles = StyleSheet.create({
    card:{
        width:"95%",
        padding:10,
        margin:10,
        marginBottom:10,
        borderWidth:1,
        borderRadius:10,
       
    }
})