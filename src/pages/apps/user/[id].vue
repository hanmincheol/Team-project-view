<script setup>
import ShareProjectDialogTemp from '@/components/dialogs/ChallengeInviteModal.vue';
import chat from '@/pages/apps/challengeChat.vue';
import { useUserListStore } from '@/views/apps/user/useUserListStore';
import UserProfileForChellenge from '@/views/apps/user/view/UserProfileForChellenge.vue';
import ChallengeRatio from '@/views/charts/apex-chart/ChallengeRatio.vue';
import AppDateTimePicker from '@core/components/app-form-elements/AppDateTimePicker.vue';
import { getBarChartConfig } from '@core/libs/apex-chart/apexCharConfig'; //차트 불러오기
import { useTheme } from 'vuetify'; //차트 불러오기

const isShareProjectDialogVisible = ref(false)
const userListStore = useUserListStore()
const route = useRoute() //route객체
const userData = ref()
const userTab = ref(null)

//차트 불러오기 용

const vuetifyTheme = useTheme()

const horizontalBarChartConfig = computed(() => getBarChartConfig(vuetifyTheme.current.value))
console.log('test:',vuetifyTheme.current.value);
const series = [{ data: [200] }]

//차트 불러오기 용 end

userListStore.fetchUser(Number(route.params.id)).then(response => {
  userData.value = response.data
})

</script>
<template>
  <div>
    <VRow>
      <VCol cols="12" md="7" class="match-height"> <!--전체 화면의 왼쪽-->
        <VCard >
          <VRow> <!--챌린지 참여인원 전체-->
            <VRow :style="{'margin':'50px 0','width': '100%', 'display':'flex', 'justify-content': 'space-around'}"> <!--참여인원 목록 영역-->
              <VCol cols="3">
                <VCard > <!--프로필 사진-->
                  <VCardItem>
                    <VCardTitle>
                      <UserProfileForChellenge :user-data="userData" />
                    </VCardTitle>
                  </VCardItem>
                </VCard>
              </VCol>
              <VCol cols="3">
                <VCard > <!--프로필 사진-->
                  <VCardItem>
                    <VCardTitle>
                      <UserProfileForChellenge :user-data="userData" />
                    </VCardTitle>
                  </VCardItem>
                </VCard>
              </VCol>
              <VCol cols="3">
                <VCard > <!--프로필 사진-->
                  <VCardItem>
                    <VCardTitle>
                      <UserProfileForChellenge :user-data="userData" />
                    </VCardTitle>
                  </VCardItem>
                </VCard>
              </VCol>
              <VCol cols="3">
                <VCard > <!--프로필 사진-->
                  <VCardItem>
                    <VCardTitle>
                      <UserProfileForChellenge :user-data="userData" />
                    </VCardTitle>
                  </VCardItem>
                </VCard>
              </VCol>
            </VRow>
            <VRow :style="{'margin':'auto 0','margin-bottom':'60px', 'width': '100%', 'display':'flex', 'justify-content': 'space-around'}"> <!--참여인원 목록 영역-->
              <VCol cols="3">
                <VCard > <!--프로필 사진-->
                  <VCardItem>
                    <VCardTitle>
                      <UserProfileForChellenge :user-data="userData" />
                    </VCardTitle>
                  </VCardItem>
                </VCard>
              </VCol>
              <VCol cols="3">
                <VCard > <!--프로필 사진-->
                  <VCardItem>
                    <VCardTitle>
                      <UserProfileForChellenge :user-data="userData" />
                    </VCardTitle>
                  </VCardItem>
                </VCard>
              </VCol>
              <VCol cols="3">
                <VCard > <!--프로필 사진-->
                  <VCardItem>
                    <VCardTitle>
                      <UserProfileForChellenge :user-data="userData" />
                    </VCardTitle>
                  </VCardItem>
                </VCard>
              </VCol>
              <VCol cols="3">
                <VCard > <!--프로필 사진-->
                  <VCardItem>
                    <VCardTitle>
                      <UserProfileForChellenge :user-data="userData" />
                    </VCardTitle>
                  </VCardItem>
                </VCard>
              </VCol>
            </VRow> <!--참여인원 목록 영역 end-->
          </VRow> <!--챌린지 참여인원 전체 end-->
           <!--댓글 영역-->
          <!-- <VCol class="match-height" :style="{'margin-top':'50px'}">
            <chat />
          </VCol> -->
        </VCard>
        <v-card :style="{'margin-top':'30px'}">
          <chat />
        </v-card>
      </VCol> <!--전체 화면의 왼쪽 end-->
      
      <VCol cols="12" md="5" class="match-height"> <!--전체 화면의 오른쪽-->
        <VCard :style="{'padding-bottom':'35px'}">
          <VRow :style="{'display':'flex', 'justify-content': 'space-around'}"> <!--목표관련 정보-->
            <VCard :style="{'width':'90%', 'margin-top':'50px'}">
              <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
                <VCardText><h6 class="text-h6">📌 운동량 80% 달성하기</h6></VCardText>
                <hr :style="{'width':'500px'}" />
                <template #append>
                  <div class="date-picker-wrapper" :style="{'padding-bottom':'50px', 'padding-top':'10px'}">
                    시작날짜
                    <AppDateTimePicker
                      model-value="2022-06-09"
                      prepend-inner-icon="mdi-calendar-blank-outline"
                      density="compact"
                      :config="{ position: 'auto right' }"
                      :style="{'width':'300px', 'padding-top':'10px'}"
                    />
                  </div>
                  <div class="date-picker-wrapper" :style="{'padding-bottom':'50px'}">
                    종료날짜
                    <AppDateTimePicker
                      model-value="2022-06-09"
                      prepend-inner-icon="mdi-calendar-blank-outline"
                      density="compact"
                      :config="{ position: 'auto right' }"
                      :style="{'width':'300px', 'padding-top':'10px'}"
                    />
                  </div>
                </template>
              </VCardItem>
            </VCard>
            <VCard :style="{'width':'90%', 'margin-top':'50px'}"> <!--그래프-->
              <!-- <VueApexCharts
                    type="bar"
                    height="200"
                    :options="horizontalBarChartConfig"
                    :series="series"
                  /> -->
              <ChallengeRatio/>
            </VCard> <!--그래프 end-->
          </VRow> <!--목표관련 정보 end-->
          <VRow :style="{'display':'flex', 'justify-content': 'space-around'}"> <!--경고창-->
            <VCard :style="{'width':'90%', 'margin-top':'42px'}">
              <VRow :style="{'padding':'5px', 'margin-top':'5px', 'margin-left':'5px'}">
                <VCardText class="float-left"><h3>참여비 10000원</h3></VCardText>
              </VRow>
                <VCardText>⚠️ 챌린지 하루 전 자동 결제됩니다</VCardText>
            </VCard>
          </VRow> <!--경고창 end-->
          <VRow> <!--버튼-->
            <div :style="{'margin-top':'42px','display':'flex', 'width':'90%', 'justify-content':'flex-end'}">
              <VBtn @click="isShareProjectDialogVisible = !isShareProjectDialogVisible">Invite</VBtn>
              <ShareProjectDialogTemp v-model:isDialogVisible="isShareProjectDialogVisible"/>
              <VBtn :style="{'margin-left':'10px'}">Exit</VBtn>
            </div>
          </VRow> <!--버튼 end-->
        </VCard>
      </VCol><!--전체 화면의 오른쪽 end-->
    </VRow>
  </div>
</template>

<style lang="scss">
  .card-list {
    --v-card-list-gap: 0.75rem;
  }
</style>