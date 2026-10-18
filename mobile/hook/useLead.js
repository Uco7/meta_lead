import { useContext } from "react";
import {LeadContext} from "../context/leadContext";
export const useLead=()=>{
    const context=useContext(LeadContext)
    if(!context){
        throw new Error("lead must be used inside a lead provider")
    }
    return context
}