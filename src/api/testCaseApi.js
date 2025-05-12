// src/api/testCaseApi.js

import axios from 'axios';

/**
 * Повернути всі кейси (без пагінації).
 */
export const getAllTestCases = () =>
    axios.get('/api/testcases');

/**
 * Пагінований запит по suiteId, сортуванню, пошуку.
 * Передаємо окремо sortField та sortDir, а не єдиний “sort”:
 */
export const getPaginatedCases = (
    suiteId,
    page,
    size,
    sortField,
    sortDir,
    search = ''
) =>
    axios.get(`/api/testcases/suite/${suiteId}`, {
        params: {
            page,         // номер сторінки
            size,         // розмір
            sortField,    // поле сортування
            sortDir,      // “asc” або “desc”
            search,       // рядок пошуку
        },
    });

/**
 * Створити новий тест-кейс.
 */
export const createTestCase = (data) =>
    axios.post('/api/testcases', data);

/**
 * Оновити існуючий тест-кейс за його id.
 */
export const updateTestCase = (id, data) =>
    axios.put(`/api/testcases/${id}`, data);

/**
 * Видалити кейс за id.
 */
export const deleteTestCase = (id) =>
    axios.delete(`/api/testcases/${id}`);
