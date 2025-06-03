import React, { useState } from "react";
import moment from "moment";

const AppointmentForm = ({ slotInfo, onClose, onSave }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert("Please enter a title");

    onSave({
      title,
      start: slotInfo.start,
      end: slotInfo.end,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-80 text-black"
      >
        <h2 className="text-lg font-bold mb-4">Add Appointment</h2>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Start:</span>{" "}
            {moment(slotInfo.start).format("MMM D, YYYY, h:mm A")}
          </p>
          <p>
            <span className="font-semibold">End:</span>{" "}
            {moment(slotInfo.end).format("MMM D, YYYY, h:mm A")}
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
