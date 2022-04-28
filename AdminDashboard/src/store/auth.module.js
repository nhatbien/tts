import { login, register, updateUser } from '../controller/Auth';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };
export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
     login({ commit }, user) {
      return login(user).then(
        user => {
          localStorage.setItem('user', JSON.stringify(user));
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    }, 
    update({ commit }, users) {
      return updateUser(users).then(
        user => {
          localStorage.setItem('user', JSON.stringify(users));
          commit('updateSuccess', users);
          return Promise.resolve(users);
        },
        error => {
          commit('updateFailure');
          return Promise.reject(error);
        }
      );
    }, 
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('logout');
    },
    register({ commit }, user) {
      return register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    } 
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    updateSuccess(state, user) {
      state.user = user;
    },
    updateFailure(state) {
      
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};