import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateEvent from "./event/CreateEvent";
import { IoArrowForward, IoPricetagsOutline } from "react-icons/io5";
import formatDateTime from "../utils/formatDateTime";
import { MdLocationPin, MdDateRange, MdCloseFullscreen } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [model, setModel] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreate, setIsCreate] = useState(false);

  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosInstance.get("/events/allevents");
        setEvents(data);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const showModel = (event) => {
    setSelectedEvent(event);
    setModel(true);
  };

  const handleEdit = (event) =>
    navigate("/events/create", { state: { event } });

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/events/delete/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (err) {
      setError("Failed to delete event. Please try again later.");
    }
  };

  if (isCreate) {
    return <CreateEvent />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center text-xl text-gray-500">
        <div>Loading events...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-xl font-semibold">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-black">
      <div className="flex items-center w-full font-semibold text-3xl mb-6">
        <div className="flex justify-center w-[95%] text-orange-400">
          <span>Events</span>
        </div>
        {role === "admin" && (
          <button
            onClick={() => setIsCreate(true)}
            className="flex items-center  bg-orange-500 text-white text-xl px-3 py-1 rounded-md hover:bg-orange-500 active:opacity-75 cursor-pointer"
          >
            <span>Create</span>
            <IoArrowForward />
          </button>
        )}
      </div>
      {loading ? (
        <div className="text-xl text-gray-500">Loading Movies...</div>
      ) : (
        <div className="flex flex-row justify-start gap-4 w-full mr-5">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col justify-end items-start w-full hover:scale-1.1  min-h-96 p-4 text-white text-xl font-semibold bg-orange-400 shadow-xl border-0 rounded-lg cursor-pointer transition bg-[50%_10%] bg-cover bg-center "
              style={{
                backgroundImage: event.photo
                  ? `url(${event.photo})`
                  : `url("https://via.placeholder.com/150?text=No+Image")`,
                backgroundColor: event.photo ? "transparent" : "#fb923c",
              }}
              onClick={() => showModel(event)}
            >
              <div>{event.EventName}</div>
              <div className="flex items-center">
                <MdDateRange className="mr-2" />
                {formatDateTime(event.date)}
              </div>
              <div className="flex items-center">
                <MdLocationPin className="mr-2" />
                {event.location}
              </div>
              <div className="flex items-center">
                <IoPricetagsOutline className="mr-2" />
                {event.price}
              </div>
            </div>
          ))}
        </div>
      )}

      {model && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 w-11/12 sm:w-3/4 lg:w-1/2 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-end">
              <span
                onClick={() => setModel(false)}
                className="font-semibold text-3xl cursor-pointer text-orange-400"
              >
                <MdCloseFullscreen />
              </span>
            </div>
            <div className="flex flex-col md:flex-row space-x-4 text-left leading-10 text-xl">
              <div className="w-full md:w-1/3">
                <img
                  src={
                    selectedEvent.photo ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={selectedEvent.EventName}
                  className="mb-2 w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <p>
                  <strong>Event:</strong> {selectedEvent.EventName}
                </p>
                <p>
                  <strong>Date:</strong> {formatDateTime(selectedEvent.date)}
                </p>
                <p>
                  <strong>Location:</strong> {selectedEvent.location}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedEvent.description || "No description available"}
                </p>
                <p>
                  <strong>Price:</strong> {selectedEvent.price || "Free"}
                </p>
              </div>
            </div>
            {role === "admin" && (
              <div className="flex flex-row justify-end mt-2 space-x-2">
                <div className=" flex flex-row items-center bg-blue-500 text-white rounded px-3 py-2 gap-1">
                  <FaPen className="text-2xl" />
                  <button onClick={() => handleEdit(selectedEvent)}
                    className="font-semibold text-xl">
                    Edit
                  </button>
                </div>

                <div className="flex flex-row bg-red-500 text-white rounded px-3 py-2 gap-1">
                  <button
                    onClick={() => handleDelete(selectedEvent)}
                    className="font-semibold text-xl"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-xl" />
                    Delete
                  </button>
                </div>
              </div>
            )}
            {role === "user" && (
              <div className="flex justify-center">
               
                <button
                  onClick={() =>
                    navigate("/tickets", { state: { event: selectedEvent } })
                  }
                  className="bg-orange-400 font-semibold text-2xl text-white p-2 m-2  hover:opacity-75 active:opacity-100"
                >
                  Book Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllEvents;
