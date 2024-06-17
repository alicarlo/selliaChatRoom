import { AxiosError } from 'axios';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import store  from '../../../store';
import { socket } from '../../services/socketMessage/socketMessage';
import router from '../../../router';

export const errorService = {
  error: async (error: AxiosError) => {
    return new Promise((resolve, reject) => {
			if (error.response?.request?.status === 409) {
				const errorMessage = (error.response.data as { message: string }).message;
				toastCall(errorMessage,'warning');
			}

			if (error.response?.request?.status === 401) {
				setTimeout(() =>{
					toastCall('Su sesion expiro','warning');
				},200)
				
				socket.disconnect();
				store.commit('clearUser');
				router.push('/login');
				reject;
			}
			resolve(true)
		});
  }
};

export const toastCall =  (message: string, typeText: string | any) => {
	toast(message, {
		autoClose: 2500,
		theme: "colored",
		type: typeText,
	});
}
