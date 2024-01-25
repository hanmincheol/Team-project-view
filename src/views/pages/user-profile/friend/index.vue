<script setup>
import axios from '@axios'
import { useRoute } from 'vue-router'

const router = useRoute()
const connectionData = ref([])
const isFriendExist = ref(false)

//axios로 가짜 데이터 가져오기
const fetchProjectData = () => {
  if (router.params.tab === 'friend') {
    axios.get("http://127.0.0.1:4000/comm/friend", { params: { id: 'HMC' } })
      .then(response=>{
        console.log(response.data)
        connectionData.value = response.data
        if(Object.keys(connectionData.value).length == 0) isFriendExist.value = true
      })
      .catch(error=>{console.error(error)})
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
  <VAlert
    v-show="isFriendExist"
    density="default"
    color="secondary"
    variant="tonal"
    :style="{'margin-bottom':'200px'}"
  >
    친구 목록이 없습니다
  </VAlert>
  <VRow>
    <VCol
      v-for="data in connectionData"
      :key="data.friend_id"
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
              :image="data.profilePath"
              class="mt-3"
            />
            <!-- 이름 부분 -->
            <p class="mt-6 mb-0">
              {{ data.friend_id }}
            </p>
            <!-- 이름 부분 -->
            <!-- 직업 부분 -->
            <span class="text-body-1">{{ data.name }}</span>
            <!-- 직업 부분 -->
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <div class="d-flex justify-space-around mt-1">
            <div class="text-center">
              <h6 class="text-h6">
                {{ data.fnum }}
              </h6>
              <span class="text-body-1">친구</span>
            </div>
            <div class="text-center">
              <h6 class="text-h6">
                {{ data.mnum }}
              </h6>
              <span class="text-body-1">메이트</span>
            </div>
            <div class="text-center">
              <h6 class="text-h6">
                {{ data.snum }}
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
