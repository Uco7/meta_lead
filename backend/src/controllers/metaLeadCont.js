import Leads from '../models/LeadsModel.js'
export const verifyWebHookParameters=(req,res)=>{
    try {
        const mode=req.query['hub.mode'];
        console.log("mode:",mode)
        const token=req.query['hub.verify_token'];
        console.log("token:",token)
        const challenge=req.query['hub.challenge'];
        console.log("challenge:",challenge)
        if(
            mode==="subscribe"&&token===process.env.VERIFY_METAWEBHOOK_TOKEN
        ){
            console.log("challenge",challenge)
            return res.status(200).send(challenge)
        }
        return res.status(403).json({
            status:false,
            message:"webHook  verification faile "
        })


        
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            message:"internal server error"
        })
        
    }

}

export const metaLead_req_body=async(req,res)=>{
    try {
        const body=req.body
        const io=req.app.get("io")
        
        console.log("body datas:",body)
        const leadEventDatas=[];
        if(!body||!Array.isArray(body.entry)) return res.status(400).json({
            status:false,
            message:"empty body of webhook payload"
        })
        const accessToken=process.env.META_PAGE_ACCESS_TOKEN
        if(!accessToken){
            console.log("access token is missing from env")
        }
           body.entry.forEach((entry)=>{
            if(!Array.isArray(entry.changes)){
                return
            }

            entry.changes.forEach((change)=>{
                if(change.field!=="leadgen"){
                    return
                }
                const changeLeadData=change.value;
                if(!changeLeadData.leadgen_id){
                     console.log("webhook leaddata recieved with no leadgenId");
                     return
                }
                const leadId=changeLeadData.leadgen_id;
                const form_id=changeLeadData.form_id;
                const page_id=changeLeadData.page_id;
                console.log("leadgen ID:",leadId);
                console.log("form ID",form_id);
                console.log("page ID",page_id);
                leadEventDatas.push({
                    leadId,
                    form_id,
                    page_id

                });
                console.log("leaddatas event",leadEventDatas)
                
            })
           
           })
            if(leadEventDatas.length===0){
                    console.log("no lead eventdatas")
                    return res.sendStatus(200)
                }
           const metaLeadFullDatas=await Promise.allSettled(
            leadEventDatas.map(async(leadEventData)=>{
                const url=new URL(`https://graph.facebook.com/v26.0/${encodeURIComponent(
                    leadEventData.leadId
                )}`);
                url.searchParams.set(
                     "fields",
                    "id,created_time,form_id,field_data"
    
                );
                console.log("Lead ID:", leadEventData.leadId);

                const response=await fetch(url,{
                    headers:{
                        Authorization:`Bearer ${accessToken}`
                    }
                })
                const result= await response.json();
                if(!response.ok){
                    console.log("metat lead api request failed",{
                        status:response.status,
                        message:result?.error.message,
                        code:result?.error.code
                    })
                    throw new Error("failed to retieve lead details from meta  api")

                }
                console.log("retieved data",{
                    id: result.id,
                    form_id: result.form_id,
                    created_time: result.created_time,
                    field_data: result.field_data

                })
                return {
                    ...result,
                    page_id:leadEventData.page_id

                }

            })
           )
       
           console.log("meta lead data lenght",metaLeadFullDatas.length)
           const successfull_leads=metaLeadFullDatas
           .filter((item)=>item.status==="fulfilled")
           const unsuccessfull_leads=metaLeadFullDatas
           .filter((item)=>item.status==="rejected");
           for(const item of successfull_leads){
            const lead_data=item.value
            const leadField_data=lead_data.field_data??[];
            const fullName=leadField_data.find((field)=>field.name==="full_name")?.values?.[0] ??""
            const email=leadField_data.find((field)=>field.name==="email")?.values?.[0]??""
            const result= await Leads.updateOne(
                {metaLead_id:lead_data.id},
                {
                    $setOnInsert:{
                        metaLead_id:lead_data.id,
                        page_id:lead_data.page_id,
                        form_id:lead_data.form_id,
                        fullName,
                        email,
                        createdTime:lead_data.created_time?new Date(lead_data.created_time): undefined

                    }
                },
                {
                    upsert:true,
                    runValidators:true
                }
          )
          console.log("lead data ID:",lead_data.id)
          if(result.upsertedCount===1){
            const  savedLead=await Leads.findOne(
                {metaLead_id:lead_data.id}
            ).lean();
            if(savedLead){
                
                io.emit("newLead",savedLead)
                console.log("savedLead and emited",savedLead.metaLead_id);
            }
          }else{
            console.log("lead allredy existed; event not emited")
          }
          
        }
        console.log("unsuccessfull lead",unsuccessfull_leads)
        return res.sendStatus(200)
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            status:false,
            message:"internal server error"
        })
        
    }

} 