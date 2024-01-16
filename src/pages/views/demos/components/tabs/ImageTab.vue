<script setup>
import axios from 'axios'
import bg from '@images/pages/writing.jpg'
import { reactive, ref, toRefs } from 'vue'

async function uploadImages() {
  let formData = new FormData()

  images.files.forEach((file, index) => {
    formData.append(`file${index}`, file)
  })

  try {
    const response = await axios.post('/넘길 서버적기', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log(response.data)
  } catch (e) {
    console.error(e)
  }

} //위부터 여기까지 값 넘기는 구간

let images = reactive({ files: [] })  // 선택된 이미지 파일을 저장하는 배열
let activeTab = ref(0)

let maxNameLength = 100  // 합쳐진 파일 이름의 최대 길이

let fileNames = computed(() => {
  let names = files.value.map(file => file.name)
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
const createImageUrl = file => {
  return URL.createObjectURL(file)
}

// 이미지를 제거하는 함수
const removeImage = index => {
  URL.revokeObjectURL(createImageUrl(images.files[index]))  // URL 해제를 먼저 수행
  images.files.splice(index, 1)
  if (activeTab.value >= images.files.length) {
    activeTab.value = images.files.length - 1
  }

  fileInput.value = null  // 파일 선택 상태 초기화
  
}

const { files } = toRefs(images)

let fileInput = ref(null)  // 파일 입력을 위한 ref 생성
</script>

<template>
  <div>
    <div class="image-container">
      <img
        class="preview-image"
        :src="files.length > 0 ? createImageUrl(files[activeTab]) : bg"
      > <!-- 이미지에 클래스 추가 -->
      <VBtn
        v-if="files.length > 0" 
        class="delete-button"
        icon
        small
        @click.stop="removeImage(activeTab)"
      >
        <VIcon>mdi-close-outline</VIcon>
      </VBtn>
    </div>

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
      :key="files.length"
      v-model="files"
      multiple 
      label="파일을 첨부하세요"
      :show-size="false"
      prepend-icon="mdi-instagram"
      accept="image/*"
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
  border-style: solid;
  block-size: 450px;
  inline-size: 100%;
}

.preview-image {
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
}

.delete-button {
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
}
</style>
