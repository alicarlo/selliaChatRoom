const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios';
import { AxiosError } from 'axios';
import { errorService, toastCall } from '../errors/errors'
import store  from '../../../store';

export const contactsService = {
  getContactsById: async (idUser: string | unknown) => {
		const token = store.state.user?.token;
    try {
			const response = await axios.get(`${apiUrl}/contacts`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: { idUser }
			});

			if (!response.data.length) {
				const message = 'Sin contactos';
				toastCall(message, 'warning')
			}

			return response.data;
		} catch (error) {
			const axiosError = error as AxiosError;
			await errorService.error(axiosError);
			console.error('Error:', error);
			throw error;
		}
  }
};