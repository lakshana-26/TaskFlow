const Header = ({ totalCount }) => {
  const countLabel = totalCount === 1 ? '1 Task' : `${totalCount} Tasks`;

  return (
    <header className="taskflow-header">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h1 className="brand-title">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
                <path d="M7 7h.01"/>
              </svg>
              TaskFlow
            </h1>
            <p className="brand-tagline">Plan your work, track your progress.</p>
          </div>

          <div>
            <div className="task-counter-pill" title="Total Tasks in Dashboard">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              <span>{countLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
