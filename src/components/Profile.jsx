import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { username, email, role } = useSelector((state) => state.user.user); // Destructure user info

  console.log("profile.username", username);
  console.log("profile.role", role);

  return (
    <div className="backdrop-blur-sm flex items-center justify-center  min-h-96 ">
      <h1 className="text-orange-400 text-2xl font-semibold ">Profile</h1>
      <div className="flex flex-col border-l-4 border-orange-400 mx-3 pl-3">
        <div><span>Name - </span> {username}</div>
        <div><span>Email - </span>{email}</div>
        <div><span>Role - </span> {role}</div>
      </div>
    </div>
  );
}

export default Profile;
