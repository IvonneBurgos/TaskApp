import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskScreen from '../../../src/presentation/screens/TaskScreen';
import { Provider } from 'react-redux';
import { store } from '../../../src/data/state/store';


describe('TaskScreen component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Provider store={store}><TaskScreen /></Provider>);
    
    expect(getByText('Add New Task')).toBeTruthy()
  });

  it('adds a new task when Add Task button is pressed', async () => {
    const { getByText, getByPlaceholderText } = render(<Provider store={store}><TaskScreen /></Provider>);
    const taskDescription = 'Task 1';
    
    fireEvent.press(getByText('Add New Task'));
    await waitFor(() => getByText('Add Task')); 
    fireEvent.changeText(getByPlaceholderText('Enter task description'), taskDescription);
    fireEvent.press(getByText('Add Task'));

    await waitFor(() => {
        expect(getByText(taskDescription)).toBeDefined()
    });  
  });
});
