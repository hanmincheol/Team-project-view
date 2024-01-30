import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import loginStore from './modules/loginStore'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {

    setToken: function (state, token) {
      state.token = token
    },
  },
  actions: {
  },
  modules: {
    loginStore,
  },
  plugins: [
    createPersistedState({
      path: ['loginStore'], 
    }),
  ],
})
