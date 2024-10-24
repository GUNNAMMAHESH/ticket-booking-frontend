import React from 'react';
import Allmovies from '../components/allmovies';
import { useSelector } from 'react-redux';

function Home() {
  // Access the name property from the user object in the Redux state
  const name = useSelector((state) => state.user.user.username); // Correct path to access the name
  console.log("name",name);
  

  return (
    <div>
      <div>Welcome, {name ? name : 'Guest'}!</div> {/* Display user name or fallback text */}
      <Allmovies />
    </div>
  );
}

export default Home;
