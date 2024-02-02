

// store/modules/loginStore.js
//import router from '@/router'

import axiosIns from '@/plugins/axios'
import axios from '@axios'

const loginStore = {
  state: {
    userInfo: null,
    isLogin: false,
  },
  getters: {
    isLoggedIn: state => state.isLogin,
  },
  mutations: { // 로그인 상태를 변경해주는 코드
    loginSuccess: function (state, payload) {
      state.userInfo = payload
      state.isLogin = true
      window.location.href="/main"

    },
    logoutTest: function (state) {
      state.userInfo = null
      state.isLogin = false
      localStorage.removeItem('User-Token')
      localStorage.removeItem('vuex')

      window.location.href="http://localhost:4000/logout"
    },
  },
  actions: {
    login(context, loginObj) {
      const formdata = new FormData()
      
      formdata.append("id", loginObj['id'])
      formdata.append("pwd", loginObj['pwd'])
    
      axios.post('http://localhost:4000/login', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }) 
        .then(res => {
          console.log(res)
        
          if(res.status === 200) { // 로그인 요청이 성공했을 때만 토큰을 가져오는 요청을 실행
            return context.dispatch('getToken')
          } else {
            throw new Error('Login failed')
          }
        })
        .then(getTokenResponse => {
          const token = getTokenResponse.data
    
          console.log(token)
          context.dispatch('saveToken', token)
        })
        .catch(error => {
          console.log(error)
          alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
        })
    },
    saveToken(context, token){
      console.log('여기 와지니??')
      localStorage.setItem('access_token', token) // 토큰을 저장함
      context.dispatch('getMemberInfo').catch(error => {
        console.log('회원 정보를 가져오는 데 실패했습니다:', error)
      })
    },
    getToken() {
      return axios.post('http://localhost:4000/user/getToken', null, {
        withCredentials: true,
      })
      
    },
    getMemberInfo( { commit } ){
      axios.get('http://localhost:4000/user/getMemberInfo', { withCredentials: true })
        .then( res => {
          console.log("이게 실행돼?")

          const userInfo = {
            name: res.data.name,
            id: res.data.id,
          }

          commit('loginSuccess', userInfo)

        })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axiosIns.post('http://localhost:4000/logout', null, { withCredentials: true })
          .then(res => {
            commit('logoutTest') // 로그아웃 상태를 Vuex에 반영
            localStorage.removeItem('access_token') // 로컬 스토리지에서 토큰 제거
    
            // 서버에서 받은 redirectUrl을 이용해 페이지를 리다이렉트
            window.location.href = res.data.redirectUrl
    
            resolve()
          })
          .catch(error => {
            console.log('로그아웃 요청 중 에러가 발생했습니다:', error)
            reject(error)
          })
      })
    },

  },

}

export default loginStore
