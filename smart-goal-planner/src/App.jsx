 import { useState, useEffect } from "react";
import axios from "axios";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import "./App.css";

export default function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/goals")
      .then((res) => setGoals(res.data))
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

  const handleAddGoal = (newGoal) => {
    axios
      .post("http://localhost:3001/goals", newGoal)
      .then((res) => setGoals([...goals, res.data]))
      .catch((err) => console.error("Error adding goal:", err));
  };

  const handleDeposit = (goalId, amount) => {
    const goal = goals.find((g) => g.id === goalId);
    const updatedAmount = parseFloat(goal.savedAmount) + parseFloat(amount);

    axios
      .patch(`http://localhost:3001/goals/${goalId}`, {
        savedAmount: updatedAmount,
      })
      .then((res) => {
        setGoals(goals.map((g) => (g.id === goalId ? res.data : g)));
      })
      .catch((err) => console.error("Error depositing:", err));
  };

  const handleDelete = (goalId) => {
    axios
      .delete(`http://localhost:3001/goals/${goalId}`)
      .then(() => {
        setGoals(goals.filter((g) => g.id !== goalId));
      })
      .catch((err) => console.error("Error deleting goal:", err));
  };

  const isOverdue = (deadline) => new Date(deadline) < new Date();

  return (
    <div className="app-container">
      <h1>~🎯 Smart Goal Planner!~</h1>

      <GoalForm onAddGoal={handleAddGoal} />

      <h2>Your Goals</h2>
      <ul className="goal-list">
        {goals.map((goal) => {
          const progress = (goal.savedAmount / goal.targetAmount) * 100;
          return (
            <li
              key={goal.id}
              className={`goal-card ${isOverdue(goal.deadline) ? "overdue" : ""}`}
            >
              <div className="goal-header">
                <h3>{goal.name}</h3>
                <button onClick={() => handleDelete(goal.id)} className="delete-btn">
                  delete❌
                </button>
              </div>
              <p><strong>Category:</strong> {goal.category}</p>
              <p><strong>Target:</strong> ${goal.targetAmount}</p>
              <p><strong>Saved:</strong> ${goal.savedAmount}</p>
              <p><strong>Deadline:</strong> {goal.deadline}</p>
              {isOverdue(goal.deadline) && <p className="warning"> Overdue</p>}

              {/* ✅ Progress Bar Placement */}
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}>
                  {Math.round(progress)}%
                </div>
              </div>

              <DepositForm goalId={goal.id} goal={goal} onDeposit={handleDeposit} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
