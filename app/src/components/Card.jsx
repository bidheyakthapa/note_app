import { useNavigate } from "react-router-dom";
import Conformation from "./Conformation";
import { useState } from "react";

function Card({ id, title, desc, date, onDelete }) {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleClick() {
    navigate(`/notes/${id}`);
  }

  function handleDelete() {
    setShowConfirmation(true);
  }

  function handleConfirm() {
    onDelete(id);
    setShowConfirmation(false);
  }

  function handleCancel() {
    setShowConfirmation(false);
  }

  return (
    <div className="bg-white flex items-center rounded-lg px-5 py-3 mt-5 cursor-pointer shadow-md md:mx-4 sm:mx-2">
      <div onClick={handleClick} className="flex-1 overflow-hidden">
        <h1 className="text-2xl font-bold truncate">{title}</h1>
        <p
          className="flex text-gray-500 truncate mr-2"
          dangerouslySetInnerHTML={{ __html: desc }}
        />

        <p className="text-gray-400">{date}</p>
      </div>
      <div onClick={handleDelete} className="flex justify-end h-4">
        <img src="delete.png" alt="Delete Icon" />
      </div>

      {showConfirmation && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm brightness-75 z-10"></div>

          <Conformation onConfirm={handleConfirm} onCancel={handleCancel} />
        </>
      )}
    </div>
  );
}

export default Card;
