const express=require("express")
const app=express()
const dotenv=require("dotenv")
const noteRoutes=require("./routes/notesRoutes.js")
const connectDB = require("./config/db.js")
const rateLimiter = require("./middleware/rateLimiter.js")
const cors=require("cors")

dotenv.config()
// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())
app.use(rateLimiter)


app.use("/api/notes",noteRoutes)
const PORT=process.env.PORT || 5001
connectDB().then(()=>{ 
app.listen(PORT,()=>{
    console.log(`server run on http://localhost:${PORT}`);
    
})}) 