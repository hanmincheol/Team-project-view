<script setup>
import axios from '@axios'
import { useRoute } from 'vue-router'

const router = useRoute()
const connectionData = ref([])

const rating = ref(3)

const ratingColors = [
  'warning',
]

//axios로 가짜 데이터 가져오기
const fetchProjectData = () => {
  if (router.params.tab === 'mate') {
    axios.get('/pages/profile', { params: { tab: 'connections' } }).then(response => {
      connectionData.value = response.data
    })
  }
}

//watch 함수를 사용하여 router 객체를 감시하고, 변경이 있을 때마다 fetchProjectData 함수를 실행합니다. 
//immediate: true 옵션을 사용하여 초기 로드 시에도 함수를 실행합니다.
watch(router, fetchProjectData, { immediate: true })

const moreBtnList = [
  {
    title: 'Share connection',
    value: 'Share connection',
  },
  {
    title: 'Block connection',
    value: 'Block connection',
  },
  {
    type: 'divider',
    class: 'my-2',
  },
  {
    title: '삭제',
    value: 'Delete',
    class: 'text-error',
  },
]
</script>

<template>
  <VCardText>
    <h5
      class="text-h5"
      style="font-weight: bold;"
    >
      메이트 목록
    </h5>
  </VCardText>
  <VRow>
    <VCol
      v-for="data in connectionData"
      :key="data.name"
      sm="6"
      lg="4"
      cols="12"
    >
      <VCard>
        <div class="vertical-more">
          <MoreBtn
            item-props
            :menu-list="moreBtnList"
          />
        </div>

        <VCardItem>
          <VCardTitle class="d-flex flex-column align-center justify-center">
            <VAvatar
              size="100"
              :image="data.avatar"
              class="mt-3"
            />

            <p class="mt-6 mb-0">
              {{ data.name }}
            </p>
            <span class="text-body-1">{{ data.designation }}</span>

            <div class="d-flex align-center flex-wrap gap-2 mt-6">
              <div class="d-flex flex-column">
                <VRating
                  v-for="color in ratingColors"
                  :key="color"
                  v-model="rating"
                  :color="color"
                />
              </div>
            </div>
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <div class="d-flex justify-space-around mt-1">
            <div class="text-center">
              <h6 class="text-h6">
                {{ data.projects }}
              </h6>
              <span class="text-body-1">친구</span>
            </div>
            <div class="text-center">
              <h6 class="text-h6">
                {{ data.tasks }}
              </h6>
              <span class="text-body-1">메이트</span>
            </div>
            <div class="text-center">
              <h6 class="text-h6">
                {{ data.connections }}
              </h6>
              <span class="text-body-1">구독자</span>
            </div>
          </div>

          <div class="d-flex justify-center gap-4 mt-6">
            <VBtn
              :prepend-icon="data.isConnected ? 'mdi-account-check-outline' : 'mdi-account-plus-outline'"
              :variant="data.isConnected ? 'elevated' : 'tonal'"
            >
              {{ data.isConnected ? '친구취소' : '친구신청' }}
            </VBtn>

            <VBtn
              :prepend-icon="data.isConnected ? 'mdi-account-check-outline' : 'mdi-account-plus-outline'"
              :variant="data.isConnected ? 'elevated' : 'tonal'"
            >
              {{ data.isConnected ? '구독취소' : '구독신청' }}
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.vertical-more {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 0.5rem;
}
</style>
