import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

export const isfriendscreenchanged = ref(false)
export const isSubscribesscreenchanged = ref(false)
export const isMatescreenchanged = ref(false)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login.vue'),
      redirect: () => ({ name: 'login', params: { tab: 'profile' } }),
      meta: { requiresAuth: true }, // 이 라우트는 로그인이 필요함을 나타냅니다.
    },
    {
      path: '/',
      redirect: () => ({ name: 'main', params: { tab: 'profile' } }),
      component: 'main',

      beforeEnter: (to, from, next) => {
        if (store.state.loginStore.isLogin) {
          console.log('로그인 된 상태')
          next()
        } else {
          console.log('로그인 안 된 상태')
          next({ name: 'login' }) // 로그인 페이지로 리다이렉트
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

  router.beforeEach((to, from, next) => {
    console.log(`화면 이동 감지: ${from.fullPath}에서 ${to.fullPath}로 이동`)

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
  ///community/user/friend
  if (from.fullPath=='/community/user/friend') {
    isfriendscreenchanged.value = true
    console.log('화면 변경됨')
  }
  if (from.fullPath=='/community/user/subscriber'){
    isSubscribesscreenchanged.value = true
  }
  if (from.fullPath=='/community/user/mate'){
    isMatescreenchanged.value = true
  }
  next()
})

export default router
