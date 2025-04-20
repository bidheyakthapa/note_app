import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function NotesEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [orginalTitle, setOrginalTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [orginalDesc, setOrginalDesc] = useState("");
  const [date, setDate] = useState("");
  const [change, setChange] = useState(false);
  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const descRef = useRef(null);
  const navigate = useNavigate();

  function formatDate(isoString) {
    const date = new Date(isoString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  useEffect(() => {
    if (id) {
      const fetchNotes = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/notes");
          const note = response.data.find((note) => note._id === id);
          console.log(note);
          setTitle(note.title);
          setOrginalTitle(note.title);
          setDesc(note.desc);
          setOrginalDesc(note.desc);
          setDate(formatDate(note.updatedAt));
          if (descRef.current) {
            descRef.current.innerHTML = note.desc;
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchNotes();
    }
  }, [id]);

  // Update description state and set 'change' flag
  function handleDesc(e) {
    setDesc(e.target.innerHTML);
    setChange(e.target.innerHTML !== orginalDesc);
  }

  // Update title state and set 'change' flag
  function handleTitle(e) {
    setTitle(e.target.value);
    setChange(e.target.value !== orginalTitle);
  }

  // Bold formatting action
  function handleBold(e) {
    e.preventDefault();
    document.execCommand("bold", false, null);
    updateFormatState();
  }

  // Italic formatting action
  function handleItalic(e) {
    e.preventDefault();
    document.execCommand("italic", false, null);
    updateFormatState();
  }

  // Underline formatting action
  function handleUnderline(e) {
    e.preventDefault();
    document.execCommand("underline", false, null);
    updateFormatState();
  }

  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        document.execCommand("bold");
        updateFormatState();
      }
      if (e.key === "i" || e.key === "I") {
        e.preventDefault();
        document.execCommand("italic");
        updateFormatState();
      }
      if (e.key === "u" || e.key === "U") {
        e.preventDefault();
        document.execCommand("underline");
        updateFormatState();
      }
    }
  };

  // Update format state based on selection
  function updateFormatState() {
    const editor = descRef.current;
    const selection = window.getSelection();

    if (editor.innerText === "" && document.activeElement === editor) {
      return setFormatState({ bold: false, italic: false, underline: false });
    }

    if (!selection || selection.rangeCount === 0) {
      return setFormatState({ bold: false, italic: false, underline: false });
    }

    const range = selection.getRangeAt(0);
    const isInsideEditor = editor.contains(range.commonAncestorContainer);

    if (isInsideEditor) {
      setFormatState({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
      });
    } else {
      setFormatState({
        bold: false,
        italic: false,
        underline: false,
      });
    }
  }

  useEffect(() => {
    document.addEventListener("selectionchange", updateFormatState);
    return () =>
      document.removeEventListener("selectionchange", updateFormatState);
  }, []);

  // Handle back button
  function handleBack() {
    if (orginalDesc === desc && orginalTitle === title) {
      navigate("/");
    } else {
      return;
    }
  }
  async function handleSave() {
    const newNote = {
      title,
      desc: descRef.current.innerHTML,
    };
    if (id) {
      await axios.patch(`http://localhost:5000/api/note/${id}`, newNote);
    } else {
      await axios.post("http://localhost:5000/api/add", newNote);
    }
    setOrginalTitle(title);
    setOrginalDesc(desc);
    setChange(false);
  }

  function handleCancel() {
    setTitle(orginalTitle);
    setDesc(orginalDesc);
    setChange(false);
  }

  return (
    <div>
      <div className="flex">
        <button onClick={handleBack} className="flex-1 cursor-pointer">
          <img src="/back.png" alt="Back Icon" className="w-6 r" />
        </button>
        <div
          className={`flex justify-end space-x-6 ${
            change ? "block" : "hidden"
          }`}
        >
          <button onClick={handleSave} className="cursor-pointer">
            <img src="/check.png" alt="Check Icon" className="w-5 " />
          </button>
          <button onClick={handleCancel} className="cursor-pointer">
            <img src="/close.png" alt="Cancel Icon" className="w-4" />
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Enter your title here..."
        className="text-2xl font-semibold placeholder-gray-400 w-[100%] p-2 mt-2"
        onChange={handleTitle}
        value={title}
      />
      <div className="flex mt-2">
        <span className="flex-1 px-2 text-gray-500">{date}</span>
        <div className=" flex justify-end space-x-4 ">
          <b
            onMouseDown={handleBold}
            className={`cursor-pointer ${
              formatState.bold ? "text-[#ffb300]" : "text-black"
            }`}
          >
            B
          </b>
          <i
            onMouseDown={handleItalic}
            className={`cursor-pointer ${
              formatState.italic ? "text-[#ffb300]" : "text-black"
            }`}
          >
            i
          </i>
          <u
            onMouseDown={handleUnderline}
            className={`cursor-pointer ${
              formatState.underline ? "text-[#ffb300]" : "text-black"
            }`}
          >
            U
          </u>
        </div>
      </div>
      <div
        contentEditable
        className="min-h-[calc(90vh-8rem)] md:min-h-[calc(90vh-5rem)] mt-1 text-lg p-2"
        ref={descRef}
        onInput={handleDesc}
        onKeyDown={handleKeyDown}
        onChange={handleDesc}
      ></div>
      {desc === "" && (
        <span className="absolute text-gray-400 select-none pointer-events-none top-33 px-2 text-lg">
          Start typing...
        </span>
      )}
    </div>
  );
}

export default NotesEditor;
