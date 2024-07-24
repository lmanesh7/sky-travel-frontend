// MyBookingsPage.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingCard from "./BookingCard"; // Create a BookingCard component to display each booking
import { BACKEND_BASE_URL } from "../../../helpers/variables";
import "./MyBookingsPage.css"; // Ensure you have a CSS file for styling

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("userEmail"); // Assuming you have a context for authentication
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    // Fetch bookings when the component mounts
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/bookings/user/${currentUser}`);
        const data = await response.json();
        setBookingsData(data);
        console.log(bookingsData.length)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);

  const handleBookNow = () => {
    navigate("/flightschedules"); // Adjust the path to your booking page
  };

  return (
    <div className="my-bookings-page">
      <h2>My Bookings</h2>
      {bookingsData.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings yet!</p>
          <button onClick={handleBookNow} className="book-now-button">Book Now</button>
        </div>
      ) : (
        <div className="booking-cards">
          {bookingsData.map((booking) => (
            <BookingCard key={booking.booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
