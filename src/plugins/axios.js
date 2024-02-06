import router from '@/router'

import axios from 'axios'

const axiosIns = axios.create({
// You can add your headers here
// ================================
// baseURL: 'https://some-domain.com/api/',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
})



// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken')

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : ''
  }

  // Return modified config
  return config
})



// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  // 서버에서 message와 redirectUrl을 보낼 경우 이를 처리
  if (response.data.message && response.data.redirectUrl) {
    alert(response.data.message)
    router.push(response.data.redirectUrl)
    
    return response
  }
  
  return response
}, error => {
  // Handle error
  if (error.response.status === 401 && !error.config.headers['X-SKIP-INTERCEPTOR'] ) {
    // If 401 response returned from api
    // Remove "userData" from localStorage
    localStorage.removeItem('userData')

    // Remove "accessToken" from localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userAbilities')
    
    alert(" 로그인 후 이용가능합니다")
    router.push('/login')
  } else if (error.response.status === 403) {
    // If 403 response returned from api
    alert("접근 권한이 없습니다.")
    router.push('/main') // or redirect to any other page as per your requirement
  } else {
    return Promise.reject(error)
  }
})

export default axiosIns
