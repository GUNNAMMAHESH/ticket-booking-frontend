import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastSettings } from "../utils/toastSettings";
import formatDateTime from "../utils/formatDateTime";
import { MdCloseFullscreen } from "react-icons/md";

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const { role, id } = useSelector((state) => state.user.user) || {};
  const isMounted = useRef(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const params = role === "admin" ? {} : { userId: id };
      const response = await axiosInstance.get("/tickets/getTickets", {
        params,
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setTickets(response.data.data);
        if (response.data.data.length === 0) {
          toast.error("No tickets found.", toastSettings);
        }
      } else {
        toast.error("Failed to load tickets.", toastSettings);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error(
        "Failed to load tickets. Please try again later.",
        toastSettings
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      fetchTickets();
      isMounted.current = true;
    }
  }, [fetchTickets]);

  const handleShowModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await axiosInstance.delete(`/tickets/DeleteTicket/${ticketId}`);
      setTickets((prevTickets) =>
        prevTickets.filter((t) => t._id !== ticketId)
      );
      handleCloseModal();
      toast.success("Ticket deleted successfully.", toastSettings);
    } catch (error) {
      console.error("Failed to delete ticket:", error);
      toast.error("Failed to delete ticket.", toastSettings);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-orange-400 font-semibold text-3xl mb-6">
        Your Tickets
      </h1>

      {loading ? (
        <div className="text-xl text-gray-500">Loading Tickets...</div>
      ) : error ? (
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => handleShowModal(ticket)}
                className="flex flex-col justify-end items-start w-80 min-h-80 p-4 text-white text-xl font-semibold border rounded-lg cursor-pointer transition bg-cover bg-center hover:bg-orange-500"
                style={{
                  backgroundImage: `url(${
                    ticket.photo ||
                    "https://via.placeholder.com/150?text=No+Image"
                  })`,
                  backgroundColor: ticket.photo ? "transparent" : "#fb923c",
                }}
              >
                <div>
                  <div>{ticket.EventName}</div>
                  <div>{formatDateTime(ticket.date)}</div>
                  <div>{ticket.location}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-red-500">No tickets found.</div>
          )}
        </div>
      )}

      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 w-11/12 sm:w-3/4 lg:w-1/2 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                {selectedTicket.TicketName}
              </h2>
              <button
                className="text-3xl font-semibold text-orange-400"
                onClick={handleCloseModal}
              >
                <MdCloseFullscreen />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 text-left leading-8 text-lg">
              <div className="w-full lg:w-1/2 h-64">
                <img
                  src={
                    selectedTicket.photo ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={selectedTicket.TicketName}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
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
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDeleteTicket(selectedTicket._id)}
                className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 active:opacity-50"
              >
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTickets;
