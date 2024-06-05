import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../domain/entities';

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask = {
        id: state.tasks.length + 1,
        description: action.payload,
      };
      state.tasks.push(newTask);
    },
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
