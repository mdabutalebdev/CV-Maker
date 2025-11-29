"use client";

import { create } from "zustand";

interface ProgressState {
  start: boolean;
  triggerStart: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  start: false,
  triggerStart: () => set({ start: true }),
  resetProgress: () => set({ start: false }),
}));
