import { ActionTree } from 'vuex';
import { UserState } from '../components/interfaces/IAuth';

export const actions: ActionTree<UserState, UserState> = {
  async setUser({ commit }, user: UserState) {
    commit('setUser', user);
  },
  async clearUser({ commit }) {
    commit('clearUser');
  },
	async checkUserSession({ commit }) {
    const user = localStorage.getItem('user');
    if (user) {
      commit('setUser', JSON.parse(user));
    } else {
      commit('clearUser');
    }
  }
};