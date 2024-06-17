const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios';
import { AxiosError } from 'axios';
import { errorService } from '../errors/errors'
import store  from '../../../store';

export const chatsService = {
  getChatsById: async (usersIds: Array<string>, currentId: string) => {
		const token = store.state.user?.token;
    try {
			const response = await axios.post(`${apiUrl}/chats/getChats`, { usersIds, currentId }, 
				{
					headers: {
						Authorization: `Bearer ${token}`,
						}
				}
			);
			if (response.status === 201) {
				// const message = response.data.msg || 'Registro exitoso';
				// toastCall(message, 'success')
			}
			return response.data;
		} catch (error) {
			const axiosError = error as AxiosError;
			await errorService.error(axiosError);
			console.error('Error:', error);
			throw error;
		}
  },
	getChatInit: async (usersIds: Array<string>, currentId: string) => {
		const token = store.state.user?.token;
    try {
			const response = await axios.post(`${apiUrl}/chats/getChatsInit`, { usersIds, currentId }, 
				{
					headers: {
						Authorization: `Bearer ${token}`,
					}
				}
			);
			if (response.status === 201) {
				// const message = response.data.msg || 'Registro exitoso';
				// toastCall(message, 'success')
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