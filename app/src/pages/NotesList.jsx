import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     title: "Hello",
//     desc: "This is a sample data to fill note for now just a exapmle",
//     date: "2025/4/13",
//   },
//   {
//     id: 2,
//     title: "Test",
//     desc: "This is a sample data to fill note for now just a exapmle",
//     date: "2025/4/13",
//   },
//   {
//     id: 3,
//     title: "Three",
//     desc: "This is a sample data to fill note for now just a exapmle",
//     date: "2025/4/13",
//   },
// ];

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        if (!response.ok) {
          throw new Error("Error while fetching notes: " + response.statusText);
        }
        const data = await response.json();
        setNotes(data);
        setFilteredNotes(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, []);
  const navigate = useNavigate();
  function add() {
    navigate("/add");
  }

  function handleChange(e) {
    let searchText = e.target.value;

    searchText = searchText.toLowerCase();

    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredNotes(filteredNotes);
  }

  function handleDelete(id) {
    console.log(id);
    const deleteNote = async () => {
      try {
        const res = await axios.delete(`http://localhost:5000/api/note/${id}`);
        if (!res.ok) {
          throw new Error("Error while deleting note: " + res.statusText);
        } else {
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
          setFilteredNotes((prevNotes) =>
            prevNotes.filter((note) => note._id !== id)
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    deleteNote();
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Notes</h1>
        <div className="flex items-center bg-white rounded-lg px-3">
          <input
            type="text"
            onChange={handleChange}
            className="outline-none border-none"
          />
          <button className="cursor-pointer">
            <img src="./search.svg" alt="Search Icon" />
          </button>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-end">
          <div
            className="flex items-center justify-center text-2xl font-bold shadow-lg bg-[#ffb300] text-white w-12 h-12 rounded-full cursor-pointer"
            onClick={add}
          >
            <img src="plus.png" alt="Plus Icon" className="w-4 h-4" />
          </div>
        </div>
      </div>

      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <Card
            key={note._id}
            id={note._id}
            title={note.title}
            desc={note.desc}
            date={formatDate(note.updatedAt)}
            onDelete={(id) => handleDelete(id)}
          />
        ))
      ) : (
        <p className="mt-10 font-xl font-semibold">No notes yet</p>
      )}
    </div>
  );
}

export default NotesList;
