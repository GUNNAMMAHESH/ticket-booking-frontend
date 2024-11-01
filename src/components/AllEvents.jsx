import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function AllEvents() {
  const [allMovies, setAllMovies] = useState([]);
  const [model, setModel] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
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

    getMovies();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const showModel = (event) => {
    setSelectedEvent(event);
    setModel(true);
  };

  const handleEdit = (event) => {
    navigate("/events/edit", { state: { event } }); // Navigate to edit page with event data
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
  

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-orange-400 font-semibold text-3xl mb-6">Events</div>

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
                backgroundImage: movie.photo ? `url(${movie.photo})` : "none", // only set if photo exists
                backgroundColor: movie.photo ? "transparent" : "#fb923c", // fallback to orange color if no photo
              }}
              onClick={() => showModel(movie)}
            >
              <div>{movie.EventName}</div>
              <div>{formatDateTime(movie.date)}</div>
              <div>{movie.location}</div>
              <div className="flex justify-between mt-2">
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
            </div>
          ))}
        </div>
      )}

      {model && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 w-[90%] md:w-[60%] lg:w-[40%] h-1/2 rounded shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {selectedEvent.EventName}
              </h2>
              <span
                className="font-semibold text-4xl cursor-pointer"
                onClick={() => setModel(false)}
              >
                &times;
              </span>
            </div>
            <div className="flex flex-col text-left leading-10 text-xl mt-auto">
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
              {selectedEvent.photo && (
                <img
                  src={selectedEvent.photo}
                  alt={selectedEvent.EventName}
                  className="mb-2 w-full h-32 object-cover rounded-lg"
                />
              )}
              <button
                onClick={() =>
                  navigate("/tickets", { state: { event: selectedEvent } })
                }
                className="bg-orange-400 font-semibold"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllEvents;
