const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios';
import { AxiosError } from 'axios';
import { errorService, toastCall } from '../errors/errors'
import store  from '../../../store';

export const getAllMessagesService = {
  getMessages: async (chatId: string) => {
		const token = store.state.user?.token;
    try {
			const response = await axios.get(`${apiUrl}/messages`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: { chatId }
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