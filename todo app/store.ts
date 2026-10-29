import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  description: string;
  isDone: boolean;
}

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: [
    { id: "welcome-1", description: "Add a task with the form above", isDone: false },
    { id: "welcome-2", description: "Mark it complete when you're done", isDone: true },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.items.unshift({
        id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
        description: action.payload,
        isDone: false,
      });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) task.isDone = !task.isDone;
    },
    editTask: (state, action: PayloadAction<{ id: string; description: string }>) => {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) task.description = action.payload.description;
    },
  },
});

export const { addTask, toggleTask, editTask } = tasksSlice.actions;
export const store = configureStore({ reducer: { tasks: tasksSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
