import axiosInstance from "../../utils/axiosInstance";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import formatDateTime from "../../utils/formatDateTime";
import { toast } from "react-toastify";
import { toastSettings } from "../../utils/toastSettings";

const CreateEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isEditing = location.state?.event || null;

  const [event, setEvent] = useState({
    EventName: "",
    description: "",
    date: "",
    location: "",
    price: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const { EventName, description, date, location, price } = isEditing;
      
      // Convert the date to the format required by `datetime-local`
      const formattedDate = date
        ? new Date(date).toISOString().slice(0, 16) // Extract 'YYYY-MM-DDTHH:MM'
        : "";

      setEvent({
        EventName: EventName || "",
        description: description || "",
        date: formattedDate, // Use formatted date
        location: location || "",
        price: price || "",
        photo: null,
      });
    }
  }, [isEditing]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setEvent({ ...event, [name]: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  const handleValidation = () => {
    if (isNaN(event.price) || event.price <= 0) {
      toast.error("Price must be a positive number", toastSettings);
      return false;
    }

    if (event.date && new Date(event.date) < new Date()) {
      toast.error("Date cannot be in the past", toastSettings);
      return false;
    }

    if (event.photo && event.photo.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB", toastSettings);
      return false;
    }

    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!handleValidation()) return;

    setLoading(true);
    const formData = new FormData();
    for (const key in event) {
      if (event[key] !== null) {
        formData.append(key, event[key]);
      }
    }

    try {
      let response;
      if (isEditing) {
        response = await axiosInstance.patch(
          `http://localhost:5000/events/editEvent/${isEditing._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Updated Successfully", toastSettings);
      } else {
        response = await axiosInstance.post(
          "https://ticket-booking-backend-ten.vercel.app/events/create",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Created Successfully", toastSettings);
      }
      navigate("/events");
    } catch (error) {
      console.error("Failed to create or update event", error.message);
      toast.error(`${error.message}`,toastSettings)

      if (error.response?.status === 400) {
        toast.error("Validation error. Please check your input.", toastSettings);
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.", toastSettings);
      } else {
        toast.error(`${error.message}`, toastSettings);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="max-w-md mx-auto p-5 pt-3 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-1">
          {isEditing ? "Edit Event" : "Create Event"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="EventName" className="block font-semibold">
              Event Name
            </label>
            <input
              type="text"
              id="EventName"
              name="EventName"
              value={event.EventName}
              onChange={handleChange}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              rows="2"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="date" className="block font-semibold">
              Date & Time
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="flex gap-4 ">
          <div className="mb-1">
            <label htmlFor="price" className="block font-semibold">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={event.price}
              onChange={handleChange}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="location" className="block font-semibold">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={event.location}
              onChange={handleChange}
              className="w-full p-1 border rounded"
              required
            />
          </div>
          </div>
          <div className="mb-2">
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
            />
          </div>
          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Event Preview"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full font-semibold bg-orange-400 text-white py-2 rounded hover:text-orange-600 hover:bg-white hover:border-2 hover:border-orange-400 transition ease-in-out delay-250 active:bg-orange-400 active:text-white"
            disabled={loading}
          >
            {loading ? "Processing..." : isEditing ? "Update Event" : "Create Event"}
          </button>
          <button
            type="button"
            className="w-full mt-2 font-semibold bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
            onClick={() => navigate("/events")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
