import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../../utils/apiInstance'
import toast, { LoaderIcon } from 'react-hot-toast'
import { ArrowLeft, TrashIcon } from 'lucide-react'

const NoteDetailsPage = () => {
    const [notes, setNotes] = useState("")
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        const fetchNote = async () => {
            const res = await api.get(`/notes/${id}`)
            setNotes(res.data)
            setLoading(true)


        }
        fetchNote()

    }, [id])
    const handleDelete = async (e) => {
        e.preventDefault()
        if (!window.confirm("Are you want to delete one?")) return
        try {
            await api.delete(`/notes/${id}`)
            toast.success("deleted notes succesfully")
            navigate("/")

        } catch (error) {
            console.log("failed to delete one", error)
            toast.error("Delete not possible")

        }
    }
    const handleSave = async (e) => {
        e.preventDefault()
        if (!notes.title.trim() || !notes.content.trim()) {
            toast.error("atleast a title aor content upade")
            return
        }
        setSaving(true)
        try {
            await api.put(`/notes/${id}`, notes)

            toast.success("Updated notes successfully")
            navigate("/notes-page")


        } catch (error) {
            console.log("failed to delete one", error)
            toast.error("updated not possible")
        } finally {
            setSaving(false)
        }

    }
    console.log({ notes })
    if (!loading) {
        return (
            <div className=' min-h-screen flex bg-base-100 justify-center items-center'> <LoaderIcon className='size-10 animate-spin ' /></div>)
    }
    return (
        <div className='h-screen relative '>
            <div className='bg-gray-500 h-auto top-30 md:left-30  p-8 ml-auto mr-auto  items-center z-10 absolute translate-[-46%,-45%]   '>
                <div className='flex justify-between p-4'><button className='flex' title='back home'> <ArrowLeft onClick={() => navigate("/notes-page")} /> Back to Home</button>
                    <button title='delete notes?' className='flex text-red-500' onClick={(e) => handleDelete(e, id)}> <TrashIcon /> Delete</button></div>

                <div>
                    <label className=''>Title <input className='border w-full p-4 rounded-2xl mb-4' type="text" value={notes.title} onChange={(e) => setNotes({ ...notes, title: e.target.value })} /></label>
                    <label > content <textarea className='border w-full p-4 rounded-2xl mb-4' value={notes.content} onChange={(e) => setNotes({ ...notes, content: e.target.value })} />  </label>

                    <button disabled={saving} className='btn btn-primary bg-cyan-500 text-2xl  rounded-2xl hover:bg-cyan-600 w-full' onClick={handleSave}>{saving ? "saving...." : "saved note"}</button>
                </div>
            </div>
        </div>
    )
}

export default NoteDetailsPage
