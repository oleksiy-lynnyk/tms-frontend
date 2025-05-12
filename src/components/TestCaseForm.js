import React, { useState, useEffect } from 'react';
import { createTestCase, updateTestCase } from '../api/testCaseApi';

const TestCaseForm = ({ onCreated, editingCase, onEditDone }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    steps: '',
    expectedResult: '',
    priority: 'Medium',
    tags: ''
  });

  useEffect(() => {
    if (editingCase) {
      setForm(editingCase);
    }
  }, [editingCase]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCase) {
      await updateTestCase(editingCase.id, form);
      onEditDone(); // повернення в режим створення
    } else {
      await createTestCase(form);
      onCreated(); // оновити список
    }
    setForm({ title: '', description: '', steps: '', expectedResult: '', priority: 'Medium', tags: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>{editingCase ? 'Edit Test Case' : 'Create Test Case'}</h5>
      <div className="mb-2">
        <input name="title" className="form-control" placeholder="Title" value={form.title} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <textarea name="description" className="form-control" placeholder="Description" value={form.description} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <textarea name="steps" className="form-control" placeholder="Steps" value={form.steps} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <textarea name="expectedResult" className="form-control" placeholder="Expected Result" value={form.expectedResult} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <select name="priority" className="form-select" value={form.priority} onChange={handleChange}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
      <div className="mb-2">
        <input name="tags" className="form-control" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary me-2">
        {editingCase ? 'Update' : 'Create'}
      </button>
      {editingCase && (
        <button type="button" className="btn btn-secondary" onClick={onEditDone}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TestCaseForm;
