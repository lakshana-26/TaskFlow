import TaskCard from './TaskCard.jsx';

const TaskColumn = ({
  categoryKey, // 'Pending' | 'Ongoing' | 'Completed'
  title,
  columnClass,
  tasks = [],
  onStatusChange,
  onDeleteTask
}) => {
  return (
    <div className={`category-column ${columnClass} h-100`}>
      <div className="column-header">
        <h2 className="column-title">
          {categoryKey === 'Pending' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          )}
          {categoryKey === 'Ongoing' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          )}
          {categoryKey === 'Completed' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )}
          {title}
        </h2>
        <span className="column-count-badge">
          {tasks.length}
        </span>
      </div>

      <div className="tasks-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={onStatusChange}
              onDeleteTask={onDeleteTask}
            />
          ))
        ) : (
          <div className="empty-column-state">
            <p>No {title.toLowerCase()} tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
