import {axi} from '@/api/axiosSetup';
import {BASE_URL} from '@/api/config';
import User from '@/types/users/User';

export const getUsers = async (): Promise<User[]> => {
  const response = await axi.get(`${BASE_URL}/api/users/`);

  // Get something from the response's data or headers
  // Store it in ApiService if necessary for later usage

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (response?.data?.data || []) as User[];
};
