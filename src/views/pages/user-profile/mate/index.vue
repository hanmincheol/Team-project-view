<script setup>
import axios from '@axios'
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const router = useRoute()
const connectionData = ref([])
const isMateExist = ref(false)

const rating = reactive({}) //호감도 뿌려주기 위한 변수
const beforeRating = {}

const ratingColors = [
  'warning',
]


const fetchProjectData = () => { //유저 값 가져오기
  if (router.params.tab === 'mate') {
    axios.get('http://127.0.0.1:4000/comm/mate', {
      params: {
        id: 'HMC',
      },
    })
      .then(response => {
        console.log(response.data)
        connectionData.value = response.data
        if (Object.keys(response.data).length == 0) isMateExist.value = true
        else {
          //호감도 Vrating에 설정해줄 값
          connectionData.value.forEach(user => {
            rating[user.mate_id] = ref(user.favorable_rating)
          })}
      })
      .catch(error => { 
        // 에러 처리
        console.error(error)
      })
  }
}


watch(router, fetchProjectData, { immediate: true })

watch(rating, ()=>{
  if(beforeRating != {}){
    for(const key in rating){
      if (beforeRating[key] != rating[key]){
        axios.put('http://127.0.0.1:4000/comm/mate/changeFavorable', JSON.stringify({
          mate_id: key,
          favorable_rating: rating[key],
        }), { headers: { "Content-Type": `application/json` } })
          .catch(error=>{console.log(error)})
      }
    }
  }
  for(const key in rating){
    beforeRating[key] = rating[key]
  }
}, { immediate: true })



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
  <VAlert
    v-show="isMateExist"
    density="default"
    color="secondary"
    variant="tonal"
    :style="{'margin-bottom':'200px'}"
  >
    메이트 목록이 없습니다
  </VAlert>
  <VRow>
    <VCol
      v-for="data in connectionData"
      :key="data.mate_id"
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
              {{ data.mate_id }}
            </p>
            <span class="text-body-1">{{ data.name }}</span>

            <div class="d-flex align-center flex-wrap gap-2 mt-6">
              <div class="d-flex flex-column">
                <VRating
                  v-for="color in ratingColors"
                  :key="color"
                  v-model="rating[data.mate_id]"
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
