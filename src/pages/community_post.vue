<script setup>
import Category from '@/pages/views/demos/forms/form-elements/select/category.vue'
import axios from '@axios'
import { size } from '@floating-ui/dom'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

const userProfileModal = ref(false)
const writingModal = ref(false)
const editingModal = ref(false)
const borderColor = ref('#ccc')
const viewPostPageModal = ref(false)
let q = ref('')

const state = reactive({
  items: [],
  avatar1: '', // avatar1에 대한 초기값을 설정해주세요.
})

//검색기능
const filteredItems = computed(() => {
  if (q.value) {
    return items.value.filter(item => item.title.includes(q.value))
  }
  
  return items.value
})

// axios를 사용하여 데이터를 받는 함수
const getData = async function() {

  try {
    const response = await axios.get('http://localhost:4000/bbs/List.do', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // 응답 처리
    if (response.status === 200) {
      console.log('데이터 받기 성공')
      state.items = response.data // 데이터 저장
      console.log(state.items[1].files)
      console.log(state.items[0])
    } else {
      console.log('데이터 전송 실패')
    }
  } catch (error) {
    console.error(`데이터 전송 실패: ${error}`)
  }
}

//삭제코드
const deleteItem = async bno => {
  try {
    const response = await axios.get(`http://localhost:4000/bbs/${bno}/Delete.do`)
    if (response.data === 1) {
      state.items = state.items.filter(item => item.bno !== bno) // items 배열에서 삭제된 항목 제거
    } else {
      console.log(response.data, "response.data")
      alert('삭제에 실패했습니다.')
    }
  } catch (error) {
    console.error(error)
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
  getData() // 컴포넌트가 마운트될 때 getData 함수 실행

  // 그 후 매 5초마다 getData 함수를 반복해서 실행
  //setInterval(getData, 5000)
  
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
                <VCol v-if="state.items.length > 0">
                  <!-- 게시물이 있을 때의 템플릿 -->
                  <VCol
                    v-for="(item, index) in state.items"
                    :key="index"
                    cols="12"
                  >
                    <VCard>
                      <!-- 게시물의 상단 유저 프로필/ 유저 닉네임 / MoreBtn :image="state.avatar1" -->
                      <VCol>
                        <VRow>
                          <VCol cols="1">
                            <VAvatar 
                              class="text-sm pointer-cursor"
                              :image="avatar1"
                              @click="userProfileModal=true"
                            />
                          </VCol>
                          <VCol cols="4">
                            <VCol cols="12">
                              <VCardSubtitle
                                class="text-sm pointer-cursor"
                                style="margin-left: -5%;"
                                @click="userProfileModal=true"
                              >
                                {{ item.id }}  <!-- 유저 닉네임 뿌려주기 -->
                              </VCardSubtitle>
                            </VCol>
                          </VCol>
                          <VCol cols="6" />
                          <VCol cols="1">
                            <VCol cols="1">
                              <VBtn
                                icon
                                variant="text"
                                size="small"
                                color="medium-emphasis"
                              >
                                <VIcon
                                  size="24"
                                  icon="mdi-dots-vertical"
                                />

                                <VMenu activator="parent">
                                  <VList>
                                    <VListItem @click="editingModal=true">
                                      <template #prepend>
                                        <VIcon icon="mdi-comment-edit-outline" />
                                      </template>
                                      <VListItemTitle>수정하기</VListItemTitle>
                                    </VListItem>

                                    <VListItem @click="deleteItem(item.bno)">
                                      <template #prepend>
                                        <VIcon icon="mdi-delete-outline" />
                                      </template>
                                      <VListItemTitle>삭제하기</VListItemTitle>
                                    </VListItem>
                                    <VListItem @click="editingModal=true">
                                      <template #prepend>
                                        <VIcon icon="mdi-account-alert" />
                                      </template>
                                      <VListItemTitle>신고하기</VListItemTitle>
                                    </VListItem>
                                  </VList>
                                </VMenu>
                              </VBtn>
                            </VCol>
                          </VCol>
                        </VRow>
                      </VCol>
                      <VCarousel show-arrows-on-hover>
                        <VCarouselItem
                          v-for="(image, i) in item.files" 
                          :key="i"
                        >
                          <VImg
                            :src="image"
                            class="pointer-cursor"
                            @click="viewPostPageModal=true"
                          />
                        </VCarouselItem>
                      </VCarousel>

                      <VCardItem>
                        <VCardTitle>{{ item.content }}  </VCardTitle> 
                      </VCardItem>

                      <VCardText>
                        여기엔 댓글 넣을거지롱
                      </VCardText>
                    </VCard>
                  </VCol> 
                </VCol>
              </VCol>
            </VCol>
          </VCardText>
          <VCol
            v-if="state.items.length <= 0"
            class="d-flex justify-center align-center"
            style="height: 300px;"
          >
            <!-- 게시물이 없을 때의 템플릿 -->
            <VCol
              class="d-flex flex-column align-center justify-center"
              style="height: 100%;"
            >
              <VCardTitle class="headline font-weight-bold">
                등록된 게시물이 없습니다
              </VCardTitle>
              <VCardText>새로운 게시물을 작성해보세요!</VCardText>
            </VCol>
          </VCol>
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
                친구요청
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
    <Editing v-model:isDialogVisible="editingModal" />
    <ViewPostPage v-model:isDialogVisible="viewPostPageModal" />
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
