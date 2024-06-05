import { renderHook, act } from '@testing-library/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import { useTasks } from '../../../src/presentation/hooks/useTasks';
import { RootState } from '../../../src/data/state/store';
import { addTask } from '../../../src/data/state/taskSlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const initialState = {
  tasks: {
    tasks: [],
  },
};

const mockDispatch = jest.fn();

beforeEach(() => {
  (useSelector as unknown as jest.Mock).mockImplementation((selector: (state: RootState) => any) =>
    selector(initialState as RootState)
  );
  (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
});

describe('useTasks', () => {
  it('should return tasks and addNewTask function', () => {
    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toEqual([]);
    expect(typeof result.current.addNewTask).toBe('function');
  });

  it('should dispatch addTask action when addNewTask is called', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addNewTask('Test task');
    });

    expect(mockDispatch).toHaveBeenCalledWith(addTask('Test task'));
  });
});
