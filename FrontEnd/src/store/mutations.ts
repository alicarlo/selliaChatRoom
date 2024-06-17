import { MutationTree } from 'vuex';
import { UserState, IUser } from '../components/interfaces/IAuth';

export const mutations: MutationTree<UserState> = {
	setUser(state: UserState, user: IUser) {
    state.user = user;
		localStorage.setItem('user', JSON.stringify(user));
  },
  clearUser(state) {
    state.user = null;
		/*= {
      id: '',
			firstName: '',
			lastName: '',
			nickName: '',
			email: '',
			token: ''
    };*/
		localStorage.removeItem('user');
	}
};
