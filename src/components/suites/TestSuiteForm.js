import React, { useEffect, useState } from 'react';
import { createSuite, updateSuite } from '../../api/testSuiteApi';

const TestSuiteForm = ({ onSave, editingSuite, onCancel }) => {
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    if (editingSuite) setForm(editingSuite);
  }, [editingSuite]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingSuite) {
      await updateSuite(editingSuite.id, form);
    } else {
      await createSuite(form);
    }
    setForm({ name: '', description: '' });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>{editingSuite ? 'Edit Suite' : 'Create Suite'}</h5>
      <input name="name" className="form-control mb-2" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" className="form-control mb-2" placeholder="Description" value={form.description} onChange={handleChange} />
      <button type="submit" className="btn btn-primary me-2">{editingSuite ? 'Update' : 'Create'}</button>
      {editingSuite && (
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      )}
    </form>
  );
};

export default TestSuiteForm;
