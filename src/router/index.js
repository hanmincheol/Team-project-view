import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

export const isfriendscreenchanged = ref(false)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      redirect: to => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}') //userData 키로 저장된 값이 null이면 빈 객체 {}로 반환
        const userRole = (userData && userData.role) ? userData.role : null
        if (userRole === 'admin')
          return { name: 'dashboards-crm' }
        if (userRole === 'client')
          return { name: 'access-control' }
        
        return { name: 'login', query: to.query }
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
  console.log(`화면 이동 감지: ${from.fullPath}에서 ${to.fullPath}로 이동`)

  ///community/user/friend
  if (from.fullPath=='/community/user/friend') {
    isfriendscreenchanged.value = true
    console.log('화면 변경됨')
  }
  
  next()
})

export default router
