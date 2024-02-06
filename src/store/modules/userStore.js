
const userStore = {
  state: {
    userInfo: null, // 사용자 정보를 저장하는 상태
    searchuser: { userInfo: null }, // searchuser를 저장하는 상태
    
  },
  mutations: {
    // 사용자 정보를 업데이트하는 뮤테이션
    UPDATE_USER_INFO(state, newUserInfo) {
      state.userInfo = newUserInfo

    },

    // searchuser를 업데이트하는 뮤테이션
    UPDATE_SEARCH_USER(state, newSearchUser) {
      state.searchuser = newSearchUser
      
    },
    
  },
  actions: {
    // 사용자 정보를 업데이트하는 액션
    updateUserInfo({ commit, state }, newUserInfo) {  // state를 인자로 추가
      commit('UPDATE_USER_INFO', newUserInfo)
      console.log("newUserInfo", newUserInfo)
      console.log("userInfo", state.userInfo)  // 'userInfo'를 'state.userInfo'로 수정
      

    },

    // searchuser를 업데이트하는 액션
    UPDATE_SEARCH_USER(state, newSearchUser) {
      state.searchuser.userInfo = newSearchUser.userInfo
      console.log("newSearchUser", newSearchUser)
      console.log("searchuser", state.searchuser)
    },
  },
  getters: {
    // 사용자 정보를 가져오는 게터
    userInfo: (state, getters, rootState) => {
      return rootState.loginStore.userInfo
    },
  
    // searchuser를 가져오는 게터
    searchuser: state => {
      return state.searchuser
    },
  },
}



export default userStore
