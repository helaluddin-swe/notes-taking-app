import { Link } from "react-router"
import {PlusIcon } from "lucide-react"


const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between btn-info items-center px-4 ">
        <h2>ThinkPad</h2>
        <Link to="/create-notes" className="flex gap-4 btn-info"> <PlusIcon/>Add New Notes</Link>
      </div>
    </div>
  )
}

export default Navbar
