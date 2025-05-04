import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/testcases';

export const getAllTestCases = () => axios.get(BASE_URL);
export const createTestCase = (testCase) => axios.post(BASE_URL, testCase);
export const deleteTestCase = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateTestCase = (id, testCase) => axios.put(`${BASE_URL}/${id}`, testCase);
