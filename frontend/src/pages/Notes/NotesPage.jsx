
import { useEffect, useState } from 'react'

import { Delete, Edit2 } from 'lucide-react'

import { Link, useNavigate } from 'react-router'

import toast from "react-hot-toast"
import api from '../../utils/apiInstance'
import { formatDate } from '../../utils/helper'

import NavbarNotes from './Navbar'
import RateLimiter from '../../components/RateLimiter'


const NotesPage = () => {
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
  const handleDelete = async (e, id) => {
    e.preventDefault()
    if (!window.confirm("Are you want to delete one?")) return
    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter((note) => note._id !== id))
      toast.success("deleted notes succesfully")

    } catch (error) {
      console.log("failed to delete one", error)
      toast.error("Delete not possible")

    }
  }
  const navigate=useNavigate()
  return (
    <div className=''>

      <NavbarNotes />
      {isRateLimit && <RateLimiter/>}

      {isLoading && (
        <div>Loading...</div>)}
      {notes.length > 0 ? ((
        <div className="grid grid-cols-1 md:grid-cols-3 p-4  items-center justify-center gap-6">
          {notes.map((note) => (
            <div key={note._id} className='bg-gray-300 rounded-lg items-center p-8'>
              <Link to={`/note/${note._id}`}>
                <h2>Title: {note.title}</h2>
                <p>Summary: {note.content}</p>
                <p>CreatedDate: {formatDate(new Date(note.createdAt))}</p>
              </Link>

              <div className='flex gap-8 mt-8'>
                <button className='bg-cyan-500 flex p-4 gap-2 rounded-full font-bold hover:bg-cyan-600 cursor-pointer' onClick={()=>navigate(`/note/${note._id}`)  }> Edit <Edit2 className=' '/></button> <button className='bg-red-500 p-4 items-center text-center rounded-lg '> <Delete className='' onClick={(e) => handleDelete(e, note._id)} /></button>
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

export default NotesPage
