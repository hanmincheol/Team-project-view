import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => ({ name: 'login', params: { tab: 'profile' } }),
      meta: { requiresAuth: true }, // 이 라우트는 로그인이 필요함을 나타냅니다.
    },
    {
      path: '/main',
      redirect: () => ({ name: 'main', params: { tab: 'profile' } }),
      component: 'main',
      beforeEnter: async (to, from, next) => {
        if (store.state.loginStore.isLogin) {
          console.log('로그인 된 상태')
          next()
        } else {
          console.log('로그인 안 된 상태')
          try {
            const response = await axios.get('http://localhost:4000/isSocialLogin')

            console.log(response.data)
            if (response.data) {
              console.log('들어오지????')
              await store.dispatch('saveToken', response.data)
              next()
            } else {
              console.log('토큰이 유효하지 않거나 없습니다.')
              next({ name: 'login' })
            }
          } catch (error) {
            console.log(error)
            next({ name: 'login' })
          }
        }
      },
    },

    {
      path: '/pages/user-profile',
      redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
    },
    ...setupLayouts(routes),
  ],
})

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}')
  const userRole = (userData && userData.role) ? userData.role : null

  // 로그인이 필요한 페이지에 접근하려고 하고, 사용자가 로그인하지 않았을 경우
  if (to.matched.some(record => record.meta.requiresAuth) && !userRole) {
    // 로그인 페이지로 리다이렉트
    next({ name: 'login' })
  } else {
    // 그 외의 경우는 원래의 라우트로 진행
    next()
  }
})



// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
// router.beforeEach(to => {
//   const isLoggedIn = isUserLoggedIn()
//   if (canNavigate(to)) {
//     if (to.meta.redirectIfLoggedIn && isLoggedIn)
//       return '/'
//   }
//   else {
//     if (isLoggedIn)
//       return { name: 'not-authorized' }
//     else
//       return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } }
//   }
// })

export default router
