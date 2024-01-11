<script setup>
import timelineCardHeader from '@images/cards/timeline-card-header.png'
import DiaryPage from '@images/cards/DiaryPage.png'
import Calendar from '@/pages/apps/calendar.vue'
import { ref } from 'vue'
import {
  requiredValidatorDiaryPassword,
} from '@validators'

const previousBtn = ref(null)
const btnSize = '40'  //버튼 크기
const isDialogVisible = ref(false)
const submitBtn = ref(false)
const writeDiaryContent = ref(false)
const readDiaryContent = ref(false)
const diaryLock = ref(false)
const selectedBtn = ref()
const viewPassword = ref(false)
const password = ref('Password')
const refVForm = ref()

const diaryWriteComplet = () => {
  writeDiaryContent.value = false
  submitBtn.value = false
}


const btnIcons = [
  {
    icon: 'mdi-emoticon-angry',
    value: 0,
  },
  {
    icon: 'mdi-emoticon-sad',
    value: 1,
  },
  {
    icon: 'mdi-emoticon-neutral',
    value: 2,
  },
  {
    icon: 'mdi-emoticon-excited',
    value: 3,
  },
  {
    icon: 'mdi-emoticon-cool',
    value: 4,
  },
]

const selectButton = value => {
  previousBtn.value = selectedBtn.value
  selectedBtn.value = value
}

const getButtonColor = value => {
  if (selectedBtn.value === value) {
    switch (value) {
    case 0:
      return '#FF4500' // Angry - 오렌지레드
    case 1:
      return '#FF8C00' // Sad - 다크오렌지
    case 2:
      return '#FFD700' // Neutral - 노란색
    case 3:
      return '#7CFC00' // Excited - 초록색
    case 4:
      return '#00BFFF' // Cool - 딥스카이블루
    default:
      return '#E6E6FA' // 기본 대기중 색상
    }
  }
  else {
    return '#E6E6FA'
  }
}


const imageUrl = ref('') // 이미지 URL을 담을 ref

const uploadImg = e => {
  const fileList = e.target.files
  if (fileList.length > 0) {
    const imgUrl = URL.createObjectURL(fileList[0])

    imageUrl.value = imgUrl
  } else {
    // Handle the case where no file is selected
    console.error('No file selected')
  }
}



const rules = [fileList => !fileList || !fileList.length || fileList[0].size < 1000000 || 'Avatar size should be less than 1 MB!']
</script>

<template>
  <VRow>
    <VCol>
      <!--Diary 위 이미지-->
      <VImg
        cover
        height="230"
        :src="timelineCardHeader"
      />
      <!-- Diary 시작 -->
      <VCard
        title="Diary🙌"
        flat
        :max-width="auto"
        class="mt-12 mt-sm- pa-0"
      >
        <VRow cols="12">
          <VCol cols="2"/>
          <VRow cols="8">
            <VCol 
              v-for="(icon, index) in btnIcons" 
              :key="index"
              cols="2" 
            >
              <VBtn
                :icon="icon.icon"
                :size="btnSize"
                :color="getButtonColor(icon.value)"
                @click="selectButton(icon.value)"
              />
            </VCol>

            <VCol cols="2">
              <VDialog
                v-model="isDialogVisible"
                width="600"
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
                    당신의 표정을 찍어서 오늘의 스트레스 지수를 확인해보세요!! <br/>
                    AI가 당신의 표정을 읽어 스트레스 지수를 알려줘요  
                  </VCardText>
                  <VImg
                    id="diaryImages"
                    :src="imageUrl"
                    style="width: 400px; height: 400px; align-self: center;"
                  />
                  <VCol cols="12">
                    <VFileInput
                      :rules="rules"
                      label="Face IMG"
                      type="file"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera-outline"
                      @change="uploadImg"
                    />
                  </VCol>
                  <VCol>
                    <VBtn 
                      block
                      @click="isDialogVisible=false">
                      확인
                    </VBtn>
                  </VCol>
                </VCard>
              </VDialog>
            </VCol>
          </VRow>
          <VCol cols="2"/>
        </VRow>
        <VCol />
        <!--여기가 content부분-->
        <VCard 
          v-if="!writeDiaryContent && !readDiaryContent"
          :image="DiaryPage"
          height="900"
          align="center">
          <VRow v-if="!diaryLock">
            <VCol cols="9" />
            <VCol cols="2">
              <VForm 
                ref="refVForm" 
                @submit="diaryLock=true"
              >
                <VTextField
                  v-if="viewPassword"
                  v-model="password"
                  style="margin-top: 450px;"
                  :append-inner-icon="show1 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  :rules="[rules.required, rules.min, requiredValidatorDiaryPassword]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  counter
                  @click:append-inner="show1 = !show1"
                />
              </VForm>
            </VCol>
            <VCol cols="1">
              <VBtn 
                icon="mdi-lock"
                rounded="lg"
                size="x-large"
                style="margin-top: 450px;"
                @click="viewPassword = true"
              />
            </VCol>
          </VRow>
          <VRow v-if="diaryLock">
            <VCol cols="4" />
            <VCol cols="2">
              <VBtn 
                style="margin-top: 600px;"
                @click="writeDiaryContent = true"
              >
                일기 작성
              </VBtn>
            </VCol>
            <VCol cols="2">
              <VBtn 
                style="margin-top: 600px;"
                @click="readDiaryContent = true"
              >
                일기 보기
              </VBtn> 
            </VCol> 
          </VRow>
        </VCard>
        <VCard v-if="readDiaryContent">
          <Calendar />
          <VCol cols="2">
            <VBtn 
              cols="2"  
              @click="readDiaryContent=false"
            >
              뒤로가기
            </VBtn>
          </VCol>
        </VCard>
        <VForm>
          <VCard v-if="writeDiaryContent">
            <VCol>
              <VCol cols="12">
                <VTextarea 
                  label="Content" 
                  rows="35"
                  style="height: 900px;"/>
              </VCol>

              <VCol cols="2">
                <VSpacer />
                <VRow>
                  <VCol cols="2">
                    <VBtn @click="submitBtn = true">
                      등록
                    </VBtn>
                  </VCol>
                  <div style="width: 50px;"/>
                  <VCol cols="2">
                    <VBtn 
                      cols="2"  
                      @click="diaryWriteComplet"
                    >
                      뒤로가기
                    </VBtn>
                  </VCol>
                </VRow>  
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
                      <VBtn 
                        block
                        type="submit"
                        @click="diaryWriteComplet"
                      >
                        등록
                      </VBtn>  
                    </VCardText>
                  </VCard>
                </VDialog>
              </VCol>
            </VCol>
          </VCard>
        </VForm>
      </VCard>
      <!-- content부분 끝-->
      <FontAwesomeIcon icon="coffee" />
    </VCol>
  </VRow>
</template>

