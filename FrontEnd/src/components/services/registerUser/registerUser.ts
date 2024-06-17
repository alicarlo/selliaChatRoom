const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios';
import { AxiosError } from 'axios';
import { IRegisterUser } from '../../interfaces/IRegisterUser';
import { errorService, toastCall } from '../errors/errors'

export const registerUserService = {
  registerUser: async (data: IRegisterUser) => {
    try {
			const response = await axios.post(`${apiUrl}/user`, data);
			if (response.status === 201) {
				const message = response.data.msg || 'Registro exitoso';
				toastCall(message, 'success')
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