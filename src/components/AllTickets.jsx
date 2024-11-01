import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const { role, id } = useSelector((state) => state.user.user) || {};
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const params = role === "admin" ? {} : { userId: id };
        const response = await axiosInstance.get("/tickets/getTickets", { params });

        if (response.data.success && Array.isArray(response.data.data)) {
          setTickets(response.data.data);
          if (response.data.data.length === 0) {
            toast.error("No tickets found.");
          }
        } else {
          toast.error("Failed to load tickets.");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast.error("Failed to load tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (!isMounted.current) {
      fetchTickets();
      isMounted.current = true;
    }
  }, [role, id]);

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
      setTickets((prevTickets) => prevTickets.filter((t) => t._id !== ticketId));
      handleCloseModal();
      toast.success("Ticket deleted successfully.");
    } catch (error) {
      console.error("Failed to delete ticket:", error);
      toast.error("Failed to delete ticket.");
    }
  };

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

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-orange-400 font-semibold text-3xl mb-6">Your Tickets</h1>

      {loading ? (
        <div className="text-xl text-gray-500">Loading Tickets...</div>
      ) : (
        <div className="flex flex-row flex-nowrap overflow-x-auto space-x-4 py-4">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => handleShowModal(ticket)}
                className="flex flex-col justify-end items-start w-64 h-80 min-h-[12rem] p-4 text-white text-xl font-semibold border rounded-lg cursor-pointer transition bg-cover bg-center hover:bg-orange-500"
                style={{
                  backgroundImage: ticket.photo ? `url(${ticket.photo})` : "none",
                  backgroundColor: ticket.photo ? "transparent" : "#fb923c",
                }}
              >
                <div>
                  <div>{ticket.TicketName}</div>
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
          <div className="bg-white p-6 w-[90%] md:w-[60%] lg:w-[40%] h-1/2 rounded shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{selectedTicket.TicketName}</h2>
              <span className="font-semibold text-4xl cursor-pointer" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <div className="flex flex-col text-left leading-10 text-xl mt-auto">
              <p><strong>Date:</strong> {formatDateTime(selectedTicket.date)}</p>
              <p><strong>Location:</strong> {selectedTicket.location}</p>
              <p><strong>Description:</strong> {selectedTicket.description || "No description available"}</p>
              <p><strong>Price:</strong> {selectedTicket.price || "Free"}</p>
              {selectedTicket.photo && (
                <img src={selectedTicket.photo} alt={selectedTicket.TicketName} className="mb-2 w-full h-32 object-cover rounded-lg" />
              )}
              <div className="flex justify-end">
                <button onClick={() => handleDeleteTicket(selectedTicket._id)} className="bg-red-600 text-white px-2 rounded">
                  Delete Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTickets;
