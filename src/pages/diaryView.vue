<script setup>
import DiaryView from '@images/cards/DiaryView.png'
import { ref } from 'vue'

const props = defineProps({
  imgUrls: {
    type: Array,
    required: true,
  },
})

const biggeImgFile = ref(false)
const imageSize = ref(null) //이미지 마우스 올릴 때 이벤트를 위한 변수
const submitBtn = ref(false)
const writeDiaryContent = ref(false)
const selectedBtn = ref()

const date = ref(new Date()) // 날짜를 담을 변수
const todayLabel = ref(getTodayLabel()) // 오늘 날짜를 포맷팅하여 담을 변수

function getTodayLabel() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

const clickedImageUrl = ref('')

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
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- Diary 시작 -->
      <VCard align="center">
        <!-- 일기 쓰기 버튼 -->
        <VCard
          :image="DiaryView"
          align="center"
          style=" width: 1000px;height: 1200px;"
        > 
          <VCol
            cols="4"
            style="margin-left: -20%;"
          >
            <AppDateTimePicker
              v-model="date"
              label=" "
              style="margin-top: 120px;"
            />
          </VCol>
            
          <VCol cols="10">
            <!-- 텍스트 영역 위 img 뿌려주는 공간 -->
            <Transition name="fade">
              <VRow style="height: 125px; margin-top: -13px;">
                <VImg 
                  v-for="(url, index) in imgUrls" 
                  :key="index"
                  :src="url"
                  :style="{
                    transition: 'width 0.1s, height 0.1s',
                    alignSelf: 'center',
                    width: imageSize === index ? '125px' : '120px',
                    height: imageSize === index ? '125px' : '120px',
                  }"
                  @click="handleImageClick(url)"
                  @mouseover="handleMouseOver(index)"
                  @mouseleave="handleMouseLeave"
                />
              </VRow>
            </Transition>
          </VCol>
          <VCol>
            <VCol
              cols="12"
              style="height: 1000px;"
            >
              <VTextarea 
                label="Content" 
                placeholder="오늘의 일기 내용"
                disabled=""
                rows="27"
                style=" width: 72%; padding: 10px; margin-top: -15px;"
                class="disabled-textarea"
              />
            </VCol>
          </VCol>
        </VCard>
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
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
.disabled-textarea {
  color: black; /* 텍스트 색상을 검정색으로 설정합니다. */
}
</style>


<style lang="scss">
.fade-enter,
.fade-enter-active {
  opacity: 0;
  transition: opacity 0.5s;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-active,
.fade-leave {
  opacity: 1;
  transition: opacity 0.5s;
}

.fade-leave-to {
  opacity: 0;
}
</style>



