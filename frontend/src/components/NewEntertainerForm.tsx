import { useState } from 'react';
import { Entertainer } from '../types/Entertainer';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewEntertainerForm = ({ onSuccess, onCancel }: Props) => {
  const [formData, setFormData] = useState<Omit<Entertainer, 'entertainerId'>>({
    entStageName: '',
    entSsn: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    dateEntered: new Date().toISOString().split('T')[0], // today's date
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:9999/Ent/AddEnt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create entertainer');
      onSuccess();
    } catch {
      alert('Create failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label>Stage Name</label>
        <input
          name="entStageName"
          value={formData.entStageName}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>SSN</label>
        <input
          name="entSsn"
          value={formData.entSsn}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Street Address</label>
        <input
          name="entStreetAddress"
          value={formData.entStreetAddress}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>City</label>
        <input
          name="entCity"
          type="string"
          value={formData.entCity}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>State</label>
        <input
          name="entState"
          value={formData.entState}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Zip Code</label>
        <input
          name="entZipCode"
          value={formData.entZipCode}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Phone Number</label>
        <input
          name="entPhoneNumber"
          value={formData.entPhoneNumber}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Web Page</label>
        <input
          name="entWebPage"
          value={formData.entWebPage}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Email Address</label>
        <input
          name="entEmailAddress"
          value={formData.entEmailAddress}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Date Entered</label>
        <input
          name="dateEntered"
          type="date"
          value={formData.dateEntered}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-success me-2">
        Save
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewEntertainerForm;
