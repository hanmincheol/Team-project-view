<script setup>
import DiaryView from '@/pages/diaryView.vue'
import DiaryPage from '@images/cards/DiaryPage.png'

import timelineCardHeader from '@images/cards/timeline-card-header.png'
import {
  requiredValidatorDiaryPassword,
} from '@validators'
import { ref } from 'vue'


const biggeImgFile = ref(false)
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
const inputDiaryPhoto = ref(false)
const clickedImageUrl = ref('')

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


const imageUrl = ref('') // 이미지 URL을 담을 변수 -- 사진 1개
const imgUrls = ref([]) // 이미지 URL 담을 변수 -- 사진 여러개
const imageSize = ref(null) //이미지 마우스 올릴 때 이벤트를 위한 변수

//파일 1개 업로드 함수 -- 오늘의 기분
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

// 마우스 클릭할 때
const handleImageClick = url => {
  clickedImageUrl.value = url // Set the clicked image URL
  biggeImgFile.value = true // Set biggeImgFile to true
  console.log(clickedImageUrl.value)
}

// 마우스 올릴 때
const handleMouseOver = index => {
  imageSize.value = index // Set the index of the hovered image
}

//마우스 떠날 때
const handleMouseLeave = () => {
  imageSize.value = null // Reset the index to null when mouse leaves
}

/////

// 멀티 파일 업로드할때 필요한 함수 -- 일기에 사진 추가할때 사용
const uploadImgMultiple = e => {
  const fileList = e.target.files

  if (fileList.length > 0) {
    // 여러 이미지를 저장할 배열
    const imageUrls = []

    // fileList의 각 파일에 대해 URL 생성 및 배열에 추가
    for (let i = 0; i < fileList.length; i++) {
      const imgUrl = URL.createObjectURL(fileList[i])

      imageUrls.push(imgUrl)
    }

    // 배열을 컴포넌트 내의 데이터에 할당
    imgUrls.value = imageUrls
  } else {
    // Handle the case where no file is selected
    console.error('No file selected')
  }
}

const deleteImage = index =>{
  imgUrls.value.splice(index, 1)
}

//input file에 사이즈에 대한 룰 설정
const rules = [fileList => !fileList || !fileList.length || fileList[0].size < 1000000 || 'Avatar size should be less than 1 MB!']
</script>

