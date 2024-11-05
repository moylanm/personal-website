'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, type AppStore } from '@/lib/dashboard/store'
import type { Excerpt } from '@/app/lib/definitions';
import { initializeState } from '@/lib/dashboard/features/excerpts/excerptsSlice';

export default function StoreProvider({
  excerpts,
  children
}: {
  excerpts: Excerpt[]
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(initializeState(excerpts));
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
