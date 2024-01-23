<script setup>
import It from '@/pages/views/demos/components/tabs/ImageTab.vue'
import Text from '@/pages/views/demos/forms/form-elements/textarea/WritingText.vue'
import Sub from '@/views/demos/Subject.vue'
import axios from '@axios'
import { size } from '@floating-ui/dom'
import avatar1 from '@images/avatars/avatar-1.png'
import logo from '@images/logo.svg' // 로고 이미지 불러오기
import { computed, ref } from 'vue'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const imageUrls = ref([]) // 각 이미지의 URL을 저장하는 배열

const isprofile = ref(false)

const people = ref(false)
const switchValue = computed(() => people.value ? 'Y' : 'N')


const subValue = ref('카테고리')
const textValue = ref('')
const hashtagValue = ref('')
const imageUrlsValue = ref([])

const dialogVisibleUpdate = value => {
  emit('update:isDialogVisible', value)
}


const isButtonDisabled = computed(() => {
  return subValue.value === '카테고리' || !textValue.value && !hashtagValue.value && imageUrlsValue.value.length === 0 
})

const members = [
  {
    avatar: avatar1,
    name: '멋쟁이 승영이',
  },
]

// axios를 사용하여 데이터를 서버로 보내는 함수
const submitData = async () => {
  let formData = new FormData()
  formData.append('id', 'M')
  formData.append('content', textValue.value)
  formData.append('hashTag', hashtagValue.value)
  formData.append('type', subValue.value.value )
  formData.append('disclosureYN', switchValue.value)
  console.log(hashtagValue.value)

  console.log(imageUrlsValue.value)

  // 이미지 파일 추가
  imageUrlsValue.value.forEach((file, index) => {
    console.log(file)
    formData.append(`file${index}`, file)
  })

  try {
    const response = await axios.post('http://localhost:4000/bbs/Write.do', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // 응답 처리
    if (response.status === 200) {
      console.log('데이터 전송 성공')
    } else {
      console.log('데이터 전송 실패')
    }
  } catch (error) {
    console.error(`데이터 전송 실패: ${error}`)
  }
}

// 해시태그를 저장하는 ref
const hashtags = ref([])

// hashtagValue를 감시하도록 watch 함수를 설정
watch(hashtagValue, () => {
  const matches = hashtagValue.value.match(/#\s*\S+/g) || []

  hashtags.value = matches.map(hashtag => hashtag.replace(/\s/g, ''))
})

// 해시태그를 삭제하는 함수
const removeHashtag = hashtag => {
  const index = hashtags.value.indexOf(hashtag)
  if (index > -1) {
    hashtags.value.splice(index, 1)
    hashtagValue.value = hashtags.value.join(' ')
  }
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 1100"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 닫기 버튼 -->
    <VBtn
      icon
      @click="$emit('update:isDialogVisible', false)"
    >
      <VIcon>mdi-close</VIcon>
    </VBtn>
    <VCol cols="12">
      <!--
        <VImg
        :src="bg"
        style=" filter: contrast(200%);opacity: 0.5;"
        /> 
      -->

      <VCard>
        <VCardText>
          <div
            class="d-flex justify-center align-center"
            style="margin-top: 10px;"
          >
            <img :src="logo">  <!-- 로고 이미지 추가 -->
            <VBtn
              :disabled="isButtonDisabled"
              style="position: absolute; right: 40px;"
              @click="submitData"
            >
              글 등록
            </VBtn>
          </div>
          <VRow>
            <VCol cols="6">
              <VRow style=" margin-top: 20px;">
                <VCol cols="6">
                  <VListItem 
                    v-for="(member, index) in members" 
                    :key="index"
                  >
                    <template #prepend>
                      <VAvatar 
                        class="text pointer-cursor"
                        :image="member.avatar" 
                        @click="isprofile=true"
                      />
                    </template>
                    <VListItemTitle 
                      class="text pointer-cursor"
                      style="font-weight: bold;"
                      @click="isprofile=true"
                      @mouseover="size"  
                    >
                      {{ member.name }}
                    </VListItemTitle>
                  </VListItem>
                </VCol>
                <VCol
                  cols="4"
                  style=" margin-left: 85px;"
                >
                  <Sub v-model="subValue" />
                </VCol>
              </VRow>
              <VRow style=" margin-top: -10px;">
                <VCol cols="12">
                  <Text v-model="textValue" />
                </VCol>
              </VRow>
              <VRow style=" margin-top: -10px;">
                <VCol cols="12">
                  <VTextarea
                    v-model="hashtagValue"
                    rows="2"
                    placeholder="#해쉬태그"
                    no-resize
                  />

                  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
                    <span
                      v-for="(hashtag, index) in hashtags"
                      :key="index"
                      style="margin-right: 10px;"
                    >
                      {{ hashtag }} 
                      <button 
                        style="padding: 10px; margin-left: 5px; cursor: pointer;" 
                        @click="() => removeHashtag(hashtag)"
                      >
                        x
                      </button>
                    </span>
                  </div>
                </VCol>
              </VRow>
              <VRow style="margin-top: -10px;">
                <div
                  class="demo-space-x"
                  style="display: flex; width: 100%; justify-content: flex-end;"
                >
                  <VSwitch v-model="people" />
                  <h3
                    v-if="people"
                    style="margin-top: 17px; margin-left: 2px;"
                  >
                    공개
                  </h3>
                  <h3
                    v-if="!people"
                    style="margin-top: 17px; margin-left: 2px;"
                  >
                    비공개
                  </h3>
                </div>
              </VRow>
            </VCol>
            <VCol cols="6">
              <VCardItem>
                <It
                  v-model="imageUrlsValue"
                  :image-urls="imageUrls"
                />
              </VCardItem>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VDialog>
</template>

<style scoped>
.pointer-cursor {
  cursor: pointer;
}
</style>
