import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { fetchEntById, deleteEnt } from '../api/EntsAPI'; // make sure this is defined
import EditEntertainerForm from '../components/EditEntertainerForm'; // adjust path if needed
import { useNavigate } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams(); // grabs :id from URL
  const entertainerID = Number(id);
  const [editing, setEditing] = useState(false);

  const [ent, setEnt] = useState<Entertainer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this entertainer?'
    );
    if (!confirmDelete) return;

    try {
      await deleteEnt(entertainerID);
      navigate('/ents'); // redirect to list after delete
    } catch {
      alert('Failed to delete entertainer. Please try again.');
    }
  };

  useEffect(() => {
    const loadEnt = async () => {
      try {
        const data = await fetchEntById(entertainerID); // make sure this is defined
        setEnt(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEnt();
  }, [entertainerID]);

  if (loading) return <p>Loading entertainer...</p>;
  if (error || !ent)
    return (
      <p className="text-red-500">Error: {error || 'Entertainer not found'}</p>
    );

  return (
    <div>
      <h1>{ent.entStageName} - Details</h1>

      {editing ? (
        <EditEntertainerForm
          entertainer={ent}
          onSuccess={() => {
            setEditing(false);
            fetchEntById(entertainerID).then(setEnt);
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          <ul className="list-unstyled">
            <li>
              <strong>ID:</strong> {ent.entertainerId}
            </li>
            <li>
              <strong>SSN:</strong> {ent.entSsn}
            </li>
            <li>
              <strong>Address:</strong> {ent.entStreetAddress}
            </li>
            <li>
              <strong>City:</strong> {ent.entCity}
            </li>
            <li>
              <strong>State:</strong> {ent.entState}
            </li>
            <li>
              <strong>Zip:</strong> {ent.entZipCode}
            </li>
            <li>
              <strong>Phone:</strong> {ent.entPhoneNumber}
            </li>
            <li>
              <strong>Web Page:</strong> {ent.entWebPage}
            </li>
            <li>
              <strong>Email:</strong> {ent.entEmailAddress}
            </li>
            <li>
              <strong>Date Entered:</strong> {ent.dateEntered}
            </li>
          </ul>

          <button
            className="btn btn-primary me-2"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <br />
          <br />
          <button
            className="btn btn-secondary mb-3"
            onClick={() => navigate('/ents')}
          >
            ← Back to Entertainers
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
};

export default DetailsPage;
