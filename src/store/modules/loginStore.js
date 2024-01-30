

// store/modules/loginStore.js
//import router from '@/router'

import axios from '@axios'

const loginStore = {
  state: {
    userInfo: null,
    isLogin: false,
  },
  mutations: { // 로그인 상태를 변경해주는 코드
    loginSuccess: function (state, payload) {
      state.userInfo = payload
      state.isLogin = true
      window.location.href="http://localhost:3333/main"
    },
    logoutTest: function (state) {
      state.userInfo = null
      state.isLogin = false
      localStorage.removeItem('User-Token')
      localStorage.removeItem('vuex')
      window.location.href="http://localhost:3333/login"
    },
  },
  actions: {
    login(dispatch, loginObj) {
      const formdata = new FormData()

      formdata.append("id", loginObj['id'])
      formdata.append("pwd", loginObj['pwd'])

      axios.post('http://localhost:4000/login', formdata) // 로그인 URL로 ID, PW를 보냄
        .then(res => {
          console.log(res)
          
          return this.dispatch('getToken')
        })
        .catch(error => {
          console.log(error)
          alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')

          // 이동하지 않고 로그인 페이지에 머무르게 하려면 아래 코드를 주석 처리합니다.
          // this.dispatch('getToken')
        })
        .then(getTokenResponse => {
          const token = getTokenResponse.data

          this.dispatch('saveToken', token)
        })
        .catch(error => console.log(error))
    },
    saveToken({ dispatch }, token){
      console.log('여기 와지니??')
      localStorage.setItem('access_token', token) // 토큰을 저장함
      dispatch('getMemberInfo')
    },
    getToken() {
      return axios.post('http://localhost:4000/user/getToken')
    },
    getMemberInfo( { commit } ){
      axios.get('http://localhost:4000/user/getMemberInfo')
        .then( res => {
          const userInfo = {
            name: res.data.name,
            profileimage: res.data.profileimage,
          }

          commit('loginSuccess', userInfo)
        })
    },
    logout( { commit } ){
      axios.get('http://localhost:4000/logout')
        .then( res => {
          console.log(res)
          commit('logoutTest')
        } )
    },

  },

}

export default loginStore
