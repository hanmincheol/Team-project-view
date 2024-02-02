<script setup>
import AppDateTimePicker from '@/@core/components/app-form-elements/AppDateTimePicker.vue'
import axios from '@axios'
import DiaryView from '@images/cards/DiaryView.png'
import { onMounted, ref } from 'vue'

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

const userId = ref('HMC')
const dateVal = ref(todayLabel.value)
const diaryContent = ref('')

//날짜에 맞는 데이터를 가져오기 위한 코드

onMounted(()=>{
  const dateTag = document.getElementById("date").children[0]

  var dateVal = dateTag.value.replace(/-/g, '')+'-'+userId.value

  console.log(dateVal)
  console.log(todayLabel.value)
  dateTag.addEventListener('change', ()=>{
    dateVal = dateTag.value.replace(/-/g, '')+'-'+userId.value
    axios("http://127.0.0.1:4000/manage/diary", { params: { userNDate: dateVal } })
      .then(resp => {
        console.log('axios 다이어리 : ', resp.data.diary_content)
        diaryContent.value = resp.data.diary_content
      })
      .catch(err=>console.error(err))
  })
})
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
              id="date"
              v-model="date"
              style="margin-top: 120px;"
              :style="{'color':'white'}"
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
              <!--
                <VTextarea 
                label="Content" 
                placeholder="오늘의 일기 내용"
                disabled=""
                rows="27"
                style=" width: 72%; padding: 10px; margin-top: -15px;"
                class="disabled-textarea"
                />
              -->
              <VCard style="display:flex; width: 75%; height: 72%; margin-top: -15px; background-color: rgba( 255, 255, 255, 0.7 );">
                <VCardText>
                  {{ diaryContent }}
                </VCardText>
              </VCard>
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



