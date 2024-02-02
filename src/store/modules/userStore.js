// import axios from '@axios'

// const userStore = {
//   state: {
//     id: null,
//     userDetail: null,
//   },
//   getters: {
//     getId: state => state.id,
//     getUserDetail: state => state.userDetail,
//   },
//   mutations: {
//     updateId: function (state, payload) { 
//       state.id = payload
//     },
//     updateSuccess: function (state, payload) {
//       state.userDetail = payload
//     },
//   },
//   actions: {
//     async setId(context, id) { 
//       context.commit('updateId', id)
//     },
//     async fetchUserDetail(context) {
//       const searchuser = context.state.id
 
//       console.log('Sending request with ID:', searchuser) 

//       try {
//         const response = await axios.get('http://localhost:4000/user/view', {
//           withCredentials: true,
//           params: {
//             id: searchuser,
//           },
//         })

//         // response를 사용하는 코드를 여기에 추가하세요.
//       } catch (error) {
//         console.log(error) // 에러를 출력하도록 수정
//       }
//     },

//     async updateUserDetail(context, updateObj) {
//       const { id, pwd, name, gender, b_day, tel, userAddress, height, weight, goal_No, authority } = updateObj
//       const payload = { id, pwd, name, gender, b_day, tel, userAddress, height, weight, goal_No, authority }
//       try {
//         const res = await axios.put('http://localhost:4000/user/update', payload, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         })

//         const updatedUserDetail = res.data

//         context.commit('updateSuccess', updatedUserDetail)
//       } catch (error) {
//         console.log(error)
//         alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.')
//       }
//     },

//     // 👉 Fetch users data
//     fetchUsers(params) { return axios.get('/apps/users/list', { params }) },

//     // 👉 Add User
//     addUser(userData) {
//       return new Promise((resolve, reject) => {
//         axios.post('/apps/users/user', {
//           user: userData,
//         }).then(response => resolve(response))
//           .catch(error => reject(error))
//       })
//     },
  
//     // 👉 fetch single user
//     fetchUser(id) {
//       return new Promise((resolve, reject) => {
//         axios.get(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
//       })
//     },
  
//     // 👉 Delete User
//     deleteUser(id) {
//       return new Promise((resolve, reject) => {
//         axios.delete(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
//       })
//     },
//   },
// }





// export default userStore
