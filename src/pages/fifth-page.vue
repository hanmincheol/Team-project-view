<script setup>
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import timelineCardHeader from '@images/cards/timeline-card-header.png'
import ApexChartHorizontalBar from '@/pages/views/charts/apex-chart/ApexChartHorizontalBar.vue'


const isDialogVisible = ref(false)
const submitBtn = ref(false)
const submitContent = ref(false)
</script>

<template>
  <VRow>
    <VCol>
      <!--Diary 위 이미지-->
      <VImg
        cover
        height="270"
        :src="timelineCardHeader"
      />
      <!--Diary 시작-->
      <VCard
        title="Diary🙌"
        flat
        :max-width="auto"
        class="mt-12 mt-sm- pa-0"
      >
        <VRow cols="12">
          <VCol cols="2"/>
          <VRow cols="8">
            <VCol cols="2">
              <VBtn 
                icon="mdi-emoticon-angry"
                size="x-large"/> 
            </VCol>
            <VCol cols="2">
              <VBtn 
                icon="mdi-emoticon-sad"
                size="x-large"/> 
            </VCol>
            <VCol cols="2">
              <VBtn 
                icon="mdi-emoticon-neutral"
                size="x-large"/> 
            </VCol>
            <VCol cols="2">
              <VBtn 
                icon="mdi-emoticon-excited"
                size="x-large"/> 
            </VCol>
            <VCol cols="2">
              <VBtn 
                icon="mdi-emoticon-cool"
                size="x-large"/> 
            </VCol>

            <VCol cols="2">
              <VDialog
                v-model="isDialogVisible"
                width="500"
              >
                <!-- Activator -->
                <template #activator="{ props }">
                  <VBtn 
                    v-bind="props"
                    size="x-large">
                    오늘의 기분
                  </VBtn>
                </template>

                <!-- Dialog Content -->
                <VCard title="당신의 오늘의 기분을 알려주세요!!">
                  <DialogCloseBtn
                    variant="text"
                    size="small"
                    @click="isDialogVisible = false"
                  />

                  <VCardText>
                    당신의 오늘와 가장 알맞는 표정을 선택해 주세요!!
                  </VCardText>
                </VCard>
              </VDialog>
            </VCol>
          </VRow>
          <VCol cols="2"/>
        </VRow>
        <VCol />
        <!--여기가 content부분-->
        <VCol cols="12">
          <VTextarea 
            label="Content" 
            rows="20"
            style="height: 500px;"/>
        </VCol>
        <!-- content부분 끝-->
        <VCol cols="12">
          <VSpacer />
          <VBtn @click="submitBtn = true">
            등록
          </VBtn>  

          <VDialog
            v-model="submitBtn"
            width="500"
          >
            <!-- Dialog Content -->
            <VCard title="등록하시겠습니까?">
              <DialogCloseBtn
                variant="text"
                size="small"
                @click="submitBtn = false"
              />

              <VCardText>
                등록하시겠습니까?
              </VCardText>
              <VBtn @click="submitBtn = false">
                등록
              </VBtn>  
            </VCard>
          </VDialog>
        </VCol>
      </VCard>
      <FontAwesomeIcon icon="coffee" />
    </VCol>
  </VRow>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon,
  },
}
</script>

