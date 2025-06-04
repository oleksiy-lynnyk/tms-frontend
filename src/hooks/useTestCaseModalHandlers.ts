// src/hooks/useTestCaseModals.js
import { useState } from 'react';
import { deleteCase } from '../api/testCaseApi';
import type { TestCaseDTO } from '@/types';

export default function useTestCaseModals() {
  const [selectedCase, setSelectedCase] = useState<TestCaseDTO | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const openEdit = (testCase: TestCaseDTO) => {
    setSelectedCase(testCase);
    setShowEdit(true);
  };

  const openAdd = () => {
    setShowAdd(true);
  };

  const openDelete = (testCase: TestCaseDTO) => {
    setSelectedCase(testCase);
    setShowDelete(true);
  };

  const closeAll = () => {
    setShowEdit(false);
    setShowAdd(false);
    setShowDelete(false);
    setSelectedCase(null);
  };

  const confirmDelete = async (onSuccess?: () => void) => {
    if (!selectedCase) return;

    try {
      await deleteCase(selectedCase.id);
      setShowDelete(false);
      setSelectedCase(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return {
    selectedCase,
    showEdit,
    showAdd,
    showDelete,
    openEdit,
    openAdd,
    openDelete,
    closeAll,
    confirmDelete
  };
}

