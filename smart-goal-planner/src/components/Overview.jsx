 import React from 'react';

const Overview = ({ goals }) => {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  return (
    <div className="p-3 bg-white shadow rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved.toLocaleString()}</p>
      <p>Goals Completed: {completed}</p>
    </div>
  );
};

export default Overview;
