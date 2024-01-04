<script setup>
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import UserBioPanel from '@/views/apps/user/view/UserBioPanel.vue'

const userListStore = useUserListStore()
const route = useRoute()
const userData = 21
const userId = "admin"
const userTab = ref(null)

const tabs = [
  {
    icon: 'mdi-account-outline',
    title: '항목에',
  },
  {
    icon: 'mdi-lock-outline',
    title: '원하는',
  },
  {
    icon: 'mdi-bookmark-outline',
    title: '제목',
  },
  {
    icon: 'mdi-bell-outline',
    title: '정해서',
  },
  {
    icon: 'mdi-link-variant',
    title: '넣기',
  },
]

userListStore.fetchUser(Number(route.params.id)).then(response => {
  userData.value = response.data
})
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserBioPanel :user-data="userId" />
    </VCol>
    <VCol
      cols="12"
      md="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            start
            :icon="tab.icon"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>  
      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          가져올 페이지나 내용 작성
        </VWindowItem>

        <VWindowItem>
          <CrmActivityTimeline />
        </VWindowItem>

        <VWindowItem>
          제목에 맞는
        </VWindowItem>

        <VWindowItem>
          내용 정해서
        </VWindowItem>

        <VWindowItem>
          넣기
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
