<script setup>
import axios from '@axios'
import { useRoute } from 'vue-router'

const router = useRoute()
const subscribeTo = ref([])
const subscribers = ref([])
const isSubToExist = ref(true)
const isMySubExist = ref(true)

const fetchProjectData = () => {
  if (router.params.tab === 'subscriber') {
    axios.get('http://127.0.0.1:4000/comm/subscribe', { params: { id: 'HMC' } }).then(response => {
      subscribeTo.value = response.data['subTo']
      subscribers.value = response.data['MySub']
      console.log(typeof subscribers.value)

      if(Object.keys(subscribeTo.value).length==0) {
        isSubToExist.value = true
        console.log('값이 존재하지 않음')
      }
      else if (Object.keys(subscribeTo.value).length!=0){
        isSubToExist.value = false
      }
      if(Object.keys(subscribers.value).length==0) {
        isMySubExist.value = true
        console.log('값이 존재하지 않음')
      }
      else if (Object.keys(subscribers.value).length!=0) {
        isMySubExist.value = false
      }
      console.log(isSubToExist)
    })
      .catch(()=>{console.log('서버가 꺼져있습니다')})
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
      구독한 목록
    </h5>
    <hr
      :style="{'margin-top':'30px', 'margin-bottom':'10px',
               'background-color' :'#DEDEDE', 'height':'1px', 'border':'0'
      }"
    >
  </VCardText>
  <VAlert
    v-show="isSubToExist"
    density="default"
    color="secondary"
    variant="tonal"
    :style="{'margin-bottom':'200px'}"
  >
    구독한 목록이 없습니다
  </VAlert>
  <VRow>
    <VCol
      v-for="data in subscribeTo"
      :key="data.subscribe_id"
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

            <p class="mt-6 mb-0">
              {{ data.name }}
            </p>
            <span class="text-body-1">{{ data.name }}</span>
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
              {{ data.isConnected ? '메이트취소' : '메이트신청' }}
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  
  <VCardText>
    <h5
      class="text-h5"
      style="font-weight: bold;"
    >
      구독받은 목록
    </h5>
    <hr
      :style="{'margin-top':'30px', 'margin-bottom':'10px',
               'background-color' :'#DEDEDE', 'height':'1px', 'border':'0'
      }"
    >
  </VCardText>
  <VAlert
    v-show="isMySubExist"
    density="default"
    color="secondary"
    variant="tonal"
    :style="{'margin-bottom':'200px'}"
  >
    구독받은 목록이 없습니다
  </VAlert>
  <VRow>
    <VCol
      v-for="data in subscribers"
      :key="data.id"
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

            <p class="mt-6 mb-0">
              {{ data.id }}
            </p>
            <span class="text-body-1">{{ data.name }}</span>
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
              {{ data.isConnected ? '메이트취소' : '메이트신청' }}
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
