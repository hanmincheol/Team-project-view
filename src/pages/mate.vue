<script setup>
import ShareProjectDialogTemp from '@/components/dialogs/ShareProjectDialogTemp.vue'
import Chat from '@/pages/apps/mateChat.vue'
import VColmateRoomParticipants from '@/pages/apps/mateRoomParticipants.vue'
import { ref } from 'vue'

const isShareProjectDialogVisible = ref(false)
const chatflag = ref(false) // 채팅방 열기&닫기 flag
const openRoomYN = ref(true) // 방공개여부

const capitalizedLabel = label => {
  const convertLabelText = label.toString()
  
  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}

const isareaCrawlingResultDialogVisible = ref(false)

const RoomList = [
  {
    RoomNumber: 'MateRoom01',
  },
  {
    RoomNumber: 'MateRoom02',
  },
  {
    RoomNumber: 'MateRoom03',
  },
]

function togglechatFlag() {
  chatflag.value = !chatflag.value
}
</script>



<template>
  <section>
    <VCard>
      <VCol>
        <VRow>
          <VCol
            cols="12"
            :md="chatflag ? '7' : '12'"
          >
            <VCol>
              <VRow>
                <VCol cols="7">
                  <VBtn @click="isShareProjectDialogVisible = !isShareProjectDialogVisible">
                    Invite
                  </VBtn>
                  <ShareProjectDialogTemp v-model:isDialogVisible="isShareProjectDialogVisible" />
                  <VBtn
                    :style="{'margin-left':'10px'}"
                    @click="isareaCrawlingResultDialogVisible = !isareaCrawlingResultDialogVisible;"
                  >
                    장소 찾기
                  </VBtn>                        
                  <AreaCrawlingResult v-model:isDialogVisible="isareaCrawlingResultDialogVisible" />
                </VCol>                        
                <!-- 아래 방공개는 방장에게만 보여주기 / 조건 추가 필요 -->
                <VCol
                  cols="5"
                  class="d-flex justify-end align-center"
                >
                  <strong style="margin-right: 1em;">방 공개 여부</strong>
                  <VSwitch
                    v-model="openRoomYN"
                    :label="areaSet = capitalizedLabel(openRoomYN) === 'True' ? '공개' : '비공개'"
                  />
                </VCol>
              </VRow>
            </VCol>
            <VCol class="d-flex">
              <VCol cols="10">
                <VAutocomplete
                  :items="RoomList"
                  item-title="RoomNumber"
                  item-value="RoomNumber"
                  placeholder="방 번호를 검색하세요"
                  density="compact"
                >
                  <template #item="{ props: listItemProp, item }">
                    <VListItem v-bind="listItemProp">
                      <template #prepend>
                        <VAvatar size="30" />
                      </template>
                    </VListItem>
                  </template>
                </VAutocomplete>
              </VCol>
              <VCol
                cols="2"
                class="d-flex justify-end"
              >
                <VBtn>참가</VBtn>
              </VCol>
            </VCol>
            <!-- <VCol cols="10">3. 채팅방 열기</VCol> -->
            <VCol cols="2">
              <VBtn 
                size="large"
                @click="togglechatFlag"
              >
                <span v-if="!chatflag">채팅방 열기</span>
                <span v-else>채팅방 닫기</span>
              </VBtn>
            </VCol>
            <VCol>
              <VColmateRoomParticipants />
            </VCol>
          </VCol>
          
          <VCol
            v-if="chatflag"
            cols="5"
          >
            <Chat />
          </VCol>
        </VRow>
      </VCol>
    </VCard>
  </section>
</template>

