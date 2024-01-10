<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}
const isInvitedUpdate = (e) => {
  const clickedBtn = e.target;
  const createdDiv = document.createElement('div'); //초대 완료한 사람을 뿌려줄 div태그
  createdDiv.textContent = 'invited';
  if(clickedBtn.tagName=='SPAN'){
    clickedBtn.parentNode.parentNode.append(createdDiv);
    clickedBtn.parentNode.style.display = "none";
  }
  else {
    clickedBtn.parentNode.append(createdDiv);
    clickedBtn.style.display = "none";
  }
}
const membersList = [
  {
    avatar: avatar1,
    name: 'Lester Palmer',
    email: 'jerrod98@gmail.com',
    permission: 'Can Edit',
    isInvited: false, //초대하기를 눌렀는지 여부를 체크하는 변수
  },
  {
    avatar: avatar2,
    name: 'Mattie Blair',
    email: 'prudence.boehm@yahoo.com',
    permission: 'Owner',
    isInvited: false, 
  },
  {
    avatar: avatar3,
    name: 'Marvin Wheeler',
    email: 'rumet@jujpejah.net',
    permission: 'Can Comment',
    isInvited: false, 
  },
  {
    avatar: avatar4,
    name: 'Nannie Ford',
    email: 'negza@nuv.io',
    permission: 'Can View',
    isInvited: false, 
  },
  {
    avatar: avatar5,
    name: 'Julian Murphy',
    email: 'lunebame@umdomgu.net',
    permission: 'Can Edit',
    isInvited: false, 
  },
  {
    avatar: avatar6,
    name: 'Sophie Gilbert',
    email: 'ha@sugit.gov',
    permission: 'Can View',
    isInvited: false, 
  },
  {
    avatar: avatar7,
    name: 'Chris Watkins',
    email: 'zokap@mak.org',
    permission: 'Can Comment',
    isInvited: false, 
  },
  {
    avatar: avatar8,
    name: 'Adelaide Nichols',
    email: 'ujinomu@jigo.com',
    permission: 'Can Edit',
    isInvited: false, 
  },
]
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="900"
    @update:model-value="dialogVisibleUpdate"
  >
    <VCard class="share-project-dialog pa-5 pa-sm-8">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="emit('update:isDialogVisible', false)"
      />

      <VCardText>
        <h5 class="text-h5 text-center mb-3">
          친구 초대하기
        </h5>
        <br/>
        <VAutocomplete
          :items="membersList"
          item-title="name"
          item-value="name"
          placeholder="초대할 친구를 검색하세요"
          density="compact"
        >
          <template #item="{ props: listItemProp, item }">
            <VListItem v-bind="listItemProp">
              <template #prepend>
                <VAvatar
                  :image="item.raw.avatar"
                  size="30"
                />
              </template>
            </VListItem>
          </template>
        </VAutocomplete>

        <h6 class="text-h6 mb-4 mt-8">
          8 Members
        </h6>

        <VList class="card-list">
          <VListItem
            v-for="member in membersList"
            :key="member.name"
          >
            <template #prepend>
              <VAvatar :image="member.avatar" />
            </template>

            <VListItemTitle class="text-sm">
              {{ member.name }}
            </VListItemTitle>

            <VListItemSubtitle>
              {{ member.email }}
            </VListItemSubtitle>
            <!--초대 버튼-->
            <template #append>
              <VBtn id="myButton" @click = "isInvitedUpdate" >
                invite
              </VBtn>
            </template>
          </VListItem>
        </VList>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.share-project-dialog {
  .card-list {
    --v-card-list-gap: 1rem;
  }
}
</style>
