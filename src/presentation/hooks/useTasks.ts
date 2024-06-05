import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../data/state/store';
import { addTask } from '../../data/state/taskSlice';

export const useTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const addNewTask = (description: string) => {
    dispatch(addTask(description));
  };

  return { tasks, addNewTask };
};
