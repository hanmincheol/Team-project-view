<script setup>
import ShareProjectDialogTemp from '@/components/dialogs/ShareProjectDialogTemp.vue';
import chat from '@/pages/apps/mateChat.vue';
import VColmateRoomParticipants from '@/pages/apps/mateRoomParticipants.vue';
import axios from 'axios';

const isShareProjectDialogVisible = ref(false)
const chatflag = ref(false) // 채팅방 열기&닫기 flag
const openRoomYN = ref(true) // 방공개여부
const capitalizedLabel = label => {
  const convertLabelText = label.toString()
  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}

const RoomList = [
    {
        RoomNumber : 'MateRoom01',
    },
    {
        RoomNumber : 'MateRoom02',
    },
    {
        RoomNumber : 'MateRoom03',
    },
]

function togglechatFlag() {
    chatflag.value = !chatflag.value;
}

const startCrawling = () => {
  const matearea = "경기"; // 지역명 변수
  const matemonth = 5; // 월별 변수
  const matedate = 21; // 일자 변수
  
  axios.post('http://127.0.0.1:5000/areaCrawling', { matearea, matemonth, matedate})
    .then(response => {
        // 서버로부터의 응답 처리
        console.log(JSON.parse(response.data));
    })
    .catch(error => {
      // 에러 처리
      console.error(error);
    });
}
</script>



<template>
    <VCard>
        <VRow>
            <VCol cols="12" :md="chatflag ? '7' : '12'" style="display: flex; flex-direction: column;">
                <VCol class="d-flex">
                    <VCol md="8">
                        <v-btn @click="isShareProjectDialogVisible = !isShareProjectDialogVisible">Invite</v-btn>
                        <ShareProjectDialogTemp v-model:isDialogVisible="isShareProjectDialogVisible"/>
                        <VBtn style="margin-left:10px;" @click="startCrawling">장소 조회</VBtn>
                    </VCol>                        
                    <!-- 아래 방공개는 방장에게만 보여주기 / 조건 추가 필요 -->
                    <VCol md="4" class="d-flex justify-end align-center">
                        <strong style="margin-right: 1em;">방 공개 여부</strong>
                        <VSwitch
                            v-model="openRoomYN"
                            :label="areaSet = capitalizedLabel(openRoomYN) === 'True' ? '공개' : '비공개'"
                            class="mr-2"
                        />
                    </VCol>
                </VCol>
                <VCol class="d-flex">
                    <VCol md="10">
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
                                        <VAvatar
                                            size="30"
                                        />
                                    </template>
                                </VListItem>
                            </template>
                        </VAutocomplete>
                    </VCol>
                    <VCol md="2" class="d-flex justify-end">
                        <VBtn>참가</VBtn>
                    </VCol>
                </VCol>
                <VCol class="d-flex">
                    <!-- <VCol md="10">3. 채팅방 열기</VCol> -->
                    <VCol md="2">
                        <VBtn @click="togglechatFlag">
                            <span v-if="!chatflag">채팅방 열기</span>
                            <span v-else>채팅방 닫기</span>
                        </VBtn>
                    </VCol>
                </VCol>
                <VCol>
                    <VColmateRoomParticipants/>
                </VCol>
            </VCol>
            <VCol v-if="chatflag" cols="12" md="5" style="display: flex; flex-direction: column;">
                <chat/>                
            </VCol>
        </VRow>
    </VCard>
</template>