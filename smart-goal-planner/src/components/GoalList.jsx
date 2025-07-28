 import React from 'react';

const GoalList = ({ goals, onToggle }) => {
  return (
    <ul className="p-2">
      {goals.map((goal, index) => (
        <li
          key={index}
          className={`p-2 my-1 border ${goal.completed ? 'bg-green-100 line-through' : ''}`}
          onClick={() => onToggle(index)}
        >
          {goal.text}
        </li>
      ))}
    </ul>
  );
};

export default GoalList;
