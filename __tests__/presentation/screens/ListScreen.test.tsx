import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ListScreen from '../../../src/presentation/screens/ListScreen';

jest.mock('../../../src/presentation/hooks/useUsers', () => ({
  __esModule: true,
  default: jest.fn(() => ({ users: [], loading: false })),
}));

describe('ListScreen component', () => {
  it('renders loader when loading is true', () => {
    const loading = true;
    jest.spyOn(require('../../../src/presentation/hooks/useUsers'), 'default').mockImplementationOnce(() => ({ users: [], loading }));

    render(<ListScreen />);
    expect(screen.getByTestId('loader')).toBeTruthy();
  });

  it('renders user list when loading is false', async () => {
    const users = [
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' },
    ];
    jest.spyOn(require('../../../src/presentation/hooks/useUsers'), 'default').mockImplementationOnce(() => ({ users, loading: false }));

    render(<ListScreen />);
    expect(screen.getByTestId('userList')).toBeTruthy();
    users.forEach(user => {
      expect(screen.getByText(user.name)).toBeTruthy();
    });
  });
});
