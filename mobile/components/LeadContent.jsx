import { StyleSheet, Text, View,useColorScheme } from 'react-native'
import { colors } from "../constant/colors";
import ThemedText from '../components/ThemedText'


import React from 'react'


const LeadContent = ({lead}) => {
    const colorScheme=useColorScheme();
            const theme=colors[colorScheme]??colors.light
            const fullName=lead?.fullName||"no lead"
            const email=lead?.email||"lead unknown"
            const initial=lead.fullName.charAt(0).toUpperCase()
  return (
    <View style={styles.container}>
        <View style={[styles.avater,{backgroundColor:theme.primaryBlue}]}>
            <ThemedText style={styles.initialsText}>
                {initial}
            </ThemedText>
        </View>
     <View style={styles.leadContent}>
            <ThemedText style={styles.name}>
                {fullName}

            </ThemedText>
            <ThemedText style={[styles.email,{color:theme.secondaryText}]}>
                {email}

            </ThemedText>
            <ThemedText style={[styles.date,{color:theme.secondaryText}]}>
                {lead?.createdTime?new Date(lead.createdTime).toLocaleString():"Recently Recieved Lead"}

            </ThemedText>
            
        </View>
        <View style={[styles.badge,{backgroundColor:theme.success}]}>
            <ThemedText style={[styles.badgeText,{color:theme.secondaryTextColor}]}>
                New
            </ThemedText>

        </View>
</View>
      
  )
}

export default LeadContent

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"

    },
    avater:{
        width:40,
        height:40,
        borderRadius:"50%",
        alignItems:"center",
        padding:5

    },
    initialsText:{
        fontSize:16,
        fontWeight:"600",
        color:"#fff"


    },
    leadContent:{
        flex:1,
        padding:10,
        gap:6
    },
    name:{
        fontSize:14,
        fontWeight:"600"
    },
    email:{
        fontSize:14,
        fontWeight:"200"
    },
    date:{
        fontSize:12,
        marginTop:4
    },
    badge:{
        paddingHorizontal:9,
        paddingVertical:5,
        borderRadius:20,
        alignSelf:"flex-start"
    },
     badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

})