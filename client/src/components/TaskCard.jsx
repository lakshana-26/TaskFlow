import { useState } from 'react';

const TaskCard = ({ task, onStatusChange, onDeleteTask }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === task.status) return;

    try {
      setIsUpdating(true);
      await onStatusChange(task._id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDeleteTask(task._id);
    } finally {
      setIsDeleting(false);
    }
  };

  const statusBorderClass = 
    task.status === 'Completed' 
      ? 'border-completed' 
      : task.status === 'Ongoing' 
      ? 'border-ongoing' 
      : 'border-pending';

  // Format created date
  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  return (
    <div className={`task-card ${statusBorderClass}`}>
      <div className="task-title">{task.title}</div>
      
      {formattedDate && (
        <div className="task-card-meta">
          Added {formattedDate}
        </div>
      )}

      <div className="task-actions">
        <div>
          <select
            className="form-select form-select-sm status-select"
            value={task.status}
            onChange={handleStatusChange}
            disabled={isUpdating || isDeleting}
            aria-label="Change task status"
          >
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-delete-task"
            onClick={handleDelete}
            disabled={isUpdating || isDeleting}
            title="Delete this task"
          >
            {isDeleting ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
