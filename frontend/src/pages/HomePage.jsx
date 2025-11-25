
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimiter from '../components/RateLimiter'
import { Delete, Edit2 } from 'lucide-react'

import { Link } from 'react-router'
import { formatDate } from '../utils/helper'
import api from '../utils/apiInstance'
import toast from "react-hot-toast"

const HomePage = () => {
    const [isRateLimit, setIsRateLimit] = useState(false)
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setIsLoading(true);

                const res = await api.get("/notes")
                setNotes(res.data);

                setIsRateLimit((prev) => !prev); // Optional: only if you really want to toggle

            } catch (error) {
                console.log("Error Occurred:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotes();
    }, []);
    const handleDelete=async(e,id)=>{
        e.preventDefault()
    if(!window.confirm("Are you want to delete one?")) return
    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev)=>prev.filter((note)=>note._id!==id))
      toast.success("deleted notes succesfully")
      
    } catch (error) {
      console.log("failed to delete one",error)
      toast.error("Delete not possible")
      
    }
  }
    return (
        <div className=''>

            <Navbar />
            {isRateLimit && <RateLimiter/>}
          
{isLoading && (
    <div>Loading...</div>)}
  {   notes.length > 0 ? (   (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note._id}>
            <Link to={`/note/${note._id}`}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>{formatDate(new Date(note.createdAt))}</p>
            </Link>

            <div>
              <Edit2 /> <Delete onClick={(e)=>handleDelete(e,note._id)} />
            </div>
          </div>     
        ))}
      </div>
    )
  ) : (
    <div>No notes added yet.</div>
  )
}



        </div>
    )
}

export default HomePage
