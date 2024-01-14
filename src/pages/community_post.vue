<script setup>
import SearchBar from '@/layouts/components/SearchBarCommunity.vue'
import { size } from '@floating-ui/dom'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'
import pages1 from '@images/pages/1.png'
import { onBeforeUnmount, onMounted, ref } from 'vue'


const userProfileModal = ref(false)

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

//게시글 반복할 배열의 길이 설정 + 무한 스크롤로 사용하는 배열 저장용

const items = ref(Array.from({ length: 4 }))

// 스크롤 하단에 내렸을때 호출되는 함수 정리

const loadMore = () => {
  //moreItems로 새로 추가할 배열의 길이 설정

  const moreItems = Array.from({ length: 3 })
  
  //items 배열에 moreItems 배열 추가해서 화면에 표시되는 게시글 추가

  items.value = items.value.concat(moreItems)
  console.log('Loading more items...')
}


//스크롤 이벤트 리스터 추가 - 화면 하단에 스크롤 도착 시 loadMore()함수 호출
const handleScroll = () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    loadMore()
  }
}

//이벤트 리스터 추가 
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

//이벤트 리스너 제거
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<template>
  <section>
    <VRow>
      <VCol cols="8">
        <VCard
          flat
          :max-width="auto"
          class="mt-12 mt-sm- pa-0"
        >
          <VCardText>
            <VRow>
              <!-- 카테고리 버튼 추가 -->
              <VBtn>
                카테고리 
              </VBtn>
              <SearchBar />
            </VRow>
            <VCol>
              <VCol>
                <!-- 게시물 작성 공간 -->
                <VCol
                  v-for="(item, index) in items"
                  :key="index"
                  cols="12"
                >
                  <VCard>
                    <VImg :src="pages1" />

                    <VCardItem>
                      <VCardTitle>Influencing The Influencer</VCardTitle>
                    </VCardItem>

                    <VCardText>
                      Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago.
                    </VCardText>
                  </VCard>
                </VCol> 
              </VCol>
            </VCol>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="4">
        <VCol class="card-list mt-12 mt-sm- pa-0">
          <!-- 친구 리스트 공간 -->
          <VListItem
            v-for="member in membersList"
            :key="member.name"
          >
            <template #prepend>
              <VAvatar 
                class="text-sm pointer-cursor"
                :image="member.avatar" 
                @click="userProfileModal=true"
              />
            </template>

            <VListItemTitle 
              class="text-sm pointer-cursor"
              @click="userProfileModal=true"
              @mouseover="size"  
            >
              {{ member.name }}
            </VListItemTitle>
            <!-- 친구 추가 버튼 -->
            <template #append>
              <VBtn
                id="myButton"
                width="40"
                @click="isInvitedUpdate"
              >
                친구추가
              </VBtn>
              <!-- 구독 버튼 -->
              <VBtn
                id="myButton"
                width="40"
                style="margin-left: 5px;"
                @click="isInvitedUpdate"
              >
                구독
              </VBtn>
            </template>
          </VListItem>
        </VCol>
      </VCol>
    </VRow>
    <UserProfileCommunity v-model:isDialogVisible="userProfileModal" />
  </section>
</template>

<style scoped>
.pointer-cursor {
  cursor: pointer;
}
</style>

