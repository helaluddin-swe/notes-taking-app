import React, { useState } from 'react'

import { useNavigate } from 'react-router'
import toast from "react-hot-toast"
import { ArrowLeft } from 'lucide-react'
import api from '../../utils/apiInstance'

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim() || !content.trim()) {
    toast.error("Title and content are required!");
    return;
  }

  setLoading(true);

  try {
    await api.post("api/notes", { title, content });
    toast.success("Notes Created Successfully");
    navigate("/notes-page");
  } catch (error) {
    console.log("Failed to create:", error?.response?.data || error.message);
    toast.error("Notes creation failed. Try again!");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className=' h-screen relative '>
      <form onSubmit={handleSubmit} className='bg-gray-400 shadow-md 0  items-center  z-10 absolute  ml-auto mr-auto top-20 left-40 w-200 h-auto p-4 rounded-lg justify-center block'>
        <h2 className='flex items-center cursor-pointer mb-4  hover:text-red-400' onClick={() => navigate("/notes-page")}> <ArrowLeft /> Back Home</h2>
        <label className='m-4 text-2xl' > Title
          <input type="text" className=' border rounded-2xl p-3 w-full' value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className='text-2xl m-4'> Content <textarea className=' w-full border p-4 m-2 rounded-md border-gray-300 ' name="" value={content} onChange={(e) => setContent(e.target.value)} id=""></textarea></label>
        <div>
          {loading ? (<span className='text-red-500 m-4 p-4  bg-cyan-500 text-2xl rounded-2xl'> Creating..</span>) : ""}
          <button className='bg-cyan-500 hover:bg-cyan-700 p-4 m-4 rounded-full  text-2xl font-semibold text-white' disabled={loading} type='submit'> Add Notes</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePage
