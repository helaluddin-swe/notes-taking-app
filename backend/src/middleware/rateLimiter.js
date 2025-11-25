const rateLimit = require("../config/upstash")

const rateLimiter=async (req,res,next) => {
    try {
        const {success}= await rateLimit.limit("my-limit-key")
        if(!success){
            return res.status(429).json({message:"to many request"})
        }
        
    } catch (error) {
        console.error("rate limit erroe")
        next(error)
        
    }
    
    next()
}
module.exports=rateLimiter