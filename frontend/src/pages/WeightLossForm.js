import React, { useState } from "react";

const WeightLossForm = () => {
  const [country, setCountry] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ country, weight });
    // You can add an API call here to save or fetch diet plans
  };

  return (
    <div>
      <h2>Weight Loss Plan</h2>
      <form onSubmit={handleSubmit}>
        <select value={country} onChange={(e) => setCountry(e.target.value)} required>
          <option value="">Select Your Country</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          {/* Add more countries */}
        </select>
        <input
          type="number"
          placeholder="Current Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WeightLossForm;
