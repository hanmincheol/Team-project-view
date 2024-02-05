import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import loginStore from './modules/loginStore'
import userStore from './modules/userStore'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginStore, 
    userStore,  
  },
  plugins: [
    createPersistedState({
      path: ['loginStore', 'userStore' ], 
    }),
  ],
})
