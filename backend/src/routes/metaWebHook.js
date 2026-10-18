import express from "express"
const router=express.Router();
import { verifyWebHookParameters,metaLead_req_body } from "../controllers/metaLeadCont.js";

router.get("/",verifyWebHookParameters)
router.post("/",metaLead_req_body)
const metaWebHookRoute=router
export default metaWebHookRoute  