import { useState } from "react";

export default function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    targetAmount: "",
    savedAmount: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert numeric fields to numbers
    const newGoal = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: parseFloat(formData.savedAmount),
    };

    onAddGoal(newGoal);

    // Reset form after submission
    setFormData({
      name: "",
      category: "",
      targetAmount: "",
      savedAmount: "",
      deadline: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>Add New Goal</h2>

      <input
        type="text"
        name="name"
        placeholder="Goal name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="targetAmount"
        placeholder="Target amount"
        value={formData.targetAmount}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="savedAmount"
        placeholder="Saved amount"
        value={formData.savedAmount}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />

      <button type="submit">➕ Add Goal</button>
    </form>
  );
}
