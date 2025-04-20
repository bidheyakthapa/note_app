function Conformation({ onConfirm, onCancel }) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white backdrop-blur-3xl p-6 pt-3 rounded shadow-md z-10">
      <div
        onClick={onCancel}
        className="flex justify-end text-red-500 font-bold"
      >
        X
      </div>
      <h2 className="font-semibold text-lg">
        Are you sure you want to delete?
      </h2>
      <div className="flex justify-between pt-2">
        <button
          className="px-3 py-1 bg-green-600 text-white font-semibold rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 bg-red-600 text-white font-semibold rounded"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Conformation;
