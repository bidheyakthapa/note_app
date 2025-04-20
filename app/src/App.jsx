import {
  BrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import NotesList from "./pages/NotesLIst";
import NotesEditor from "./components/NotesEditor";

function App() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 mt-2">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/add" element={<NotesEditor />} />
          <Route path="/notes/:id" element={<NotesEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
