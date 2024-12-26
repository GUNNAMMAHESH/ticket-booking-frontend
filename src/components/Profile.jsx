import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { username, email, role } = useSelector((state) => state.user.user) || {};

  return (
    <div className="">
      <div className="min-h-96 backdrop-blur-sm flex items-center justify-center">
      <h1 className="text-orange-400 text-4xl font-semibold ">Profile</h1>
      <div className="flex flex-col border-l-4 border-orange-400 mx-3 pl-3">
        <div className="font-semibold text-2xl"><span>Name - </span> {username || "No Name Available"}</div>
        <div className="font-semibold text-2xl"><span>Email - </span>{email || "No Email Available"}</div>
        <div className="font-semibold text-2xl"><span>Role - </span> {role || "No Role Available"}</div>
      </div>
      </div>
    </div>
  );
}

export default Profile;
