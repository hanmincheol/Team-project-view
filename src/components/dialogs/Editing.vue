<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'

import backgroundimg from '@images/pages/writing.jpg'
import { ref } from 'vue'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const hashtags = ref([])
const hashtagValue = ref('')

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
]

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

const switch2 = ref('Show')
</script>


<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 1100"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 닫기 버튼 -->
    <VCol cols="12">
      <VCard>
        <VRow>
          <VCol>
            <VBtn
              icon
              @click="$emit('update:isDialogVisible', false)"
            >
              <VIcon>mdi-close</VIcon>
            </VBtn>
          </VCol>
          <VCol cols="8">
            <VCol style=" font-size: 20px; font-weight: bold;text-align: center;">
              정보 수정
            </VCol>
          </VCol>
          <VCol cols="2">
            <VSwitch
              v-model="switch2"
              :label="switch2.toString()"
              true-value="Show"
              false-value="Hide"
            />
          </VCol>
          <VCol>
            <VBtn>
              수정
            </VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VImg :src="backgroundimg" />
          <VCol cols="6">
            <VRow>
              <VCol>
                <VRow style="margin-top: 1%;">
                  <VCol cols="1">
                    <VAvatar 
                      class="text-sm pointer-cursor"
                      :image="avatar1"
                      @click="userProfileModal=true"
                    />
                  </VCol>
                  <VCol cols="">
                    <VCol cols="12">
                      <VCardSubtitle
                        class="text-sm pointer-cursor"
                        style="margin-left: -5%;"
                        @click="userProfileModal=true"
                      >
                        유저 닉네임 뿌려주기
                      </VCardSubtitle>
                    </VCol>
                  </VCol>
                  <VSpacer />
                  <VCol cols="2">
                    <MoreBtn />
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
            <VCol cols="12">
              <VTextarea 
                label="내용" 
                rows="10"
                style="height: 250px; margin-right: 2%;"
                class="disabled-textarea"
              />
            </VCol>
            <VCol>
              <VBtn
                icon="mdi-heart-outline"
                variant="text"
                color="success"
              />
              <VBtn
                icon="mdi-chat-outline"
                variant="text"
                color="success"
              />
              <VBtn
                icon="mdi-send"
                variant="text"
                color="success"
              />
              <VBtn
                icon="mdi-bookmark-outline"
                variant="text"
                color="success"
              />
            </VCol>
            
            
            <VRow>
              <VCol cols="9">
                <VTextarea 
                  label="댓글달기" 
                  rows="1"
                  style="height: 15px; border: none;"
                />
              </VCol>
              <VCol cols="1">
                <VBtn size="large">
                  게시
                </VBtn>
              </VCol>
            </VRow>
            <VRow style=" margin-top: 5; margin-right: 2%; margin-bottom: 0;">
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
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VDialog>
</template>
                    


<style scoped>
.pointer-cursor {
  cursor: pointer;
}
</style>

<style>
.disabled-textarea {
  color: black; /* 텍스트 색상을 검정색으로 설정합니다. */
}

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
