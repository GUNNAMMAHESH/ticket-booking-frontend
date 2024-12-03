import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import formatDateTime from "../utils/formatDateTime";
import axiosInstance from "../utils/axiosInstance";
import AllTickets from "../components/AllTickets";
import { toast } from "react-toastify";
import { toastSettings } from "../utils/toastSettings";

function Tickets() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Set event data in state so it can be updated
  const [event, setEvent] = useState(location.state?.event || null);

  const eventPayload = event
    ? {
        EventName: event.EventName || null,
        location: event.location || null,
        date: event.date || null,
        price: event.price || null,
        photo: event.photo || null,
      }
    : null;

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!eventPayload) return;
    try {
      console.log(eventPayload);

      const response = await axiosInstance.post(
        "/tickets/createTicket",
        eventPayload
      );
      if (response.status === 201) {
        toast.success("Booking Successfull",toastSettings)
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating ticket:", error.message);
      toast.success(error.message,toastSettings)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Render confirmation section only if event is available */}
      {event ? (
        <>
          <h1 className="text-3xl font-semibold mb-4">Confirm Your Booking</h1>
          <div className="bg-white p-6 rounded shadow-md w-full md:w-1/2 ">
            <h2 className="text-2xl font-semibold mb-2">{event.EventName}</h2>
            <p>
              <strong>Date:</strong> {formatDateTime(event.date)}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {event.description || "No description available"}
            </p>
            <p>
              <strong>Price:</strong> {event.price || "Free"}
            </p>

            <button
              className="bg-orange-400 text-white p-2 rounded mt-4 hover:opacity-75 font-semibold"
              onClick={submit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
            <button
              className="bg-gray-400 text-white p-2 rounded mt-4 ml-4  font-semibold"
              onClick={() => setEvent(null)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        ""
      )}

      <AllTickets />
    </div>
  );
}

export default Tickets;
