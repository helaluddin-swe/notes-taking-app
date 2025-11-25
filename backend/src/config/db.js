const mongoose=require("mongoose")
 async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mngo connect hogaya")
        
    } catch (error) {
        console.log({message:"cnnot connect mongo",error});
        process.exit(1)     
    }
}
module.exports=connectDB