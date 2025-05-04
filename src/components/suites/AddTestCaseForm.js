import React, { useState } from 'react';
import { createTestCase } from '../../api/testCaseApi';
import { addTestCaseToSuite } from '../../api/testSuiteApi';

const AddTestCaseForm = ({ suiteId, onAdded }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    steps: '',
    expectedResult: '',
    priority: 'Medium',
    tags: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await createTestCase(form);
    await addTestCaseToSuite(suiteId, created.data.id);
    setForm({
      title: '',
      description: '',
      steps: '',
      expectedResult: '',
      priority: 'Medium',
      tags: ''
    });
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mb-3 rounded bg-light">
      <h6>Add Test Case to Suite</h6>
      <input name="title" className="form-control mb-2" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" className="form-control mb-2" placeholder="Description" value={form.description} onChange={handleChange} />
      <textarea name="steps" className="form-control mb-2" placeholder="Steps" value={form.steps} onChange={handleChange} />
      <textarea name="expectedResult" className="form-control mb-2" placeholder="Expected Result" value={form.expectedResult} onChange={handleChange} />
      <select name="priority" className="form-select mb-2" value={form.priority} onChange={handleChange}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input name="tags" className="form-control mb-2" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
      <button type="submit" className="btn btn-primary">Add Test Case</button>
    </form>
  );
};

export default AddTestCaseForm;
