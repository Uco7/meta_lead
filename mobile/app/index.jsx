import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import ThemedView from '../components/ThemedView'
import CardTheme from '../components/CardTheme'
import ThemedText from '../components/ThemedText'
import LeadContent from '../components/LeadContent';
import {useLead} from "../hook/useLead"

const HomeScreen= () => {
  const {leads,error,loading}=useLead()

  return (
   <ThemedView safe={true} >
    <FlatList 
    data={leads}
    keyExtractor={(item)=>item.metaLead_id}
    contentContainerStyle={styles.list}
    ListHeaderComponent={
      <ThemedText style={styles.heading}>
        Meta Leads
      </ThemedText>
    }
    ListEmptyComponent={
      <ThemedText>
        {loading?"loading leads....":error||"No Leads Recieved"}

      </ThemedText>
    }
    
    
    renderItem={({item})=>(

    <CardTheme >
        <LeadContent lead={item}/>
       
    </CardTheme>
    )}
    
    
    />

   </ThemedView>
  )
}

export default  HomeScreen

const styles = StyleSheet.create({
  list:{
    padding:12,
    gap:6
  },
  heading:{
    fontSize:14,
    fontWeight:"600"
    
  }
    
})