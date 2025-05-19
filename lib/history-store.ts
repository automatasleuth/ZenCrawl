import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ExtractionHistory {
  id: string
  type: 'single' | 'crawl' | 'map' | 'search'
  url: string
  timestamp: number
  status: 'completed' | 'failed'
  result?: any
  error?: string
}

interface HistoryState {
  history: ExtractionHistory[]
  addToHistory: (extraction: Omit<ExtractionHistory, 'id' | 'timestamp'>) => void
  clearHistory: () => void
  removeFromHistory: (id: string) => void
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (extraction) =>
        set((state) => ({
          history: [
            {
              ...extraction,
              id: Math.random().toString(36).substring(7),
              timestamp: Date.now(),
            },
            ...state.history,
          ].slice(0, 50), // Keep last 50 extractions
        })),
      clearHistory: () => set({ history: [] }),
      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'extraction-history',
    }
  )
) 