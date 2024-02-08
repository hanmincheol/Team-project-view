<script setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()

const login =()=> {
  router.push('/login')
}

const profilePath = computed(() => {
  const userInfo = store.getters['userStore/userInfo']
  
  return userInfo && userInfo.profilePath ? userInfo.profilePath : null
})


const store = useStore()

const userInfo = computed(() => store.state.userStore.userInfo)


const isLoggedIn = computed(() => store.state.loginStore.isLogin)

const username = computed(() => {
  const userInfo = store.state.userStore.userInfo
  
  return userInfo ? userInfo.name : "로그인 필요"
})

const userId = computed(() => {
  const userInfo = store.state.userStore.userInfo
  
  return userInfo ? userInfo.id : "로그인 필요"
})

watch(userInfo, (newVal, oldVal) => {
  // 'newVal'은 'userInfo'의 새로운 값이고, 'oldVal'은 이전 값입니다.
  // 이 콜백 함수는 'userInfo'의 값이 변경될 때마다 실행됩니다.

  if (newVal && oldVal && newVal.pro_filepath !== oldVal.pro_filepath) {
    // 'userInfo.pro_filepath'가 변경되었을 때만 로직을 실행합니다.
    console.log('프로필 이미지가 변경되었습니다:', newVal.pro_filepath)
  }
}, { immediate: false })

console.log(userInfo.value)

const logout = async () => {
  try {
    
    console.log("이게 실행 안되는거지?")
    localStorage.removeItem('User-Token')
    await store.dispatch('logout')
  } catch (error) {
    console.log('')
    console.error(error)
  }
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="userInfo.pro_filepath" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="userInfo.pro_filepath" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-medium">
              {{ username }}
            </VListItemTitle>
            <VListItemSubtitle>{{ userId }}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-account-outline"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-cog-outline"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-currency-usd"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-help-circle-outline"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem
            v-if="isLoggedIn"
            @click.prevent="logout"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout"
                size="22"
              />
            </template>

            <VListItemTitle>로그아웃</VListItemTitle>
          </VListItem>

          <!-- 👉 Login -->
          <VListItem
            v-else
            @click.prevent="login"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-login"
                size="22"
              />
            </template>

            <VListItemTitle>로그인</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
