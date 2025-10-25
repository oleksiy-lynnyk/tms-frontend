// src/hooks/usePaginatedTestCases.ts
import { useState, useEffect } from 'react'
import { fetchCasesBySuite } from '../entities/testCase/api/testCaseApi'
import type { TestCaseDTO } from '@/entities/testCase/types/testCaseTypes'

export default function usePaginatedTestCases(suiteId: string, pageSize = 25) {
  const [testCases, setTestCases] = useState<TestCaseDTO[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [debounced, setDebounced] = useState(search)

  // скидати сторінку при зміні набору
  useEffect(() => {
    setPage(0)
  }, [suiteId])

  // дебаунс пошуку
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search)
      setPage(0)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // основний ефект: підвантажуємо кейси
  useEffect(() => {
    if (!suiteId) {
      setTestCases([])
      return
    }
    ;(async () => {
      try {
        // правильний порядок: suiteId, page, pageSize, debounced (string)
        const res = await fetchCasesBySuite(
            suiteId,
            page,
            pageSize,
            debounced
        )
        setTestCases(res.content)
        setTotalPages(res.totalPages)
      } catch (e) {
        console.error('Помилка завантаження тест-кейсів:', e)
      }
    })()
  }, [suiteId, page, pageSize, debounced])

  return {
    testCases,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
  }
}
