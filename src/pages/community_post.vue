<script setup>
import InviteFriendConfirmModal from '@/pages/community/InviteFriendConfirmModal.vue'
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
import defaultImg from '@images/userProfile/default.png'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

const userProfileModal = ref(false)
const writingModal = ref(false)
const editingModal = ref(false)
const borderColor = ref('#ccc')
const viewPostPageModal = ref(false)
let postToEdit = ref("")

const isInvited = {}
const isSubscribed = {}

let q = ref('')
const users = ref([])
const usersView = ref([])

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
const bbsuserprofile = ref();
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

      const tempUserKeys = []
      for(var i=0; i<state.items.length; i++){
        tempUserKeys[i] = state.items[i].id
      }

      const tempUserKeysSet = new Set(tempUserKeys) //중복 아이디 제거

      const temp = [...tempUserKeysSet] //ids

      /*
      temp의 앞에 현재 서비스를 이용 중인 유저의 아이디가 들어가야 함.
      뿌려주는 게시글 작성자들의 목록을 불러옴.
      */
      temp.unshift('OSH')
      console.log(temp)
      axios.post("http://localhost:4000/bbs/userProfile", JSON.stringify({
        ids: temp,
      }), { headers: { 'Content-Type': 'application/json' } })
        .then(resp=>{
          console.log('요청받은 값:', resp.data);
          users.value = resp.data
          for (const i of users.value){
            console.log('유저 아이디:', i.id ,'\n유저 프로필:', i.profilePath);
            console.log('체크',i);
          }
          users.value.forEach(ele=>{
            if(ele.isFriend != 0 || ele.isSubTo != 0) {
              console.log(ele)
              console.log(typeof usersView.value)
              usersView.value.push(ele)
            }
            console.log(usersView.value)
            
            console.log(usersView)
            for(const id in usersView){
              console.log(usersView[id])
              if(usersView[id]['isFriend']==0) {
                isInvited[usersView[id]['id']] = ref(false)
              }
              else if(usersView[id]['isFriend']!=0) {
                isInvited[usersView[id]['id']] = ref(true)
              }
              if(usersView[id]['isSubTo']==0) {
                isSubscribed[usersView[id]['id']] = ref(true)
              }
              else if(usersView[id]['isSubTo']!=0) {
                isSubscribed[usersView[id]['id']] = ref(false)
              }
              console.log(isInvited)
            }

          })
        })
        .catch(err=>console.log(err))

      console.log(state.items[1].files)
      console.log('데이터 체크',response.data);
    } else {
      console.log('데이터 전송 실패')
    }
  } catch (error) {
    console.error(`데이터 전송 실패: ${error}`)
  }

}

const getUserAvatar = (userId) => {
  const user = users.value.find(user => user.id === userId);
  return user ? user.profilePath : defaultImg;
}

//////////////////////////////////////
/* 댓글 */
let group = ref([]);
const statecomm = ref({
  comment:[]
})

//삭제코드
const deleteItem = async bno => {
  try {
    const response = await axios.get(`http://localhost:4000/bbs/${bno}/Delete.do`)
    if (response.data === 1) {
      const bnoInt = parseInt(bno) // bno를 숫자로 변환

      state.items = state.items.filter(item => item.bno !== bnoInt) // items 배열에서 삭제된 항목 제거
    } else {
      console.log(response.data, "response.data")
      alert('삭제에 실패했습니다.')
    }
  } catch (error) {
    console.error(error)
  }
}

// 글 수정 코드
const submitEdit = async bno => {
  try {
    const response = await axios.get('http://localhost:4000/bbs/ViewOne.do', { params: { bno: bno } })

    if (response.status === 200) {
      console.log('글 번호 전송 성공')
      console.log(response.data, "response.data")

      // 서버로부터 받은 데이터를 자식 컴포넌트에게 전달하기 위해 저장
      postToEdit.value = response.data
    } else {
      console.log('글 번호 전송 실패')
    }
  } catch (error) {
    console.error(`글 번호 전송 실패: ${error}`)
  }
}

