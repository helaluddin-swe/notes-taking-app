const { createNotes, deleteNote, getAllNotes, updateNote, getNoteByID }=require( "../controllers/notesController.js")

const express=require("express")
const router=express.Router()
router.get("/",getAllNotes)
router.post("/",createNotes)
router.put("/:id",updateNote)
router.delete("/:id",deleteNote)
router.get("/:id",getNoteByID)
module.exports=router