const express=require('express')
const mongoose=require('mongoose')
const web=express()
const bodyparser=require('body-parser')
const router=require('./routes')

web.use(bodyparser.urlencoded({extended:true}))
web.use(express.json())
web.use(router)
mongoose.connect("mongodb://localhost:27017/create_account")
.then(()=>{
    console.log("mongodb connected")
})
.catch((err)=>{
    console.log(err)
})
web.listen((8000),()=>{
    console.log("server listening")
})