//댓글 목록 가져오기
let groupedDataAll = ref({})
let groupedData = ref({})
const getComment = async function() {

  try {
    const response = await axios.get('http://localhost:4000/commentline/View.do', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // 응답 처리
    if (response.status === 200) {

      // BBS_NO 값을 기준으로 데이터 묶기
      groupedDataAll = response.data.reduce((acc, curr) => {
        const bbsNoAll = curr.BBS_NO;
        if (acc[bbsNoAll]) {
          acc[bbsNoAll].push(curr);
        } else {
          acc[bbsNoAll] = [curr];
        }
        return acc;
      }, {});

      // BBS_NO 값을 기준으로 데이터 묶기
      groupedData = response.data.reduce((acc, curr) => {
        const bbsNo = curr.BBS_NO;
        if (acc[bbsNo]) {
          // parent_comment가 null인 값들 중에서 C_NO가 가장 큰 댓글만 선택
          if (curr.parent_comment === null) {
            const existingComment = acc[bbsNo].find(comment => comment.parent_comment === null);
            if (existingComment) {
              // 현재 댓글의 C_NO 값이 existingComment의 C_NO 값보다 큰 경우
              // acc[bbsNo] 배열을 현재 댓글로 업데이트
              if (curr.C_NO < existingComment.C_NO) {
                acc[bbsNo] = [curr];
              }
            } else {
              acc[bbsNo].push(curr);
            }
          } 
        }else {
            acc[bbsNo] = [curr];
        }
        return acc; // 누산기(acc)를 반환하여 다음 순회로 전달
      }, {});

      statecomm.comment = toRaw(groupedData);
      group.value = toRaw(statecomm.comment);
      console.log('전체 데이타',groupedDataAll);
      console.log('데이터 확인',group.value);
      

    } else {
      console.log('데이터 전송 실패')
    }
  } catch (error) {
    console.error(`데이터 전송 실패: ${error}`)
  }
}



//댓글 입력
const searchuser = 'OSH' //현재 접속중인 유저 아이디
const commentinput = ref('');
const insertComment = async (bno, comment) => {
  const formData = new FormData();
  formData.append('bbs_no', bno);
  formData.append('id', searchuser);
  formData.append('ccomment',comment);

  console.log(bno, searchuser, comment)

  await axios.post('http://localhost:4000/commentline/Write.do', formData, { 
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then(response => {
    // 성공적으로 업데이트되었을 때의 처리
    console.log('성공')
    console.log(response.data)

    // 댓글 입력 필드 초기화
    commentinput.value = '';  

    getComment(); 
  })
  .catch(error => {
    // 업데이트 중 오류가 발생했을 때의 처리
    console.log('실패')
  })
}


//////////////////////////////////////

const membersList = [
  {
    avatar: avatar1,
    name: 'Lester Palmer',
    email: 'jerrod98@gmail.com',
    permission: 'Can Edit',

  },
  {
    avatar: avatar2,
    name: 'Mattie Blair',
    email: 'prudence.boehm@yahoo.com',
    permission: 'Owner',
  },
  {
    avatar: avatar3,
    name: 'Marvin Wheeler',
    email: 'rumet@jujpejah.net',
    permission: 'Can Comment',
  },
  {
    avatar: avatar4,
    name: 'Nannie Ford',
    email: 'negza@nuv.io',
    permission: 'Can View',
  },
  {
    avatar: avatar5,
    name: 'Julian Murphy',
    email: 'lunebame@umdomgu.net',
    permission: 'Can Edit',
  },
  {
    avatar: avatar6,
    name: 'Sophie Gilbert',
    email: 'ha@sugit.gov',
    permission: 'Can View',
  },
  {
    avatar: avatar7,
    name: 'Chris Watkins',
    email: 'zokap@mak.org',
    permission: 'Can Comment',
  },
  {
    avatar: avatar8,
    name: 'Adelaide Nichols',
    email: 'ujinomu@jigo.com',
    permission: 'Can Edit',
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
  getData(), // 컴포넌트가 마운트될 때 getData 함수 실행
  getComment()

  // 그 후 매 5초마다 getData 함수를 반복해서 실행
  //setInterval(getData, 5000)
  
  window.addEventListener('scroll', handleScroll)
})

// 이벤트 리스너 제거
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

  items.value = items.value.concat(moreItems);
  console.log("leadMore..");
}

const modalControll = ref(false)

const controllInviteFunc = (ans, id) => {
  console.log('이벤트 발생')
  console.log(ans, id)
  isInvited[id] = ref(ans)
}

const username = ref('')

const requestFriend = temp => {
  modalControll.value = !modalControll.value
  console.log(temp)
  username.value = temp
}

const subscribe = name => {
  isSubscribed[name].value = !isSubscribed[name].value

}


const modalData = ref({ userid: '', userproIntroduction: '', userprofilePath: ''});
const profiledata = ref([])//내 프로필 데이터

const openUserProfileModal = (val) => {
  console.log(val);
  axios
    .get('http://localhost:4000/comm/profile', {
      params: {
        id: val.id,
      },
    })
    .then(response => {
      if (response.status === 200) {
        console.log('프로필 값:', response.data)
        profiledata.value = response.data
        console.log('프로필 Path:', profiledata.value.profilePath)
        // 모달에 전달할 변수 값 설정
        modalData.value = {
          userid: profiledata.value.id,
          userprofilePath:profiledata.value.profilePath,
          userproIntroduction: profiledata.value.proIntroduction
        };
      } else {
        console.log('데이터 가져오기 실패')
      }
    })
    .catch(error => {
      console.error(error)
    })
    userProfileModal.value = true;
};


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
                v-for="user in users"
                :key="user.id"
                cols="auto"
                class="ma-2"
              >
                <VListItem>
                  <VListItemContent class="d-flex flex-column align-center text-center">
                    <VAvatar 
                      class="text-sm pointer-cursor"
                      :image="user.profilePath"
                      @click="openUserProfileModal(user)"                      
                    />
                    <!-- @click="userProfileModal=true" -->

                    <VListItemTitle 
                      class="text-sm pointer-cursor"
                      @click="openUserProfileModal(user)"
                      @mouseover="size"  
                    >
                      {{ user.id }}
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
                              :image="getUserAvatar(item.id)"
                              @click="openUserProfileModal(item)"
                            />
                          </VCol>
                          <VCol cols="4">
                            <VCol cols="12">
                              <VCardSubtitle
                                class="text-sm pointer-cursor"
                                style="margin-left: -5%;"
                                @click="openUserProfileModal(item)"
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
                                    <VListItem @click="editingModal=true; submitEdit(item.bno)">
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
                      <VCarousel
                        v-if="item.files && item.files.length"
                        class="transparent-carousel"
                        show-arrows-on-hover
                        color="success"
                      >
                        <VCarouselItem
                          v-for="(image, i) in item.files" 
                          :key="i"
                          :class="{'active-slide': i === activeIndex}"
                        >
                          <VImg
                            :src="image"
                            class="pointer-cursor"
                            @click="viewPostPageModal=true"
                          />
                        </VCarouselItem>
                      </VCarousel>
                      
                      <VCardItem>
                        <VCardTitle
                          class="pointer-cursor"
                          @click="viewPostPageModal=true; submitEdit(item.bno)"
                        >
                          {{ item.content }}
                        </VCardTitle> 
                      </VCardItem>

                      <VCardText
                        class="pointer-cursor"
                        @click="viewPostPageModal=true;"
                      >
                        댓글 (여기에 중괄호 태그) 모두 보기
                      </VCardText>
                      <VCardText>
                        <VRow>
                          <VCol cols="10">
                            <VTextarea 
                              label="댓글달기" 
                              rows="1"
                              style="height: 20px; border: none;"
                              variant="underlined"
                              prepend-icon="mdi-emoticon"
                              v-model="item.commentinput"
                            />
                          </VCol>
                          <VCol cols="1">
                            <VBtn size="large" @click="insertComment(item.bno, item.commentinput); item.commentinput = ''">
                              게시
                            </VBtn>
                          </VCol>
                        </VRow>
                      </VCardText>
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
                      <VCol v-if="group[item.bno]?.[0]">
                        <VTextField readonly :value="group[item.bno][0].CCOMMENT" />
                      </VCol>
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
            v-for="member in usersView"
            :key="member.id"
          >
            <template #prepend>
              <VAvatar 
                class="text-sm pointer-cursor"
                :image="member.profilePath" 
                @click="openUserProfileModal(member)"
              />
            </template>

            <VListItemTitle 
              class="text-sm pointer-cursor"
              @click="openUserProfileModal(member)"
              @mouseover="size"  
            >
              {{ member.id }}
            </VListItemTitle>
            <!-- 친구 추가 버튼 -->
            <template #append>
              <VBtn
                v-show="!isInvited[member.name].value"
                id="myButton"
                width="40"
                @click="requestFriend(member.name)"
              >
                친구요청
              </VBtn>
              <InviteFriendConfirmModal
                v-model:isDialogVisible="modalControll"
                :message="username"
                @check-confirm="controllInviteFunc"
              />
              <VBtn
                v-show="isInvited[member.name].value"
                width="40"
                disabled="true"
              >
                신청완료
              </VBtn>
              <!-- 구독 버튼 -->
              <VBtn
                v-show="!isSubscribed[member.name].value"
                id="myButton"
                width="40"
                style="margin-left: 5px;"
                variant="outlined"
                @click="subscribe(member.name)"
              >
                구독
              </VBtn>
              <VBtn
                v-show="isSubscribed[member.name].value"
                id="myButton"
                style="margin-left: 5px;"
                variant="tonal"
                @click="subscribe(member.name)"
              >
                <VIcon icon="mdi-bell" />
                구독중
              </VBtn>
            </template>
          </VListItem>
        </VCol>
      </VCol>
    </VRow>
    <!-- <UserProfileCommunity v-model:isDialogVisible="userProfileModal"/> -->
    <UserProfileCommunity
      v-model:isDialogVisible="userProfileModal"
      :userid="modalData.userid"
      :userprofilePath="modalData.userprofilePath"
      :userproIntroduction="modalData.userproIntroduction"
    />
    <!-- :profilePath="modalData.profilePath" -->
    <Writing
      v-model:isDialogVisible="writingModal" 
      @update-success="getData"
    />
    <Editing
      v-model:isDialogVisible="editingModal"
      :post-to-edit="postToEdit"
      @update-success="getData"
    />
    <ViewPostPage
      v-model:isDialogVisible="viewPostPageModal" 
      :post-to-edit="postToEdit"
    />
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

.active-slide {
  color: success;
}

.transparent-carousel .v-carousel__controls {
  background-color: transparent;
}
</style>
