 import { useState } from "react";

export default function DepositForm({ goalId, goal, onDeposit }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    onDeposit(goalId, parseFloat(amount));
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <p>
        💸 Deposit to <strong>{goal?.name || "Goal"}</strong>
      </p>
      <input
        type="number"
        placeholder="Deposit amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">💰 Deposit</button>
    </form>
  );
}
