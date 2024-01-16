<script setup>
import Category from '@/pages/views/demos/forms/form-elements/select/category.vue'
import { size } from '@floating-ui/dom'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const userProfileModal = ref(false)
const writingModal = ref(false)
const borderColor = ref('#ccc')
let q = ref('')

//검색기능
const filteredItems = computed(() => {
  if (q.value) {
    return items.value.filter(item => item.title.includes(q.value))
  }
  
  return items.value
})

const images = [
  {
    src: [avatar1, avatar2, avatar3, avatar4],
  },

]

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


//스크롤 이벤트 리스터 추가 - 화면 하단에 스크롤 도착 시 loadMore()함수 호출
const scrollTimeout = ref(null)

const handleScroll = () => {
  if(scrollTimeout.value !== null) 
    clearTimeout(scrollTimeout.value)  

  scrollTimeout.value = setTimeout(function() {
    // 스크롤이 페이지 하단에서 100px 이내로 가까워졌을 때 loadMore 함수 호출
    if ((window.innerHeight + document.documentElement.scrollTop) >= (document.documentElement.offsetHeight - 100)) {
      loadMore()
    }
  }, 150)
}

//이벤트 리스터 추가 
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

//이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

//게시글 반복할 배열의 길이 설정 + 무한 스크롤로 사용하는 배열 저장용

const items = ref(Array.from({ length: 5 }))

// 스크롤 하단에 내렸을때 호출되는 함수 정리

const loadMore = () => {
  //moreItems로 새로 추가할 배열의 길이 설정

  const moreItems = Array.from({ length: 5 })
  
  //items 배열에 moreItems 배열 추가해서 화면에 표시되는 게시글 추가

  items.value = items.value.concat(moreItems)
  console.log("leadMore..")
}
</script>


<template>
  <section>
    <VRow style="margin-top: -50px;">
      <VCol cols="8">
        <VCard
          flat
          :max-width="auto"
          class="mt-12 mt-sm- pa-0"
        >
          <VCardText>
            <VRow
              no-gutters
              style=" overflow: hidden;max-height: 90px;"
            >
              <VCol
                v-for="member in membersList"
                :key="member.name"
                cols="auto"
                class="ma-2"
              >
                <VListItem>
                  <VListItemContent class="d-flex flex-column align-center text-center">
                    <VAvatar 
                      class="text-sm pointer-cursor"
                      :image="member.avatar" 
                      @click="userProfileModal=true"
                    />

                    <VListItemTitle 
                      class="text-sm pointer-cursor"
                      @click="userProfileModal=true"
                      @mouseover="size"  
                    >
                      {{ member.name }}
                    </VListItemTitle>
                  </VListItemContent>
                </VListItem>
              </VCol>
            </VRow>

            
            <VCol>
              <!-- 카테고리 추가 -->
              <VRow>
                <VCol
                  cols="5"
                  style="margin-top: -15px;"
                >
                  <Category />
                </VCol>
                <VCol
                  cols="5"
                  style="margin-top: -15px;"
                >
                  <VTextField
                    v-model="q"
                    class="search px-1 flex-grow-1"
                    placeholder="Search"
                    :style="{ border: `1px solid ${borderColor}`, borderRadius: '5px' }"  
                    @focus="borderColor = '#28a745'"  
                    @blur="borderColor = '#ccc'" 
                  >
                    <!-- 아이콘에 클릭 이벤트 추가 -->
                    <template #append>
                      <VBtn
                        icon
                        style="margin-top: -8px;"
                        @click="searchItems"
                      >
                        <VIcon>mdi-magnify</VIcon>
                      </VBtn>
                    </template>
                  </VTextField>
                </VCol>
                <VCol cols="2">
                  <VBtn 
                    style=" margin-top: -15px;float: inline-end;"
                    size="x-large"
                    @click="writingModal=true"
                  >
                    글 등록
                  </VBtn>
                </VCol>
              </VRow>
            </VCol>
            <VCol>
              <VCol>
                <!-- 게시물 작성 공간 -->
                <VCol
                  v-for="(item, index) in items"
                  :key="index"
                  cols="12"
                >
                  <VCard>
                    <VCarousel show-arrows-on-hover>
                      <VCarouselItem
                        v-for="(image, i) in images[0].src" 
                        :key="i"
                      >
                        <VImg :src="image" />
                      </VCarouselItem>
                    </VCarousel>

                    <VCardItem>
                      <VCardTitle>멋쟁이 승영이</VCardTitle>
                    </VCardItem>

                    <VCardText>
                      나는 자랑스러운 3조라네 하하
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
    <Writing v-model:isDialogVisible="writingModal" />
  </section>
</template>

<style scoped>
.pointer-cursor {
  cursor: pointer;
}
</style>

<style lang="scss">
@use "@styles/variables/_vuetify.scss";
@use "@core/scss/base/_mixins.scss";

.search {
  .v-field__outline {
    display: none;
  }
}
</style>
