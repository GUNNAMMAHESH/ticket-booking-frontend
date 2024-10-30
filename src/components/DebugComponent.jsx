import React from "react";
import { useSelector } from "react-redux";

const DebugComponent = () => {
  const { token, role } = useSelector((state) => state.user);

  return (
    <div>
      <p>Token: {token}</p>
      <p>Role: {role}</p>
    </div>
  );
};

export default DebugComponent;
