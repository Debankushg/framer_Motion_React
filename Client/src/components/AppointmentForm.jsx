import React, { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-hot-toast";

const AppointmentForm = ({ slotInfo, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return toast("Please enter a title", {
        style: {
          color: "#ffd200",
          padding: "0.5rem", // Convert `p-2` to a corresponding value
          fontSize: "1.125rem", // Convert `text-lg` to the appropriate font size
          fontWeight: "bold", // Convert `font-bold` to CSS property
        },
        icon: "⚠️",
      });
    }

    const createData = {
      title,
      start: slotInfo.start,
      end: slotInfo.end,
    };
    const updateData = {
      title,
      start: moment(start).toISOString(), // Convert start to ISO format
      end: moment(end).toISOString(), // Convert end to ISO format
    };

    if (slotInfo._id) {
      onSave(updateData);
    } else {
      onSave(createData);
    }

    onClose();
  };

  useEffect(() => {
    if (slotInfo?._id) {
      setTitle(slotInfo.title);
      // Format date and time in 'YYYY-MM-DDTHH:mm' format for datetime-local input
      setStart(moment(slotInfo.start).format("YYYY-MM-DDTHH:mm"));
      setEnd(moment(slotInfo.end).format("YYYY-MM-DDTHH:mm"));
    }
  }, [slotInfo]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-80 text-black"
      >
        <h2 className="text-lg font-bold mb-4">
          {slotInfo._id ? "Edit Appointment" : "Add Appointment"}
        </h2>
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
        <div className="mb-4 flex flex-col gap-2">
          {slotInfo._id ? (
            <>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full border px-2 py-1 rounded"
                autoFocus
              />
            </>
          ) : (
            <p>
              <span className="font-semibold">Start:</span>{" "}
              {moment(slotInfo.start).format("MMM D, YYYY, h:mm A")}
            </p>
          )}
          {slotInfo._id ? (
            <>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full border px-2 py-1 rounded"
                autoFocus
              />
            </>
          ) : (
            <p>
              <span className="font-semibold">End:</span>{" "}
              {moment(slotInfo.end).format("MMM D, YYYY, h:mm A")}
            </p>
          )}
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
            className="px-4 py-2 bg-amber-500 text-white rounded cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
