// src/hooks/useTestCases.js
import { useState, useEffect } from 'react';
import { getPaginatedCases } from '../api/testCaseApi';

export default function useTestCases(suiteId, pageSize = 25) {
  const [testCases, setTestCases] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortDir, setSortDir] = useState('desc');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState(search);
  
  // debounce пошуку
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  
  // завантаження даних
  useEffect(() => {
    if (!suiteId) {
      setTestCases([]);
      return;
    }
    
    const fetchCases = async () => {
      try {
        const res = await getPaginatedCases(
          suiteId,
          page,
          pageSize,
          sortField,
          sortDir,
          debounced
        );
        setTestCases(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (e) {
        console.error('Fetch failed:', e);
      }
    };
    
    fetchCases();
  }, [suiteId, page, pageSize, sortField, sortDir, debounced]);
  
  const handleSort = field => {
    if (field === sortField) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(0);
  };
  
  return {
    testCases,
    totalPages,
    page,
    setPage,
    sortField,
    sortDir,
    search,
    setSearch,
    handleSort
  };
}