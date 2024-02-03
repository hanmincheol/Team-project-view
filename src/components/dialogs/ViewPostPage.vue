<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import backgroundimg from '@images/pages/writing.jpg'
import { ref } from 'vue';
import axios from '@axios'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  postToEdit: {
    type: Object,
    default: () => ({}),
  },
  comments: {
    type: Array,
    required: true,
  },
  bno: {
    type: Number,
    required: true,
  },
  openUserProfileModal: {
    type: Function,
    required: true
  }
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
  <section>
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
        <VCard
          width="90rem"
          height="150%"
          style="margin: auto;"
        >
          <VRow>
            <VCol
              cols="6"
              style="margin: auto;"
            >
              <VCol
                v-if="postToEdit.files && postToEdit.files.length ==1"
                class="transparent-carousel"
                show-arrows-on-hover
                color="success"
              >
                <VCol
                  v-for="(img, index) in postToEdit.files"
                  :key="index"
                >
                  <VImg
                    :src="img"
                    style="margin-top: 15%;"
                  />
                </VCol>
              </VCol>
              <VImg
                v-if="postToEdit.files && postToEdit.files.length ==0"
                :src="backgroundimg"
              />
              <VCarousel
                v-if="postToEdit.files && postToEdit.files.length >=2"
                class="transparent-carousel"
                show-arrows-on-hover
                color="success"
                style="margin-top: 15%;"
              >
                <VCarouselItem
                  v-for="(img, index) in postToEdit.files"
                  :key="index"
                >
                  <VImg :src="img" />
                </VCarouselItem>
              </VCarousel>
            </VCol>
            <VCol cols="6">
              <VRow>
                <VCol>
                  <VRow style="margin-top: 1%;">
                    <VCol cols="1">
                      <!-- image도 대표사진 받아와서 뿌려야합니다 -->
                      <VAvatar 
                        class="text-sm pointer-cursor"
                        :image="postToEdit.profilepath" 
                        @click="userProfileModal(postToEdit.id)"
                      />
                    </VCol>
                    <VCol cols="6">
                      <VCol cols="12">
                        <VCardSubtitle
                          class="text-sm pointer-cursor"
                          :image="avatar1" 
                          @click="userProfileModal=true"
                        >
                          {{ postToEdit.id }} <!-- 유저 닉네임 뿌려주기 -->
                          <!-- {{bno}} -->
                        </VCardSubtitle>
                      </VCol>
                    </VCol>
                  </VRow>
                </VCol>
              </VRow>
              <!-- 여기는 if문으로 데이터 있는 만큼 가져와야 하는 부분이고요 -->
              <!-- 많아지면 여기도 무한스크롤을 적용해야 할 겁니다~ 근데 여긴 윈도우 창이 아니라 어떤 이벤트를 걸어야할지 감도 안오네요 -->
              <VRow>
                <VCol cols="1">
                  <!-- <VAvatar 
                    class="text-sm pointer-cursor"
                    :image="avatar1"
                    @click="userProfileModal=true"
                  /> -->
                </VCol>
                <VCol
                  cols="10"
                  style="height: 400px; margin-left: 10px;"
                >
                  {{ postToEdit.content }}
                  <br>{{ postToEdit.hashTag }}
                  <br>
                  <VDivider />
                  <br>
                  <div style="font-size: 14px;width:100%;height:310px;overflow: auto;">
                    <div v-if="comments">
                      <div
                        v-for="comment in comments"
                        :key="comment.C_NO"
                      >
                        <div
                          v-if="comment.LEVEL == 1"
                          style=" display: flex; align-items: center; justify-content: space-between;border-bottom: dotted 1px gray;"
                        > 
                          <div>
                            <VAvatar 
                              :image="comment.PRO_FILEPATH"
                              style="margin: 2px;"
                            />
                            <span style="margin-right: 10px;font-size: 12px;">{{ comment.ID }}</span> <strong>{{ comment.CCOMMENT }}</strong>  
                          </div>
                          <VBtn
                            icon="mdi-heart-outline"
                            variant="text"
                            color="success"
                          />
                        </div>
                        <div
                          v-else
                          :style="{ marginLeft: (comment.LEVEL - 1) * 20 + 'px', 'border-bottom': 'dotted 1px gray', display: 'flex', 'justify-content': 'space-between', 'align-items': 'center'}"
                        > <!-- 'background-color': 'rgba(255, 50, 0, 0.3)' -->                                                   
                          <div>
                            <VIcon
                              end
                              icon="mdi-arrow-right-bottom"
                              class="flip-in-rtl"
                            />
                            <VAvatar 
                              :image="comment.PRO_FILEPATH"
                              style="margin: 2px  ;"
                            />
                            <span style="margin-right: 10px;font-size: 12px;">{{ comment.ID }}</span><strong>{{ comment.CCOMMENT }}</strong>
                          </div>
                          <VBtn
                            icon="mdi-heart-outline"
                            variant="text"
                            color="success"
                          />
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      작성된 댓글이 없습니다.
                    </div>
                  </div>
                  <!--
                    <li>
                    {{comments[0].C_NO}} {{comments[0].ID}} {{comments[0].CCOMMENT}}
                    </li> 
                  -->
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
                <VCol cols="9">
                  <VTextarea 
                    label="댓글달기" 
                    rows="1"
                    style="height: 20px; border: none;"
                    variant="underlined"
                    prepend-icon="mdi-emoticon"
                    no-resize
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
  </section>
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

.active-slide {
  color: success;
}

.transparent-carousel .v-carousel__controls {
  background-color: transparent;
}
</style>
