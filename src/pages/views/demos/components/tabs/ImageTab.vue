<script setup>
import axios from '@axios'
import bg from '@images/pages/writing.jpg'
import { reactive, ref, toRefs } from 'vue'

async function uploadImages() {
  let formData = new FormData()

  images.files.forEach((file, index) => {
    formData.append(`file${index}`, file)
  })

  try {
    const response = await axios.post('저장할 스프링 서버', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log(response.data)
  } catch (e) {
    console.error(e)
  }

} //위부터 여기까지 값 넘기는 구간


// 이미지 생성 요청 함수
async function createImage() {
  isLoading.value = true  // 요청 전에 로딩 상태를 true로 설정
  try {
    const response = await axios.post('http://localhost:5000/CreateIm', { message: message.value })

    console.log(response.data.image_url)

    images.files.unshift({ url: 'http://localhost:5000'+response.data.image_url, name: '생성된 이미지' })  // 이미지 정보를 객체로 저장
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false  // 요청 완료 후에 로딩 상태를 false로 설정
  }
}

// 파일 입력을 처리하는 함수
const onFileChange = e => {
  for (let file of e.target.files) {
    images.files.push({ url: URL.createObjectURL(file), name: file.name })  // 이미지 정보를 객체로 저장
  }
}

const handleFileInput = files => {
  for (let file of files) {
    images.files.push({ url: URL.createObjectURL(file), name: file.name })  // 이미지 정보를 배열에 추가
  }
}

let dialog = ref(false)

let message = ref('')  // 텍스트 박스의 데이터

const sendMessage = () => {
  createImage()   // 이미지 생성 요청
}

let images = reactive({ files: [] })  // 선택된 이미지 파일을 저장하는 배열
let activeTab = ref(0)

let maxNameLength = 100  // 합쳐진 파일 이름의 최대 길이

// 파일 이름을 가져오는 계산된 속성
let fileNames = computed(() => {
  let names = files.value.map(file => file.name)  // 이미지 정보에서 이름을 추출
  let totalLength = names.join(', ').length
  if (totalLength > maxNameLength) {
    while (names.join(', ').length > maxNameLength) {
      names[names.length - 1] = names[names.length - 1].slice(0, -1)
    }

    names[names.length - 1] += '...'  // 마지막 파일 이름에 줄임표 추가
  }
  
  return names.join(', ')
})


// 이미지 URL을 생성하는 함수
const createImageUrl = image => {
  return image.url  // 이미지 정보에서 URL을 반환
}

// 이미지를 제거하는 함수
const removeImage = index => {
  URL.revokeObjectURL(createImageUrl(images.files[index]))  // URL 해제를 먼저 수행
  images.files.splice(index, 1)
  if (activeTab.value >= images.files.length) {
    activeTab.value = images.files.length - 1
  }

  inputValue.value = images.files  // 입력 값을 업데이트
  
}

const { files } = toRefs(images)

let fileInput = ref(null)  // 파일 입력을 위한 ref 생성

let isLoading = ref(false)  // 로딩 상태를 나타내는 데이터 추가
</script>

<template>
  <div>
    <VTextarea
      v-model="message"
      label="원하는 사진을 입력하세요"
      rows="2"
      no-resize
      style="margin-top: 10px;"
    />

    <VRow>
      <VCol cols="12">
        <VBtn
          block
          style="margin: 15px 0;"
          @click="sendMessage"
        >
          이미지 생성하기
        </VBtn>
      </VCol>
    </VRow>
    <div class="image-container">
      <img
        v-if="!isLoading"
        class="preview-image"
        :src="files.length > 0 ? createImageUrl(files[activeTab]) : bg"
        @click="dialog = true"
        @mouseover="zoomIn"
        @mouseout="zoomOut"
      >
      <VProgressCircular
        v-else
        class="loading"
        indeterminate
        color="primary"
      />
      <VBtn
        v-if="!isLoading && files.length > 0" 
        class="delete-button"
        icon
        small
        @click.stop="removeImage(activeTab)"
      >
        <VIcon>mdi-close-outline</VIcon>
      </VBtn>
    </div>
    <VDialog
      v-model="dialog"
      max-width="500px"
    >
      <VCard>
        <VImg :src="files.length > 0 ? createImageUrl(files[activeTab]) : bg" />
      </VCard>
    </VDialog>

    <VTabs
      v-model="activeTab"
      style="margin-bottom: 10px;"
    >
      <VTab
        v-for="(file, index) in files"
        :key="index"
        :value="index"
      >
        <VIcon icon="mdi-leaf-circle" />
      </VTab>
    </VTabs>

    <VFileInput
      ref="fileInput"
      input-value="inputValue"
      :value="files"
      multiple
      label="파일을 첨부하세요" 
      show-size
      prepend-icon="mdi-instagram"
      accept="image/*"
      @change="onFileChange"
      @file-input="handleFileInput"
    >
      <template #selection="{ text }">
        <div class="text-truncate">
          {{ fileNames }}
        </div>
      </template>
    </VFileInput>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
    }
  },
  methods: {
    zoomIn(e) {
      e.target.style.transform = 'scale(1.05)'
    },
    zoomOut(e) {
      e.target.style.transform = 'scale(1)'
    },
    deleteAllFiles() {
      this.files = [] // 파일 전체 삭제
      this.$refs.fileInput.reset() // VFileInput 컴포넌트 초기화
    },
  },
}
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
  overflow: visible;  /* 이미지 크기 제한 풀기 */
  border-style: solid;
  block-size: 400px;
  inline-size: 100%;
}

.preview-image {
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out; /* 이 부분을 추가하여 확대/축소 애니메이션을 부드럽게 만듬. */
}

.delete-button {
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
}

.loading {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
}
</style>
