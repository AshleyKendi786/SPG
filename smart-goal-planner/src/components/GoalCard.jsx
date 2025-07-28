 import React from 'react';

const GoalCard = ({ goal, onDelete, onDeposit }) => {
  const { id, name, targetAmount, savedAmount, deadline, category } = goal;

  const progress = Math.min((savedAmount / targetAmount) * 100, 100).toFixed(1);
  const remaining = targetAmount - savedAmount;
  const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const isOverdue = new Date(deadline) < new Date() && savedAmount < targetAmount;

  return (
    <div className="border p-3 rounded mb-3 shadow">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>Category: {category}</p>
      <p>Saved: ${savedAmount} / ${targetAmount}</p>
      <p>Remaining: ${remaining}</p>
      <div className="w-full bg-gray-300 rounded h-4 my-2">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p>Progress: {progress}%</p>
      <p>
        Deadline: {deadline} ({daysLeft} days left)
        {isOverdue && <span className="text-red-600 ml-2">⚠️ Overdue!</span>}
        {!isOverdue && daysLeft <= 30 && <span className="text-yellow-600 ml-2">⏰ Deadline Soon</span>}
      </p>
      <div className="mt-2 flex gap-2">
        <button onClick={() => onDeposit(goal)} className="bg-blue-500 text-white px-2 py-1 rounded">
          Deposit
        </button>
        <button onClick={() => onDelete(id)} className="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
