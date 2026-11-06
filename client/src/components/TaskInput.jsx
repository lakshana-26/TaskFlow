import { useState } from 'react';

const TaskInput = ({ onAddTask, isSubmitting }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) {
      setValidationError('Please enter a task title. Empty tasks are not accepted.');
      return;
    }

    setValidationError('');
    onAddTask(trimmedTitle, () => {
      setTaskTitle('');
    });
  };

  const handleChange = (e) => {
    setTaskTitle(e.target.value);
    if (validationError && e.target.value.trim() !== '') {
      setValidationError('');
    }
  };

  return (
    <div className="task-input-card">
      <form onSubmit={handleSubmit}>
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-9 col-lg-10">
            <input
              type="text"
              className={`form-control task-input-field ${validationError ? 'is-invalid' : ''}`}
              placeholder="Enter your task..."
              value={taskTitle}
              onChange={handleChange}
              disabled={isSubmitting}
              autoFocus
            />
            {validationError && (
              <div className="invalid-feedback d-block mt-1 ps-1 fw-semibold">
                {validationError}
              </div>
            )}
          </div>
          <div className="col-12 col-md-3 col-lg-2">
            <button
              type="submit"
              className="btn btn-add-task w-100"
              disabled={isSubmitting || !taskTitle.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Adding...
                </>
              ) : (
                <>+ Add Task</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
