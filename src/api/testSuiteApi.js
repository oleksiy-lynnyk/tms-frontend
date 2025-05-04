import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/suites';

export const getAllSuites = () => axios.get(BASE_URL);
export const createSuite = (suite) => axios.post(BASE_URL, suite);
export const updateSuite = (id, suite) => axios.put(`${BASE_URL}/${id}`, suite);
export const deleteSuite = (id) => axios.delete(`${BASE_URL}/${id}`);
export const addTestCaseToSuite = (suiteId, caseId) => axios.post(`${BASE_URL}/${suiteId}/add-case/${caseId}`);
export const removeTestCaseFromSuite = (suiteId, testCaseId) =>
    axios.delete(`http://localhost:8080/api/suites/${suiteId}/testcases/${testCaseId}`);
