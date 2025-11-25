import {BrowserRouter as Router,Routes,Route} from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailsPage from "./pages/NoteDetailsPage"


const App = () => {
  return (
    <>
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create-notes" element={<CreatePage/>}/>
        <Route path="/note/:id" element={<NoteDetailsPage/>}/>
      </Routes>
   
    </Router>
    
    
    </>
  )
}

export default App
