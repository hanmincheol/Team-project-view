<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import backgroundimg from '@images/pages/writing.jpg'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  editNumber: [String, Number],
})


const emit = defineEmits(['update:isDialogVisible'])


const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
]

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
              게시글 수정
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
            <VRow>
              <VCol
                cols="10"
                style=" margin-top: 5px;margin-left: 2%; font-weight: bolder;"
              >
                위치 추가
              </VCol>
              <VIcon
                size="35"
                icon="mdi-map-marker"
                class="mt-2"
                color="success"
              />
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
</style>
