import React, { useState } from 'react'
import api from '../utils/apiInstance'
import { useNavigate } from 'react-router'
import toast from "react-hot-toast"

const CreatePage = () => {
  const[title,setTitle]=useState("")
  const[content,setContent]=useState("")
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!title.trim() || !content.trim()){
      alert("fiekld are required")
      return
    }
    setLoading(!loading)
    try {
   
       await api.post("/notes",{title,content})

       navigate("/")

     
      
    } catch (error) {
      console.log({message:"failed to create",error})
    
      
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label > Title
          <input type="text"  value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </label>
        <label > Content <textarea name="" value={content} onChange={(e)=>setContent(e.target.value)} id=""></textarea></label>
        <div>
          {loading? "creating..":"created"}
          <button disabled={loading} type='submit'> Add Notes</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePage
