import { useState, useEffect } from 'react';
import { fetchCasesBySuite } from '../api/testCaseApi';
import type { TestCaseDTO } from '../types';

export default function useTestCases(suiteId: string, pageSize = 25) {
  const [testCases, setTestCases] = useState<TestCaseDTO[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState(search);

  // Скидаємо page при зміні suiteId
  useEffect(() => {
    setPage(0);
  }, [suiteId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
      setPage(0); // Ок, бо це тільки при search!
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!suiteId) {
      setTestCases([]);
      return;
    }
    const fetchCases = async () => {
      try {
        const res = await fetchCasesBySuite(
            suiteId,
            debounced,
            page,
            pageSize
        );
        setTestCases(res.content);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error('Fetch failed:', e);
      }
    };
    fetchCases();
  }, [suiteId, page, pageSize, sortField, sortDir, debounced]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
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

