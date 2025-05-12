// src/hooks/useTestSuites.js
import { useState, useEffect } from 'react';
import { getSuitesTree, createSuite, updateSuite, deleteSuite } from '../api/testSuiteApi';

export default function useTestSuites() {
  const [tree, setTree] = useState([]);
  const [selectedSuite, setSelectedSuite] = useState(null);
  const [expandedIds, setExpandedIds] = useState(new Set());
  
  useEffect(() => {
    loadTree();
  }, []);
  
  const loadTree = async () => {
    try {
      const res = await getSuitesTree();
      setTree(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  
  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  
  const saveSuite = async (dto) => {
    try {
      if (dto.id) {
        await updateSuite(dto.id, dto);
      } else {
        await createSuite(dto);
      }
      await loadTree();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  
  const removeSuite = async (id) => {
    try {
      await deleteSuite(id);
      await loadTree();
      
      // Reset selected suite if it was deleted
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