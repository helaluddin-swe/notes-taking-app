import { Link, useNavigate } from "react-router"
import {PlusIcon } from "lucide-react"


const Navbar = () => {
  const navigate=useNavigate()
  return (
    <div>
      <div className="flex justify-between btn-info items-center bg-blue-400 py-4 text-2xl  px-4  ">
        <button className="font-bold">ThinkPad</button>
        <button className="font-bold" onClick={()=>navigate("/notes-page")}>Notes</button>
        <button className="font-bold">Resume</button>
        <button className="font-bold">Login By clerk</button>
        
        <Link to="/create-notes" className="flex gap-4 items-center bg-amber-600 p-4 rounded-full hover:bg-amber-800 btn-info"> <PlusIcon/>Add New Notes</Link>
      </div>
    </div>
  )
}

export default Navbar
