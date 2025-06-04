import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentForm from "../../components/AppointmentForm";
import {
  createMeeting,
  getMeetingDetails,
  updateMeeting,
} from "../../service/calenderMeeting";
import { toast } from "react-hot-toast";

const localizer = momentLocalizer(moment);

const Event = ({ event }) => {
  const [show, setShow] = useState(false);
  const [slotInfo, setSlotInfo] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await getMeetingDetails();
      return response;
    } catch (error) {
      toast.error("Error fetching events:", error);
    }
  };

  const upDateMeet = async (id, data) => {
    try {
      const response = await updateMeeting(id, data);

      if (response.status === "success") {
        toast.success(response.message);
        fetchEvents();
      }
    } catch (error) {
      toast.error("Error creating meeting:", error);
    }
  };

  const handleMeetingChange = (data) => {
    setShow(true); // Show the form
    setSlotInfo(data); // Set the data
  };

  const handleCloseForm = () => {
    setShow(false); // Close the form (hide the modal)
  };

  const handleSaveEvent = (newEvent) => {
    upDateMeet(event._id, newEvent);
    handleCloseForm(); // Optionally close the form after saving
  };

  return (
    <div
      className="!rounded px-1 py-0.5 !cursor-pointer text-xs leading-tight overflow-hidden whitespace-nowrap text-ellipsis"
      onClick={() => handleMeetingChange(event)} // Open form on event click
    >
      <div className="font-semibold truncate">{event.title}</div>
      <div>
        {moment(event.start).format("h:mm A")} -{" "}
        {moment(event.end).format("h:mm A")}
      </div>
      {show && (
        <AppointmentForm
          slotInfo={slotInfo}
          onClose={handleCloseForm} // Pass the close handler to the form
          onSave={handleSaveEvent} // Pass the save handler to the form
        />
      )}
    </div>
  );
};

const TimeCalender = () => {
  const [view, setView] = useState("week");
  const [eventsState, setEventsState] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [slotInfo, setSlotInfo] = useState(null);

  // Handle input change for user-specified end time

  const fetchEvents = async () => {
    try {
      const response = await getMeetingDetails();
      // Map the API response to a format that `react-big-calendar` expects
      const events = response.map((event) => ({
        _id: event._id,
        title: event.title,
        start: moment(event.start).toDate(), // Convert ISO string to Date object
        end: moment(event.end).toDate(), // Convert ISO string to Date object
      }));
      setEventsState(events);
    } catch (error) {
      toast.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateMeeting = async (data) => {
    try {
      const response = await createMeeting(data);
      if (response.status === "success") {
        // handleSaveEvent(data);
        toast.success(response.message);
        fetchEvents();
      }
    } catch (error) {
      toast.error("Error creating meeting:", error);
    }
  };

  const handleSelectSlot = (slot) => {
    setSlotInfo(slot);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSlotInfo(null);
  };

  const handleSaveEvent = (newEvent) => {
    setEventsState((prev) => [...prev, newEvent]);
    handleCreateMeeting(newEvent);
    handleCloseForm();
  };

  return (
    <div className="p-4 h-[90vh] bg-[#242424] text-white rounded-lg shadow-lg">
      <Calendar
        localizer={localizer}
        events={eventsState}
        view={view}
        onView={setView}
        views={["week", "month", "day"]}
        style={{ height: "100%" }}
        className="rounded-md border border-gray-600"
        selectable
        onSelectSlot={handleSelectSlot}
        components={{
          event: Event,
        }}
        step={60}
        timeslots={2}
      />
      {showForm && slotInfo && (
        <AppointmentForm
          slotInfo={slotInfo}
          onClose={handleCloseForm}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default TimeCalender;
