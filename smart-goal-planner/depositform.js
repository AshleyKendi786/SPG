 import React, { useState } from 'react';

const DepositForm = ({ goals, onDeposit }) => {
  const [amount, setAmount] = useState('');
  const [goalId, setGoalId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0 || !goalId) {
      alert('Please enter a valid amount and select a goal');
      return;
    }
    onDeposit(goalId, Number(amount));
    setAmount('');
    setGoalId('');
  };

  return (
    <div className="deposit-form">
      <h3>Make a Deposit</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deposit-amount">Amount ($)</label>
          <input
            type="number"
            id="deposit-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="deposit-goal">Select Goal</label>
          <select
            id="deposit-goal"
            value={goalId}
            onChange={(e) => setGoalId(e.target.value)}
          >
            <option value="">-- Select Goal --</option>
            {goals
              .filter(goal => goal.savedAmount < goal.targetAmount)
              .map(goal => (
                <option key={goal.id} value={goal.id}>
                  {goal.name} (${goal.targetAmount - goal.savedAmount} remaining)
                </option>
              ))}
          </select>
        </div>
        <button type="submit" className="btn-secondary">
          Add Deposit
        </button>
      </form>
    </div>
  );
};

export default DepositForm;