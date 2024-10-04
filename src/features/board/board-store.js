import { create } from "zustand";

export const useBoardStore = create((set) => (
{
    draggingTask: null,
    setDraggingTask: (task) => set({ draggingTask: task }),
}));
