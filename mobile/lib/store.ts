import { create } from 'zustand';

interface DFA {
  id: string;
  name: string;
  states: string[];
  alphabet: string[];
  initialState: string;
  acceptStates: string[];
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface Store {
  automata: DFA[];
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Automata operations
  addAutomata: (dfa: DFA) => void;
  removeAutomata: (id: string) => void;
  clearAutomata: () => void;
  updateAutomata: (id: string, dfa: Partial<DFA>) => void;

  // User operations
  setUser: (user: User | null) => void;

  // State operations
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<Store>((set) => ({
  automata: [],
  user: null,
  isLoading: false,
  error: null,

  addAutomata: (dfa: DFA) =>
    set((state) => ({
      automata: [...state.automata, dfa],
    })),

  removeAutomata: (id: string) =>
    set((state) => ({
      automata: state.automata.filter((a) => a.id !== id),
    })),

  clearAutomata: () =>
    set(() => ({
      automata: [],
    })),

  updateAutomata: (id: string, updates: Partial<DFA>) =>
    set((state) => ({
      automata: state.automata.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),

  setUser: (user: User | null) =>
    set(() => ({
      user,
    })),

  setLoading: (loading: boolean) =>
    set(() => ({
      isLoading: loading,
    })),

  setError: (error: string | null) =>
    set(() => ({
      error,
    })),
}));
