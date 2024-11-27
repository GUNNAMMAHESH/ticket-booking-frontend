import axiosInstance from "../../utils/axiosInstance";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import formatDateTime from "../../utils/formatDateTime";
const CreateEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isEditing = location.state?.event || null;
  console.log(isEditing);
  

  const [event, setEvent] = useState({
    EventName: "",
    description: "",
    date: "",
    location: "",
    price: "",
    photo: null,
  });

  useEffect(() => {
    if (isEditing) {
      const { EventName, description, date, location, price } = isEditing;
      console.log("date",date);
      
      setEvent({
        EventName: EventName || "",
        description: description || "",
        date:formatDateTime(date)|| "",
        location: location || "",
        price: price || "",
        photo: null, 
      });
    }
  }, [isEditing]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setEvent({ ...event, [name]: files[0] });
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (const key in event) {
      if (event[key] !== null) {
        formData.append(key, event[key]);
      }
    }

    try {
      let response;
      if (isEditing) {
        response = await axiosInstance.post(
          `https://ticket-booking-backend-ten.vercel.app/events/${isEditing._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axiosInstance.post(
          "https://ticket-booking-backend-ten.vercel.app/events/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      console.log(response.data);
      navigate("/events"); 
    } catch (error) {
      console.error("Failed to create or update event", error.message);
    }
  }

  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Event" : "Create Event"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="EventName" className="block font-semibold">
              Event Name
            </label>
            <input
              type="text"
              id="EventName"
              name="EventName"
              value={event.EventName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="mt-4 w-full p-2 border border-gray-300 rounded"
              rows="3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block font-semibold">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-semibold">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={event.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block font-semibold">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={event.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block font-semibold">
              Event Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required={!isEditing} 
            />
          </div>
          <button
            type="submit"
            className="w-full font-semibold bg-orange-400 text-white py-2 rounded hover:text-orange-600 hover:bg-white hover:border-2 hover:border-orange-400 transition ease-in-out delay-250 active:bg-orange-400 active:text-white"
          >
            {isEditing ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
