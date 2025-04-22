import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { fetchEnts } from '../api/EntsAPI';
import NewEntertainerForm from './NewEntertainerForm';

function Entlist() {
  const [ents, setEnts] = useState<Entertainer[]>([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEnts = async () => {
      try {
        setLoading(true);
        const data = await fetchEnts();
        const fetchedEnts = Array.isArray(data) ? data : data.ents;
        setEnts(fetchedEnts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEnts();
  }, []);

  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      {adding ? (
        <NewEntertainerForm
          onSuccess={async () => {
            setAdding(false);
            const data = await fetchEnts();
            const fetchedEnts = Array.isArray(data) ? data : data.ents;
            setEnts(fetchedEnts);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <>
          {ents.map((e) => (
            <div
              id="projectCard"
              className="card mb-3"
              key={e.entertainerId ?? `${e.entStageName}-${Math.random()}`}
            >
              <h3 className="card-title">{e.entStageName}</h3>
              <ul className="list-unstyled">
                <li>
                  <strong>Entertainer Stage Name: </strong>
                  {e.entStageName}
                </li>
                <li>
                  <strong>Bookings: </strong>
                  {e.bookingsCount ?? 0}
                </li>
                <li>
                  <strong>Last Booking: </strong>
                  {e.lastBookingDate ?? 'N/A'}
                </li>
              </ul>

              <div className="card-body">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    if (
                      e.entertainerId != null &&
                      !isNaN(Number(e.entertainerId))
                    ) {
                      navigate(`/ents/${e.entertainerId}`);
                    } else {
                      console.warn('Invalid entertainer ID:', e);
                    }
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn btn-primary mb-3"
            onClick={() => setAdding(true)}
          >
            Add Entertainer
          </button>
          <br />
          <button
            className="btn btn-outline-primary rounded-pill px-4 py-2"
            onClick={() => navigate('/')}
          >
            🌟 Back to Welcome
          </button>
        </>
      )}
    </div>
  );
}

export default Entlist;
