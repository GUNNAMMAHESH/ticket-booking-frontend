import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import AllTickets from '../components/AllTickets';

function Tickets() {
  const location = useLocation();
  const { event } = location.state || {}; // Destructure event from location.state
  const navigate = useNavigate();

  // const eventPayload = {
  //   EventName: event.EventName,
  //   location: event.location,
  //   date: event.date,
  //   price: event.price,
  // };
  

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

  const submit = async (e) => {
    e.preventDefault();
    try {
      // Send booking data to backend
      const response = await axiosInstance.post("/tickets/createTicket", eventPayload);
  
      // Check for successful creation
      if (response.status === 201) { // Changed from 200 to 201
        console.log("Booking confirmed:", response.data);
  
        // Redirect to AllEvents page
        navigate("/");//navigate to all tickets
      }
    } catch (error) {
      console.error("Error creating ticket:", error.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold mb-4">Ticket Booking</h1>
      {event ? (
        <div className="bg-white p-6 rounded shadow-md w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-2">{event.EventName}</h2>
          <p><strong>Date:</strong> {formatDateTime(event.date)}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Description:</strong> {event.description || "No description available"}</p>
          <p><strong>Price:</strong> {event.price || "Free"}</p>

          {/* Booking confirmation button */}
          <button 
            className="bg-orange-400 text-white p-2 rounded mt-4"
            onClick={submit}
          >
            Confirm Booking
          </button>
        </div>
      ) : (
        <p>No Tickets found.</p>
      )}

      <AllTickets />
    </div>
  );
}

export default Tickets;
