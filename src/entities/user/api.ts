import {axi} from '@shared/api';
import {User} from './types';

export const getUsers = async (): Promise<User[]> => {
  const response = await axi.get('/api/users/');

  // Get something from the response's data or headers
  // Store it in ApiService if necessary for later usage

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (response?.data?.data || []) as User[];
};
