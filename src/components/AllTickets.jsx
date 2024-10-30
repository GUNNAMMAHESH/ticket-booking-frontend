import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function AllTickets() {
  const [allTickets, setallTickets] = useState([]);
  const [model, setModel] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loader state

  const navigate = useNavigate();

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await axiosInstance.get("/tickets/getTickets");
        setallTickets(response.data);
        setError(null);
      } catch (error) {
        console.log("Error fetching tickets:", error.message);
        setError("Failed to load Tickets. Please try again later.");
      } finally {
        setLoading(false); // Stop loading once API call completes
      }
    };

    getTickets();
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

  const showModel = (Ticket) => {
    setSelectedTicket(Ticket);
    setModel(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tickets/DeleteTicket/${id}`);
      setallTickets(allTickets.filter((ticket) => ticket._id !== id)); // Remove the deleted event from state
    } catch (error) {
      console.error("Failed to delete event:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-orange-400 font-semibold text-3xl mb-6">Tickets</div>

      {loading ? (
        <div className="text-xl text-gray-500">Loading Tickets...</div>
      ) : error ? (
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {allTickets.map((ticket, index) => (
            <div
              key={index}
              onClick={() => showModel(ticket)}
              className="flex flex-col justify-end items-start w-full h-80 min-h-[12rem] p-4 bg-orange-400 text-white text-xl font-semibold border rounded-lg cursor-pointer hover:bg-orange-500 transition"
            >
              <div
              >
              <div>{ticket.TicketName}</div>
              <div>{formatDateTime(ticket.date)}</div>
              <div>{ticket.location}</div>
              </div>
              <button
                  onClick={() => handleDelete(ticket._id)}
                  className="bg-red-500 text-white rounded px-2 py-1"
                >
                  Delete
                </button>
            </div>
          ))}
        </div>
      )}

      {model && selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 w-[90%] md:w-[60%] lg:w-[40%] h-1/2 rounded shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {selectedTicket.TicketName}
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
                <strong>Date:</strong> {formatDateTime(selectedTicket.date)}
              </p>
              <p>
                <strong>Location:</strong> {selectedTicket.location}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedTicket.description || "No description available"}
              </p>
              <p>
                <strong>Price:</strong> {selectedTicket.price || "Free"}
              </p>
              <button
                onClick={() =>
                  navigate("/Ticket", { state: { Ticket: selectedTicket } })
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

export default AllTickets;
