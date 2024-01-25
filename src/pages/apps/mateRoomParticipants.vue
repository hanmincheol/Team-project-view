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

const isdropout = member => {
  console.log('강퇴할 유저:', member.name)
  member.dropout = true

  const index = membersList.indexOf(member)
  if (index > -1) {
    membersList.splice(index, 1)
    console.log(membersList)
  }
}

const membersList = [
  {
    avatar: avatar1,
    name: 'Lester Palmer',
    email: 'jerrod98@gmail.com',
    permission: 'Can Edit',
    dropout: false, //초대하기를 눌렀는지 여부를 체크하는 변수
  },
  {
    avatar: avatar2,
    name: 'Mattie Blair',
    email: 'prudence.boehm@yahoo.com',
    permission: 'Owner',
    dropout: false, 
  },
  {
    avatar: avatar3,
    name: 'Marvin Wheeler',
    email: 'rumet@jujpejah.net',
    permission: 'Can Comment',
    dropout: false, 
  },
  {
    avatar: avatar4,
    name: 'Nannie Ford',
    email: 'negza@nuv.io',
    permission: 'Can View',
    dropout: false, 
  },
  {
    avatar: avatar5,
    name: 'Julian Murphy',
    email: 'lunebame@umdomgu.net',
    permission: 'Can Edit',
    dropout: false, 
  },
  {
    avatar: avatar6,
    name: 'Sophie Gilbert',
    email: 'ha@sugit.gov',
    permission: 'Can View',
    dropout: false, 
  },
  {
    avatar: avatar7,
    name: 'Chris Watkins',
    email: 'zokap@mak.org',
    permission: 'Can Comment',
    dropout: false, 
  },
  {
    avatar: avatar8,
    name: 'Adelaide Nichols',
    email: 'ujinomu@jigo.com',
    permission: 'Can Edit',
    dropout: false, 
  },
]
</script>

<template>
  <VCard class="share-project-dialog pa-5 pa-sm-8">
    <VCardText>
      <h5 class="text-h5 text-center mb-3">
        참여자
      </h5>
      <br>
      <VList class="card-list">
        <VListItem
          v-for="member in membersList"
          :key="member.name"
          :v-if="!member.dropout"
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
          <!-- 초대 버튼 -->
          <template #append>
            <VBtn
              id="myButton"
              @click="isdropout(member)"
            >
              강퇴하기
            </VBtn>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.share-project-dialog {
  .card-list {
    --v-card-list-gap: 1rem;
  }
}
</style>
