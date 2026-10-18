import dns from "dns/promises";
dns.setServers(["8.8.8.8","8.8.4.4"])
import express from "express";
import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import metaWebHookROute from "./src/routes/metaWebHook.js";
import connectDb from "./src/DB/db.js"



dotenv.config();
const app =express();
const PORT=process.env.PORT||3000
const httpServer=createServer(app) // creating a http server from express app
connectDb();
// attaching  io sockect to httpServer
const io=new Server(httpServer,{
    cors:{
        origin: "*",
        methods:['GET','POST']
    }
})
app.use(express.json())// to be able to recive form data
app.use("/webhooks/meta",metaWebHookROute)
app.get("/",(req,res)=>{
    res.send("server up and runing")
})
// setting up io  veriable to be available in express response
app.set("io",io)
// checking the for the connected client and when client disconets from socket server
io.on("connection",(Socket)=>{
    console.log("client connected id:",Socket.id)
    Socket.on("disconnect",()=>{
        console.log("client disconnected",Socket.id)
    })
})
httpServer.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})