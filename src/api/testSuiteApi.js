import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/testsuites';

/**
 * Отримати дерево Test Suites (корені + вкладені).
 */
export const getSuitesTree = () =>
    axios.get(BASE_URL);

/**
 * Отримати плоский список усіх Test Suites.
 */
export const getSuitesFlat = () =>
    axios.get(`${BASE_URL}/flat`);

/**
 * Отримати один Test Suite за ID.
 */
export const getSuiteById = (id) =>
    axios.get(`${BASE_URL}/${id}`);

/**
 * Створити новий Test Suite.
 */
export const createSuite = (suite) =>
    axios.post(BASE_URL, suite);

/**
 * Оновити існуючий Test Suite.
 */
export const updateSuite = (id, suite) =>
    axios.put(`${BASE_URL}/${id}`, suite);

/**
 * Видалити Test Suite.
 */
export const deleteSuite = (id) =>
    axios.delete(`${BASE_URL}/${id}`);
