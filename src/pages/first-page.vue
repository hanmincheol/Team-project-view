<script setup>
import UserCategory from '@/components/dialogs/UserCategory.vue'

const isUpgradePlanDietPlan = ref(false)
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
      <VCol cols="12">
        <VBtn
          block
          @click="isCategory = true"
        >
          카테고리
        </VBtn>
      </VCol>
      <VCol
        v-for="list in dietPlansList"
        :key="list"
        cols="12"
        md="4"
      >
        <VCard class="text-center">
          <VCardItem class="d-flex flex-column justify-center align-center">
            <VAvatar
              color="primary"
              variant="tonal"
              size="56"
              class="mb-2"
            >
              <VIcon
                size="2rem"
                icon="mdi-help-circle-outline"
              />
            </VAvatar>

            <h6 class="text-h6">
              <span>{{ list.title }}</span>
            </h6>
          </VCardItem>

          <VCardText>
            <span>{{ list.content }}</span>
          </VCardText>

          <VCardText class="justify-center">
            <VBtn
              variant="elevated" 
              @click="isCheckedRecipe = true"
            >
              레시피
            </VBtn>
          </VCardText>
          <VCardText class="justify-center">
            <VBtn
              variant="elevated"
              @click="isCheckedRestaurant = true"
            >
              음식점
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
      <VCol>
        <VBtn
          block
          @click="isUpgradePlanDietPlan = true"
        >
          식단 재추천
        </VBtn>
      </VCol>
    </VRow>
    <UserUpgradedietPlan v-model:isDialogVisible="isUpgradePlanDietPlan" />
    <UserCheckedRecipe v-model:isDialogVisible="isCheckedRecipe" />
    <UserFindRestaurant v-model:isDialogVisible="isCheckedRestaurant" />
    <UserCategory v-model:isDialogVisible="isCategory" />
  </section>
</template>

<style lang="scss">
  @use "@core/scss/template/libs/apex-chart.scss";
</style>
