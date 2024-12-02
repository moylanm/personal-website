'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, type AppStore } from '@/lib/dashboard/store'
import { fetchAllExcerpts } from '@/lib/dashboard/features/excerpts/excerptSlice'

export function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
    void storeRef.current.dispatch(fetchAllExcerpts());
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
