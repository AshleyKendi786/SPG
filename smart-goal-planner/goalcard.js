
import { FaEdit, FaTrash, FaCheckCircle, FaExclamationTriangle, FaCalendarAlt } from 'react-icons/fa';

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const progressPercentage = (goal.savedAmount / goal.targetAmount) * 100;
  const remainingAmount = goal.targetAmount - goal.savedAmount;
  
  const today = new Date();
  const deadline = new Date(goal.deadline);
  const timeDiff = deadline - today;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  let statusClass = '';
  let deadlineStatus = '';
  
  if (progressPercentage >= 100) {
    statusClass = 'completed';
  } else if (daysRemaining < 0) {
    statusClass = 'overdue';
    deadlineStatus = 'overdue';
  } else if (daysRemaining <= 30) {
    statusClass = 'warning';
    deadlineStatus = 'warning';
  }
  
  const getDeadlineText = () => {
    if (progressPercentage >= 100) {
      return <><FaCheckCircle /> Goal completed!</>;
    } else if (daysRemaining < 0) {
      return <><FaExclamationTriangle /> Deadline passed! Goal overdue.</>;
    } else if (daysRemaining <= 30) {
      return <><FaExclamationTriangle /> Only {daysRemaining} days left to reach your goal!</>;
    } else {
      return <><FaCalendarAlt /> {daysRemaining} days remaining</>;
    }
  };

  return (
    <div className={`goal-card ${statusClass}`}>
      <div className="goal-header">
        <div>
          <h3 className="goal-title">{goal.name}</h3>
          <span className="goal-category">{goal.category}</span>
        </div>
        <div className="goal-actions">
          <button className="action-btn" onClick={() => onEdit(goal)}>
            <FaEdit />
          </button>
          <button className="action-btn" onClick={() => onDelete(goal.id)}>
            <FaTrash />
          </button>
        </div>
      </div>
      
      <div className="goal-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="progress-text">
          <span>${goal.savedAmount.toLocaleString()} saved</span>
          <span>${goal.targetAmount.toLocaleString()} target</span>
        </div>
      </div>
      
      <div className="goal-details">
        <p><span>Progress:</span> <span>{progressPercentage.toFixed(1)}%</span></p>
        <p><span>Remaining:</span> <span>${remainingAmount.toLocaleString()}</span></p>
      </div>
      
      <div className={`deadline-info ${deadlineStatus}`}>
        {getDeadlineText()}
      </div>
    </div>
  );
};

export default GoalCard;