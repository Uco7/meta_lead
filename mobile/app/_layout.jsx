import {useColorScheme,StyleSheet} from "react-native"
import { StatusBar } from "expo-status-bar"
import {Stack} from 'expo-router'
import { colors } from "../constant/colors"
import { LeadProvider } from "../context/leadContext"
const RootLayout=()=>{
    const colorScheme=useColorScheme();
        console.log("colorScheme",colorScheme)

    const theme=colors[colorScheme]??colors.light

    return(
        <LeadProvider>

    <>
        <StatusBar style='auto'/>
        <Stack screenOptions={{ headerStyle:{
            backgroundColor:theme.headerColor
        },
        headerTitleStyle:{
            color:theme.primaryText
        },
        headerTintColor:{ color:theme.primaryText}
           
       
        }} >
            <Stack.Screen name="index" options={
                {
                    title:"Meta Lead Test Ads"
                }
            } />


        </Stack>
    </>
        </LeadProvider>
    )

}
export default RootLayout