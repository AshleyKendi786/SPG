 import React, { useState, useEffect } from 'react';

const GoalForm = ({ goal, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name,
        targetAmount: goal.targetAmount,
        category: goal.category,
        deadline: goal.deadline
      });
    }
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      targetAmount: Number(formData.targetAmount),
      savedAmount: goal ? goal.savedAmount : 0,
      createdAt: goal ? goal.createdAt : new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onCancel}>&times;</span>
        <h2>{goal ? 'Edit Goal' : 'Add New Goal'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="goal-name">Goal Name</label>
            <input
              type="text"
              id="goal-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Vacation Fund"
            />
          </div>
          <div className="form-group">
            <label htmlFor="target-amount">Target Amount ($)</label>
            <input
              type="number"
              id="target-amount"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              min="1"
              required
              placeholder="1000"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Travel">Travel</option>
              <option value="Emergency">Emergency</option>
              <option value="Electronics">Electronics</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Education">Education</option>
              <option value="Shopping">Shopping</option>
              <option value="Retirement">Retirement</option>
              <option value="Home">Home</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <button type="submit" className="btn-primary">
            {goal ? 'Update Goal' : 'Save Goal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;