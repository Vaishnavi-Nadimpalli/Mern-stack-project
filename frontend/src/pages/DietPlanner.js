import React from "react";
import { Link } from "react-router-dom";

const DietPlanner = () => {
  return (
    <div>
      <h2>Select Your Goal</h2>
      <div>
        <Link to="/weight-loss-form">Weight Loss</Link>
      </div>
      <div>
        <Link to="/health-issues-form">Diet for Health Issues</Link>
      </div>
    </div>
  );
};

export default DietPlanner;
