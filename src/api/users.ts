import { UsersResponse } from './types';

export const fetchUsers = async (): Promise<UsersResponse> => {
  const response = await fetch('https://dummyjson.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};