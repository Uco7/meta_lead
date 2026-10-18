import { createContext,useState,useEffect } from "react";
import {io} from "socket.io-client"
export const LeadContext=createContext();
   const backEnd_URL="http://192.168.0.130:5000"
export const LeadProvider=({children})=>{
    const [leads, setLead]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null)
    useEffect(()=>{
        const socket=io(backEnd_URL,{
            transports:["websocket"]
        })
        socket.on("connect",()=>{
            console.log("socket have connected ");
            setError(null)
        })
        socket.on("newLead",(newLead)=>{
            console.log("newleads",newLead)
            setLead((currentLeads)=>{
                const alreadyExistLeads=currentLeads.some(
                    (lead)=>lead.metaLead_id===newLead.metaLead_id)
                    if(alreadyExistLeads){
                        return currentLeads
                    }
                    return [newLead, ...currentLeads]
            })
        })
        socket.on("connect_error",(err)=>{
            console.log("connection to socket sever failed",err.message);
            setError("unable to connect to socket server")

        })
        return ()=>{
            socket.disconnect()
        }

    },[])
    return(
        <LeadContext.Provider value={{leads,setLead,loading, setLoading,setError,error}}>
            {children}
        </LeadContext.Provider>
    )
}