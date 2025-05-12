// src/hooks/useTestCaseModals.js
import { useState } from 'react';
import { deleteTestCase } from '../api/testCaseApi';

export default function useTestCaseModals() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  
  const openEdit = (testCase) => {
    setSelectedCase(testCase);
    setShowEdit(true);
  };
  
  const openAdd = () => {
    setShowAdd(true);
  };
  
  const openDelete = (testCase) => {
    setSelectedCase(testCase);
    setShowDelete(true);
  };
  
  const closeAll = () => {
    setShowEdit(false);
    setShowAdd(false);
    setShowDelete(false);
    setSelectedCase(null);
  };
  
  const confirmDelete = async (onSuccess) => {
    if (!selectedCase) return;
    
    try {
      await deleteTestCase(selectedCase.id);
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