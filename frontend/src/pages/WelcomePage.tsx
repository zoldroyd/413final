import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="card-title mb-3">Welcome to the Entertainment Agency</h2>
        <p className="card-text">
          Discover talented entertainers and explore their booking history.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/ents')}>
          View Entertainers
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
