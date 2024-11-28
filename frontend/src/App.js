import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DietPlanner from "./pages/DietPlanner";
import WeightLossForm from "./pages/WeightLossForm";
import HealthIssuesForm from "./pages/HealthIssuesForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diet-planner" element={<DietPlanner />} />
        <Route path="/weight-loss-form" element={<WeightLossForm />} />
        <Route path="/health-issues-form" element={<HealthIssuesForm />} />
      </Routes>
    </Router>
  );
};

export default App;
