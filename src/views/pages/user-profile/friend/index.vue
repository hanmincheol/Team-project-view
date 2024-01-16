<script setup>
import axios from '@axios'
import { useRoute } from 'vue-router'

const router = useRoute()
const connectionData = ref([])

//axios로 가짜 데이터 가져오기
const fetchProjectData = () => {
  if (router.params.tab === 'friend') {
    axios.get('/pages/profile', { params: { tab: 'connections' } }).then(response => {
      connectionData.value = response.data
    })
  }
}


//watch 함수를 사용하여 router 객체를 감시하고, 변경이 있을 때마다 fetchProjectData 함수를 실행합니다. 
//immediate: true 옵션을 사용하여 초기 로드 시에도 함수를 실행합니다.
watch(router, fetchProjectData, { immediate: true })

//햄버거를 누를 때 버튼 목록을 표시.
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
      친구 목록
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
            <!-- 이름 부분 -->
            <p class="mt-6 mb-0">
              {{ data.name }}
            </p>
            <!-- 이름 부분 -->
            <!-- 직업 부분 -->
            <span class="text-body-1">{{ data.designation }}</span>
            <!-- 직업 부분 -->

            <div class="d-flex align-center flex-wrap gap-2 mt-6">
              <!-- 주 전문분야 부분 -->
              <VChip
                v-for="chip in data.chips"
                :key="chip.title"
                :color="chip.color"
                density="compact"
              >
                <span class="text-xs">
                  {{ chip.title }}
                </span>
              </VChip>
              <!-- 주 전문분야 부분 -->
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
              {{ data.isConnected ? '메이트취소' : '메이트신청' }}
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
