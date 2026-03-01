
import {create} from "zustand";
import { persist } from "zustand/middleware";

type LikelistState = {
    symbols : string[];
    add : (symbol : string) => void;
    remove : (symbol : string) => void;
    toggle : (symbol : string) => void;
    has : (symbol : string) => boolean;
}

export const useLikelist = create<LikelistState>()(
     persist(
    (set, get) => ({
      symbols: [],
      add: (symbol) =>
        set((state) =>
          state.symbols.includes(symbol)
            ? state
            : { symbols: [...state.symbols, symbol] }
        ),
      remove: (symbol) =>
        set((state) => ({
          symbols: state.symbols.filter((s) => s !== symbol),
        })),
      toggle: (symbol) =>
        set((state) =>
          state.symbols.includes(symbol)
            ? { symbols: state.symbols.filter((s) => s !== symbol)} 
            : { symbols: [...state.symbols, symbol] }
        ),
      has: (symbol) => get().symbols.includes(symbol),
    }),
    { name: "watchlist" }
  )
)