<template>
  <VRow>
    <VCol>
      <!-- Diary 위 이미지 -->
      <VImg
        cover
        height="230"
        :src="timelineCardHeader"
      />
      <!-- Diary 시작 -->
      <VCard
        title=" "
        flat
        :max-width="auto"
        class="mt-4 mt-sm- pa-0"
      >
        <VRow
          v-if="!readDiaryContent"
          cols="12"
        >
          <VCol cols="2" />
          <VRow cols="8">
            <!-- 기분 표시하는 아이콘 -->
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
            <!-- 아이콘 영역 끝 -->
            <!-- 사진을 통한 스트레스 분석에 필요한 버튼 -->
            <VCol cols="2">
              <VDialog
                v-model="isDialogVisible"
                width="600"
              >
                <!-- Activator -->
                <template #activator="{ props }">
                  <VBtn 
                    v-bind="props"
                    size="x-large"
                  >
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
                    당신의 표정을 찍어서 오늘의 스트레스 지수를 확인해보세요!! <br>
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
                      @click="isDialogVisible=false"
                    >
                      확인
                    </VBtn>
                  </VCol>
                </VCard>
              </VDialog>
            </VCol>
            <!-- 버튼 눌렀을 때 나타나는 모달 끝 -->
          </VRow>
          <!-- 아이콘 / 오늘의 기분 버튼 줄 -->
          <VCol cols="2" />
        </VRow>
        <VCol />
        <!-- 여기가 content부분 -->
        <!-- 해당 if는 일기 작성 / 일기 보기 버튼이 클릭 되지 않은 기본 상태 -->
        <VCard 
          v-if="!writeDiaryContent && !readDiaryContent"
          :image="DiaryPage"
          height="900"
          align="center"
        >
          <!-- 다이어리 비밀번호 입력 -->
          <Transition name="fade">
            <VRow v-if="!diaryLock">
              <VCol cols="9" />
              <VCol cols="2">
                <VForm 
                  ref="refVForm" 
                  @submit="diaryLock=true"
                >
                  <Transition name="fade">
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
                  </Transition>
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
          </Transition>
          <!-- 비밀번호 입력 끝 -->
          <!-- 비밀번호 입력 했을 시 보이는 화면 -->
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
          <!-- 비밀번호 입력 했을 시 보이는 화면 끝 -->
        </VCard>
        <!-- 일기 보기 버튼 클릭 -->
        <VCard v-if="readDiaryContent">
          <DiaryView :img-urls="imgUrls" />
          <!-- 일기 보기 버튼 다시 비활성화하는 버튼 -->
          <VCol cols="2">
            <VBtn 
              cols="2"  
              @click="readDiaryContent=false"
            >
              뒤로가기
            </VBtn>
          </VCol>
        </VCard>
        <!-- 일기 보기 버튼 끝 -->
        <!-- 일기 쓰기 버튼 -->
        <VForm>
          <VCard v-if="writeDiaryContent">
            <VCol cols="12">
              <!-- 텍스트 영역 위 img 뿌려주는 공간 -->
              <Transition name="fade">
                <VRow
                  v-if="imgUrls.length > 0"
                  style="height: 200px; margin-top: 15px;"
                >
                  <VImg 
                    v-for="(url, index) in imgUrls" 
                    :key="index"
                    :src="url"
                    :style="{
                      width: imageSize === index ? '200px' : '150px',
                      height: imageSize === index ? '200px' : '150px',
                      alignSelf: 'center',
                      transition: 'width 0.2s, height 0.2s', // Transition for smooth size change
                      position: 'relative'
                    }"
                    @click="handleImageClick(url)"
                    @mouseover="handleMouseOver(index)"
                    @mouseleave="handleMouseLeave"
                  >
                    <VBtn
                      :key="index"
                      icon
                      size="small"
                      color="error"
                      class="delete-button"
                      style="position: absolute; top: 0; right: 0;"
                      @click.stop="() => deleteImage(index)"
                    >
                      <VIcon>mdi-close</VIcon>
                    </VBtn>
                  </VImg>
                </VRow>
              </Transition>
            </VCol>
            <VCol>
              <VCol cols="12">
                <VTextarea 
                  id="diaryContent"
                  label="Content" 
                  rows="30"
                  style="height: 800px;"
                />
              </VCol>
              <VCol cols="12">
                <VRow>
                  <VCol cols="2">
                    <VBtn @click="submitBtn = true">
                      등록
                    </VBtn>
                  </VCol>
                  <VSpacer />
                  <VCol cols="1">
                    <VBtn 
                      width="50"  
                      @click="diaryWriteComplet"
                    >
                      뒤로가기
                    </VBtn>
                  </VCol>
                  <VCol cols="1">
                    <VDialog
                      v-model="inputDiaryPhoto"
                      width="600"
                    >
                      <template #activator="{ props }">
                        <VBtn 
                          width="50" 
                          v-bind="props "
                        >
                          사진 추가
                        </VBtn>
                      </template>
                      <!-- Dialog Content -->
                      <VCard title="당신의 오늘의 기분을 알려주세요!!">
                        <DialogCloseBtn
                          variant="text"
                          size="small"
                          @click="inputDiaryPhoto = false"
                        />
                        <VCardText>
                          사진을 추가해주세요
                        </VCardText>
                        <VImg 
                          v-for="(url, index) in imgUrls" 
                          :key="index"
                          :src="url"
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
                            multiple
                            @change="uploadImgMultiple"
                          />
                        </VCol>
                        <VCol>
                          <VBtn 
                            block
                            @click="inputDiaryPhoto=false"
                          >
                            확인
                          </VBtn>
                        </VCol>
                      </VCard>
                    </VDialog>
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
                <!-- 멀티 이미지 클릭 시 열리는 모달 -->
                <VDialog
                  v-model="biggeImgFile"
                  width="600"
                  height="650"
                >
                  <VCard cols="12">
                    <VCardText>
                      <VImg
                        :src="clickedImageUrl"
                        width="600px"
                        height="600px"
                      />
                    </VCardText>
                  </VCard>
                </VDialog>
              </VCol>
            </VCol>
          </VCard>
        </VForm>
      </VCard>
      <!-- content부분 끝 -->
      <FontAwesomeIcon icon="coffee" />
    </VCol>
  </VRow>
</template>


<style lang="scss">
.fade-enter,
.fade-enter-active {
  opacity: 0;
  transition: opacity 1s;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-active,
.fade-leave {
  opacity: 1;
  transition: opacity 1s;
}

.fade-leave-to {
  opacity: 0;
}
</style>

