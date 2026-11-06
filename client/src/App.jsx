import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header.jsx';
import TaskInput from './components/TaskInput.jsx';
import TaskColumn from './components/TaskColumn.jsx';
import { getTasks, createTask, updateTaskStatus, deleteTask } from './services/api.js';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Fetch tasks helper
  const loadTasks = useCallback(async () => {
    try {
      setErrorMessage('');
      const response = await getTasks();
      setTasks(response?.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setErrorMessage(
        err.response?.data?.message ||
        'Unable to connect to the backend server. Please verify the backend is running on port 5000.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tasks on initial mount
  useEffect(() => {
    let isMounted = true;

    const initializeTasks = async () => {
      try {
        setLoading(true);
        setErrorMessage('');
        const response = await getTasks();
        if (isMounted) {
          setTasks(response?.data || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching tasks on mount:', err);
          setErrorMessage(
            err.response?.data?.message ||
            'Unable to connect to the backend server. Please verify the backend is running on port 5000.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  // Flash a success notice for user feedback
  const showNotice = (msg) => {
    setSuccessNotice(msg);
    setTimeout(() => {
      setSuccessNotice('');
    }, 3000);
  };

  // Add a new task handler
  const handleAddTask = async (title, onSuccessCallback) => {
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      const response = await createTask(title);
      if (response && response.data) {
        setTasks((prevTasks) => [response.data, ...prevTasks]);
        showNotice('Task created successfully!');
        if (onSuccessCallback) onSuccessCallback();
      }
    } catch (err) {
      console.error('Error adding task:', err);
      setErrorMessage(
        err.response?.data?.message || 'Failed to add task. Please check your network connection.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update task status handler
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setErrorMessage('');
      const response = await updateTaskStatus(taskId, newStatus);
      if (response && response.data) {
        // Automatically moves the task to the correct section
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === taskId ? response.data : t))
        );
        showNotice(`Moved to ${newStatus}!`);
      }
    } catch (err) {
      console.error('Error updating task status:', err);
      setErrorMessage(
        err.response?.data?.message || 'Failed to update task status.'
      );
      loadTasks();
    }
  };

  // Delete task handler
  const handleDeleteTask = async (taskId) => {
    try {
      setErrorMessage('');
      await deleteTask(taskId);
      // Total count and columns update automatically
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
      showNotice('Task deleted.');
    } catch (err) {
      console.error('Error deleting task:', err);
      setErrorMessage(
        err.response?.data?.message || 'Failed to delete task.'
      );
      loadTasks();
    }
  };

  // Categorize tasks for the three sections
  const pendingTasks = useMemo(
    () => tasks.filter((t) => t.status === 'Pending'),
    [tasks]
  );

  const ongoingTasks = useMemo(
    () => tasks.filter((t) => t.status === 'Ongoing'),
    [tasks]
  );

  const completedTasks = useMemo(
    () => tasks.filter((t) => t.status === 'Completed'),
    [tasks]
  );

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header totalCount={tasks.length} />

      {/* Main Dashboard Content */}
      <main className="main-content">
        <div className="container">
          {/* Dashboard Headings */}
          <div className="mb-4">
            <h1 className="dashboard-heading">Task Management Dashboard</h1>
            <p className="dashboard-subtitle">Organize your daily tasks in one place.</p>
          </div>

          {/* Alert Messages */}
          {errorMessage && (
            <div className="alert alert-danger alert-dismissible fade show alert-custom mb-4" role="alert">
              <strong>Error:</strong> {errorMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setErrorMessage('')}
                aria-label="Close"
              ></button>
            </div>
          )}

          {successNotice && (
            <div className="alert alert-success alert-dismissible fade show alert-custom mb-4" role="alert">
              {successNotice}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccessNotice('')}
                aria-label="Close"
              ></button>
            </div>
          )}

          {/* Task Input Section */}
          <TaskInput onAddTask={handleAddTask} isSubmitting={isSubmitting} />

          {/* Loading Indicator */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border spinner-violet" role="status">
                <span className="visually-hidden">Loading tasks...</span>
              </div>
              <p className="mt-3 text-muted">Loading your tasks from MongoDB...</p>
            </div>
          ) : (
            /* Task Categories: 3 Separate Columns */
            <div className="row g-4 align-items-stretch">
              {/* 1. PENDING (Light blue background/theme) */}
              <div className="col-12 col-md-4 task-col-wrapper">
                <TaskColumn
                  categoryKey="Pending"
                  title="Pending"
                  columnClass="column-pending"
                  tasks={pendingTasks}
                  onStatusChange={handleStatusChange}
                  onDeleteTask={handleDeleteTask}
                />
              </div>

              {/* 2. ONGOING (Light violet/purple background/theme) */}
              <div className="col-12 col-md-4 task-col-wrapper">
                <TaskColumn
                  categoryKey="Ongoing"
                  title="Ongoing"
                  columnClass="column-ongoing"
                  tasks={ongoingTasks}
                  onStatusChange={handleStatusChange}
                  onDeleteTask={handleDeleteTask}
                />
              </div>

              {/* 3. COMPLETED (Light green background/theme) */}
              <div className="col-12 col-md-4 task-col-wrapper">
                <TaskColumn
                  categoryKey="Completed"
                  title="Completed"
                  columnClass="column-completed"
                  tasks={completedTasks}
                  onStatusChange={handleStatusChange}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
