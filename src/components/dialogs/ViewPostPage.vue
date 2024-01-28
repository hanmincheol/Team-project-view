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
  postToEdit: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
]
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
        <VRow>
          <VCol cols="6">
            <VCarousel
              v-if="postToEdit.files && postToEdit.files.length"
              show-arrows-on-hover
            >
              <VCarouselItem
                v-for="(img, index) in postToEdit.files"
                :key="index"
              >
                <VImg :src="img" />
              </VCarouselItem>
            </VCarousel>
            <VImg
              v-else
              :src="backgroundimg"
            />
          </VCol>
          <VCol cols="6">
            <VRow>
              <VCol>
                <VRow style="margin-top: 1%;">
                  <VCol cols="1">
                    <!-- image도 대표사진 받아와서 뿌려야합니다 -->
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
                        {{ postToEdit.id }}  <!-- 유저 닉네임 뿌려주기 -->
                      </VCardSubtitle>
                    </VCol>
                  </VCol>
                  <VSpacer />
                </VRow>
              </VCol>
            </VRow>
            <!-- 여기는 if문으로 데이터 있는 만큼 가져와야 하는 부분이고요 -->
            <!-- 많아지면 여기도 무한스크롤을 적용해야 할 겁니다~ 근데 여긴 윈도우 창이 아니라 어떤 이벤트를 걸어야할지 감도 안오네요 -->
            <VRow>
              <VCol cols="1">
                <VAvatar 
                  class="text-sm pointer-cursor"
                  :image="avatar1"
                  @click="userProfileModal=true"
                />
              </VCol>
              <VCol
                cols="10"
                style="height: 400px; margin-left: 10px;"
              >
                여기는 글씨 크기만큼 뿌려주는 공간이 될 거 같음 아아아아아 이렇게 말이죠 엔터나 그런것도 처리해서 
                <br> 이렇게 처리를 해야할 거 같네요
                <br> 여기도 해시태그 받아와서 뿌려야 줘야! 합니다! 
                <br>#해시태그 #뿌려주세요
              </VCol>
            </VRow>
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
              <VCol
                cols="2"
                class="v-avatar-group"
                style="margin-left: 2%;"
              >
                <VAvatar
                  v-for="(avatar, index) in avatars"
                  :key="index"
                  :image="avatar"
                  size="30"
                />
              </VCol>
              <VCol class="font-weight-medium">
                멋쟁이 승녕님 외 18명이 좋아합니다
              </VCol>
            </VRow>
            <VRow style="margin-bottom: 5px;">
              <VCol cols="1">
                <VBtn
                  icon="mdi-emoticon"
                  variant="text"
                  size="x-large"
                  style="margin-left: 2%;"
                />
              </VCol>
              <VCol cols="8">
                <VTextarea 
                  label="댓글달기" 
                  rows="1"
                  style="height: 20px; border: none;"
                />
              </VCol>
              <VCol cols="1">
                <VBtn size="large">
                  게시
                </VBtn>
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
</style>
