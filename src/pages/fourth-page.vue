<script setup>
import UserProfile from '@/layouts/components/UserProfile.vue'

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

const iconss = [
  {
    icon: 'mdi-contactless-payment-circle-outline',
    title: '오늘의 스케쥴',
  },
]

userListStore.fetchUser(Number(route.params.id)).then(response => {
  userData.value = response.data
})
</script>

<template>
  <section>
    <VRow class="fill-height">
      <VCol
        cols="12"
        md="5"
        lg="4"
      >
        <UserProfile />
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
  @use "@core/scss/template/libs/apex-chart.scss";
</style>
