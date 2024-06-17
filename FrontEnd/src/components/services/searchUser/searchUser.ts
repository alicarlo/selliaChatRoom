const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios';
import { AxiosError } from 'axios';
import { errorService, toastCall } from '../errors/errors'
import store  from '../../../store';

export const searchUserService = {
  searchUser: async (nickName: string) => {
		const token = store.state.user?.token;
		const id = store.state.user?.id;
    try {
			const response = await axios.get(`${apiUrl}/search-user`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: { nickName, id }
			});

			return response.data;
		} catch (error) {
			const axiosError = error as AxiosError;
			await errorService.error(axiosError);
			console.error('Error:', error);
			throw error;
		}
  }
};