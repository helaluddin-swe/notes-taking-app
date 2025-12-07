import { BrowserRouter as Router, Routes, Route } from "react-router"

import CreatePage from "./pages/Notes/CreatePage"
import NoteDetailsPage from "./pages/Notes/NoteDetailsPage"
import NotesPage from "./pages/Notes/NotesPage"
import HomePage from "./pages/Home/Home"


const App = () => {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-notes" element={<CreatePage />} />
          <Route path="/notes-page" element={<NotesPage />} />
          <Route path="/note/:id" element={<NoteDetailsPage />} />
        </Routes>

      </Router>


    </>
  )
}

export default App
