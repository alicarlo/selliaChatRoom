const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios';
import { AxiosError } from 'axios';
import { IAuth } from '../../interfaces/IAuth';
import { errorService, toastCall } from '../errors/errors'

export const authService = {
  authentication: async (data: IAuth) => {
    try {
			const response = await axios.post(`${apiUrl}/auth`, data);
			if (response.data.status === 200) {
				const message = response.data.msg || 'Inicio exitoso';
				toastCall(message, 'success')
				return response.data;
			}
			return null
		} catch (error) {
			const axiosError = error as AxiosError;
			await errorService.error(axiosError);
			console.error('Error:', error);
			throw error;
		}
  }
};