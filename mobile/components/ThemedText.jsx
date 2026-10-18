import { StyleSheet,useColorScheme,Text } from "react-native";
import React from 'react'
import { colors } from "../constant/colors";

const ThemedText = ({style, ...prop}) => {
    const colorScheme=useColorScheme();
    const theme=colors[colorScheme]??colors.light
  return (
      <Text 
      style={[{color:theme.primaryTex},style]}

      
      {...prop}
      />
   
  )
}

export default ThemedText

const styles = StyleSheet.create({})