import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router'

const NavbarNotes = () => {
    const navigate=useNavigate()
  return (
    <div className='flex justify-between items-center  p-4 bg-cyan-400 '>
      <h2 className='font-bold text-2xl'>ThinkNotes</h2>
      <button className='bg-red-300 p-4 items-center rounded-2xl' onClick={()=>navigate("/")}>Home</button>
    <Link to="/create-notes" className="flex gap-4 items-center bg-amber-600 p-4 rounded-full hover:bg-amber-800 btn-info"> <PlusIcon/>Add New Notes</Link>
    </div>
  )
}

export default NavbarNotes
