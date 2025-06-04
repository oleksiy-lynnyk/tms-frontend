import { useState, useEffect } from 'react';
import { fetchSuitesTree, createSuite, updateSuite, deleteSuite } from '../api/testSuiteApi';
import type { TestSuiteDTO } from '../types';

export default function useTestSuites(projectId: string) {
  const [tree, setTree] = useState<TestSuiteDTO[]>([]);
  const [selectedSuite, setSelectedSuite] = useState<TestSuiteDTO | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadTree().catch(console.error);
  }, [projectId]);

  const loadTree = async () => {
    try {
      const data = await fetchSuitesTree(projectId);
      setTree(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const saveSuite = async (dto: Partial<TestSuiteDTO>) => {
    try {
      if (dto.id) {
        await createSuite(dto as Omit<TestSuiteDTO, 'id'>);
      } else {
        await createSuite(dto as Omit<TestSuiteDTO, 'id'>);
      }
      await loadTree();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const removeSuite = async (id: string) => {
    try {
      await deleteSuite(id);
      await loadTree();
      if (selectedSuite?.id === id) {
        setSelectedSuite(null);
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    suites: tree,
    selectedSuite,
    setSelectedSuite,
    expandedIds,
    toggleExpand,
    saveSuite,
    removeSuite,
    loadTree
  };
}
