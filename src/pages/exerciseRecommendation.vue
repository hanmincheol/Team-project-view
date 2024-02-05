<script setup>
import UpdateExercise from '@/components/dialogs/UpdateExercise.vue'

const isUpgradeExercisePlan = ref(false)
const isCheckedRecipe = ref(false)
const isCheckedRestaurant = ref(false)
const isCategory = ref(false)

const router = useRoute()
const connectionData = ref([])


const fetchProjectData = () => {
  if (router.params.tab === 'connections') {
    axios.get('/pages/profile', { params: { tab: router.params.tab } }).then(response => {
      connectionData.value = response.data
    })
  }
}

const dietPlansList = [
  {
    desc: 'Standard - $99/month',
    title: '아침 메뉴',
    content: '아침 메뉴 설명',
  },
  {
    desc: 'Basic - $0/month',
    title: '점심 메뉴',
    content: '점심 메뉴 설명',
  },
  {
    desc: 'Enterprise - $499/month',
    title: '저녁 메뉴',
    content: '저녁 메뉴 설명',
  },
]

watch(router, fetchProjectData, { immediate: true })
</script>

<template>
  <section>
    <VRow class="fill-height">
      <VCol
        cols="7"
        class="dll"
      >
        <!-- 전체 화면의 왼쪽 -->
        <VCard 
          class="custom-scrollbar"
          style="height: 925px; overflow-y: auto;"
        >
          <!-- 참가비 시작 -->
          <VCol>
            <VCard
              v-for="data in 20"
              :key="data.index"
              cols="12"
              style="margin: 10px;"
            >
              <VCol>
                <VRow>
                  <VCol
                    cols="2"
                    style="height: 50px;"
                  >
                    작성자
                  </VCol>
                  <VCol cols="8">
                    <a class="my-custom-button">지식인 내용  </a>    
                  </VCol>
                  <VCol cols="2">
                    지식인 날자
                  </VCol>
                </VRow>
              </VCol>
            </VCard>
          </VCol>
        </VCard>
      </VCol>

      <!-- 지식인 끝 --> 

      <VCol cols="5">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/V1TzoKc99rE"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <VCard
          flat
          :max-width="auto"
          class="mt-1 mt-sm- pa-0 custom-scrollbar"
          style="height: 600px; overflow-y: auto;"
        >
          <VCol
            v-if="true"
            class="d-flex justify-center align-center"
            style="height: 300px;"
          >
            <!-- 게시물이 없을 때의 템플릿 -->
            <VCol
              class="d-flex flex-column align-center justify-center"
              style="height: 100%;"
            >
              <VCardTitle class="headline font-weight-bold">
                등록된 게시물이 없습니다
              </VCardTitle>
              <VCardText>새로운 게시물을 작성해보세요!</VCardText>
            </VCol>
          </VCol>
          <VCol
            v-if="true"
            class="d-flex justify-center align-center"
            style="height: 300px;"
          >
            <!-- 게시물이 없을 때의 템플릿 -->
            <VCol
              class="d-flex flex-column align-center justify-center"
              style="height: 100%;"
            >
              <VCardTitle class="headline font-weight-bold">
                등록된 게시물이 없습니다
              </VCardTitle>
              <VCardText>새로운 게시물을 작성해보세요!</VCardText>
            </VCol>
          </VCol>
          <VCol
            v-if="true"
            class="d-flex justify-center align-center"
            style="height: 300px;"
          >
            <!-- 게시물이 없을 때의 템플릿 -->
            <VCol
              class="d-flex flex-column align-center justify-center"
              style="height: 100%;"
            >
              <VCardTitle class="headline font-weight-bold">
                등록된 게시물이 없습니다
              </VCardTitle>
              <VCardText>새로운 게시물을 작성해보세요!</VCardText>
            </VCol>
          </VCol>
        </VCard>
      </VCol>
    </VRow>
    <VBtn
      block
      style="margin-top: 10px;"
      @click="isUpgradeExercisePlan = true"
    >
      운동 추천 받기
    </VBtn>
    <UpdateExercise v-model:isDialogVisible="isUpgradeExercisePlan" />
  </section>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";

.custom-scrollbar::-webkit-scrollbar {
  background-color: #f5f5f5;
  inline-size: 0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
