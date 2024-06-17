import { GetterTree } from 'vuex';
import { UserState, RootState, IUser } from '../components/interfaces/IAuth';

export const getters: GetterTree<UserState, RootState> = {
  user(state): IUser | null {
    return state.user;
  }
};