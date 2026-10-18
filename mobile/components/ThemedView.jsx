import { StyleSheet, View,useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import React from 'react'
import { colors } from '../constant/colors';

const ThemedView = ({style,safe=false, ...prop}) => {
    const colorScheme=useColorScheme();
    console.log("colorScheme",colorScheme)
    const theme=colors[colorScheme]??colors.light
    if(!safe) return(
        
        <View 
        style={[{backgroundColor:theme.background}]}
        
        {...prop}
        />
    )
    
    const inset=useSafeAreaInsets();
    return (
         <View 
        style={[{backgroundColor:theme.background,
             paddingTop:inset.top,paddingBottom:inset.bottom},styles.container,style]}
        
        {...prop}
        />
)
}

export default ThemedView

const styles = StyleSheet.create({
    container:{
        flex:1,
        // marginTop:10
    }
})