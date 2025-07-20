  import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPiggyBank } from 'react-icons/fa';
import GoalCard from './components/GoalCard';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import StatCard from './components/StatCard';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:3001/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const createGoal = async (goalData) => {
    try {
      await axios.post('http://localhost:3001/goals', goalData);
      fetchGoals();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const updateGoal = async (goalData) => {
    try {
      await axios.put(`http://localhost:3001/goals/${goalData.id}`, goalData);
      fetchGoals();
      setShowForm(false);
      setCurrentGoal(null);
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await axios.delete(`http://localhost:3001/goals/${id}`);
        fetchGoals();
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  const makeDeposit = async (goalId, amount) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      const updatedGoal = {
        ...goal,
        savedAmount: goal.savedAmount + amount
      };
      await axios.put(`http://localhost:3001/goals/${goalId}`, updatedGoal);
      fetchGoals();
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };

  const handleSave = (goalData) => {
    if (currentGoal) {
      updateGoal({ ...goalData, id: currentGoal.id });
    } else {
      createGoal(goalData);
    }
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

  return (
    <div className="container">
      <header>
        <h1><FaPiggyBank /> Smart Goal Planner</h1>
        <div className="overview-stats">
          <StatCard title="Total Goals" value={goals.length} />
          <StatCard title="Total Saved" value={`$${totalSaved.toLocaleString()}`} />
          <StatCard title="Goals Completed" value={completedGoals} />
        </div>
      </header>

      <div className="main-content">
        <div className="actions-panel">
          <button 
            className="btn-primary" 
            onClick={() => {
              setCurrentGoal(null);
              setShowForm(true);
            }}
          >
            <FaPiggyBank /> Add New Goal
          </button>
          
          <DepositForm goals={goals} onDeposit={makeDeposit} />
        </div>

        <div className="goals-container">
          <h2>Your Savings Goals</h2>
          <div className="goals-list">
            {goals.length === 0 ? (
              <p className="no-goals">No goals found. Add your first savings goal!</p>
            ) : (
              goals.map(goal => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={(goal) => {
                    setCurrentGoal(goal);
                    setShowForm(true);
                  }}
                  onDelete={deleteGoal}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <GoalForm
          goal={currentGoal}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setCurrentGoal(null);
          }}
        />
      )}
    </div>
  );
}

export default App;