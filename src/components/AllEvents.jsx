import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateEvent from "./event/CreateEvent";
import { IoArrowForward } from "react-icons/io5";
import formatDateTime from "../utils/formatDateTime";
function AllEvents() {
  const [allMovies, setAllMovies] = useState([]);
  const [model, setModel] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreate, setIsCreate] = useState(false);

  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);
  console.log("check", role);

  const getMovies = async () => {
    try {
      const response = await axiosInstance.get("/events/allevents");
      setAllMovies(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const showModel = (event) => {
    setSelectedEvent(event);
    setModel(true);
  };

  const handleEdit = (event) => {
    navigate("/events/create", { state: { event } }); 
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/events/delete/${id}`);
      setAllMovies(allMovies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Failed to delete event:", error.message);
      setError(`Failed to delete event. Please try again later.`);
    }
  };
  const handleCreate = () => {
    setIsCreate(true);
  };
  if (isCreate) {
    return <CreateEvent />;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center w-full font-semibold text-3xl mb-6">
        <div className="flex justify-center w-[95%] text-orange-400">
          <span>Events</span>
        </div>
        {role && role == "admin" && (
          <div className="flex items-center space-x-4 w-[10%]">
            <button
              className="flex items-center justify-center space-x-2 bg-orange-400 text-white text-xl px-4 py-2 rounded-md hover:bg-orange-500 active:opacity-75 cursor-pointer"
              onClick={handleCreate}
            >
              <span>Create</span>
              <IoArrowForward />
            </button>
          </div>
        )}
      </div>
      {loading ? (
        <div className="text-xl text-gray-500">Loading events...</div>
      ) : error ? (
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {allMovies.map((movie) => (
            <div
              key={movie._id}
              className="flex flex-col justify-end items-start w-full h-80 min-h-[12rem] p-4 text-white text-xl font-semibold border rounded-lg cursor-pointer transition bg-cover bg-center hover:bg-orange-500"
              style={{
                backgroundImage: movie.photo ? `url(${movie.photo})` : "none", 
                backgroundColor: movie.photo ? "transparent" : "#fb923c", 
              }}
              onClick={() => showModel(movie)}
            >
              <div>{movie.EventName}</div>
              <div>{formatDateTime(movie.date)}</div>
              <div>{movie.location}</div>
              {role && role == "admin" && (
                <div className="flex justify-between mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-blue-500 text-white rounded px-2 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="bg-red-500 text-white rounded px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {model && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 w-[70%] md:w-[60%] lg:w-[50%] h-1/2 rounded shadow-lg flex flex-col justify-between">
            <div className="flex justify-end">
              <span
                className="font-semibold text-5xl cursor-pointer"
                onClick={() => setModel(false)}
              >
                &times;
              </span>
            </div>
            <div className="flex flex-row space-x-4 text-left leading-10 text-xl">
              <div className="w-1/2">
                {selectedEvent.photo && (
                  <img
                    src={selectedEvent.photo}
                    alt={selectedEvent.EventName}
                    className="mb-2 w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div>
                <p>
                  <strong>Movie:</strong>
                  {selectedEvent.EventName}
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
            <button
              onClick={() =>
                navigate("/tickets", { state: { event: selectedEvent } })
              }
              className="bg-orange-400 font-semibold text-2xl text-white p-2 m-2 hover:opacity-75 active:opacity-100"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllEvents;
