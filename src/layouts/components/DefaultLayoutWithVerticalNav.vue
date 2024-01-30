<script setup>
import navItems from '@/navigation/vertical'
import { useThemeConfig } from '@core/composable/useThemeConfig'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue'
import NavbarShortcuts from '@/layouts/components/NavbarShortcuts.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
const { width: windowWidth } = useWindowSize()

// 챗봇
let chatbotOpen = ref(false)

const toggleChatbot = () => {
  console.log('클릭이벤트')
  chatbotOpen = !chatbotOpen
  console.log(chatbotOpen)
}

// 드래그 상태
let dragging = false
let offset = { x: 0, y: 0 }



// 드래그 핸들러
const startDrag = event => {
  dragging = true
  offset = { x: event.clientX - event.currentTarget.offsetLeft + 50, y: event.clientY - event.currentTarget.offsetTop + 50 }
}

const doDrag = event => {
  if (!dragging) return
  event.currentTarget.style.left = `${event.clientX - offset.x}px`
  event.currentTarget.style.top = `${event.clientY - offset.y}px`

}

const stopDrag = () => {
  dragging = false
}
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          v-if="isLessThanOverlayNavBreakpoint(windowWidth)"
          id="vertical-nav-toggle-btn"
          class="ms-n3"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="mdi-menu" />
        </IconBtn>

        <VSpacer />
        
        <NavBarNotifications class="me-2" />
        <NavbarShortcuts />
        <NavbarThemeSwitcher />
        
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition
        :name="appRouteTransition"
        mode="out-in"
      >
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 챗봇 -->
    <template #iconBtn>
      <div
        class="icon-button" 
        style=" background-color: #f6f6f6; box-shadow: 0 2px 5px rgba(0, 0, 0, 30%);"  
        
        @mousemove="doDrag" 
        @mouseup="stopDrag"
      >
        <VBadge
          style="position: absolute;"
          icon="mdi-arrow-all"
          color="success"
          offset-x="40"
          offset-y="-5"
          @mousedown="startDrag"
        >
          <Chatbot />
        </VBadge>
      </div>
    </template>
    
    <!-- 👉 Customizer -->
    <TheCustomizer />
  </VerticalNavLayout>
</template>
