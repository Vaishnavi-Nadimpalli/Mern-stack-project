import React, { useState } from "react";

const HealthIssuesForm = () => {
  const [issues, setIssues] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ issues });
    // You can add an API call here to save or fetch diet plans
  };

  return (
    <div>
      <h2>Diet for Health Issues</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe your health issues"
          value={issues}
          onChange={(e) => setIssues(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HealthIssuesForm;
