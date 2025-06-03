import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentForm from "../../components/AppointmentForm";

const localizer = momentLocalizer(moment);

// const events = [
//   {
//     title: "Conference",
//     address: "123 Main St, City, Country",
//     location: "New York",
//     start: moment("2025-06-04T04:20:00").local().toDate(),
//     end: moment("2025-06-04T08:00:00").local().toDate(),
//   },
//   {
//     title: "Daily Scrum",
//     address: "123 Main St, City, Country",
//     location: "New York",
//     start: moment("2025-06-03T13:00:00").local().toDate(),
//     end: moment("2025-06-04T15:20:00").local().toDate(),
//   },
// ];

const Event = ({ event }) => {
  return (
    <div className="!rounded px-1 py-0.5 !cursor-pointer text-xs leading-tight overflow-hidden whitespace-nowrap text-ellipsis">
      <div className="font-semibold truncate">{event.title}</div>
      <div className="truncate">{event.location}</div>
      <div>
        {moment(event.start).format("h:mm A")} -{" "}
        {moment(event.end).format("h:mm A")}
      </div>
    </div>
  );
};

const TimeCalender = () => {
  const [view, setView] = useState("week");
  const [eventsState, setEventsState] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [slotInfo, setSlotInfo] = useState(null);

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
    console.log(newEvent, "newEvent");

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
