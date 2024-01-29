<script setup>
import {
  avatarText,
  kFormatter,
} from '@core/utils/formatters'

import SelfEdit from '@/pages/views/demos/forms/form-elements/textarea/self-edit.vue'
import Btnsu from '@/pages/views/demos/components/button/self-suc.vue'
import { faL } from '@fortawesome/free-solid-svg-icons'
import axios from '@axios'
import { proxyRefs } from 'vue'
import { ref, computed } from 'vue';


const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

const standardPlan = {
  plan: 'Standard',
  price: 99,
  benefits: [
    '10 Users',
    'Up to 10GB storage',
    'Basic Support',
  ],
}

const editClick = ref(true)
const edit = ref(false)
const isUserInfoEditDialogVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)

const resolveUserStatusVariant = stat => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'
  
  return 'primary'
}

const resolveUserRoleVariant = role => {
  if (role === 'subscriber')
    return {
      color: 'primary',
      icon: 'mdi-account-outline',
    }
  if (role === 'author')
    return {
      color: 'warning',
      icon: 'mdi-cog-outline',
    }
  if (role === 'maintainer')
    return {
      color: 'success',
      icon: 'mdi-database-outline',
    }
  if (role === 'editor')
    return {
      color: 'info',
      icon: 'mdi-pencil-outline',
    }
  if (role === 'admin')
    return {
      color: 'error',
      icon: 'mdi-dns-outline',
    }
  
  return {
    color: 'primary',
    icon: 'mdi-account-outline',
  }
}

// mh는 Member_History 테이블을 뜻하는 약자
const subdate = ref([]); //구독자 관련 데이터
const profiledata = ref([]);//내 프로필 데이터
const searchuser = 'HMC' //접속중인 유저 아이디값 받아넣기
const length = ref(0) //구독자 초기값


const fetchData = async () => { //내 구독자 목록 가져와서 수치 뿌려주기 위한 axios
  axios
    .get('http://localhost:4000/comm/subscribe',{
      params: {
        id: searchuser,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        subdate.value = response.data;
        console.log('MySub 배열(구독자) 값:', response.data.MySub);
        length.value = subdate.value.MySub.length;
      } else {
        console.log('데이터 가져오기 실패');
      }
    })
    .catch((error) => {
      console.error(error);
   });
};

const fetchProfile = async () => { //Profile 데이터 가져오기
  axios
    .get('http://localhost:4000/comm/profile',{
      params: {
        id: searchuser,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('프로필 값:',response.data);
        profiledata.value = response.data;
        console.log('프로필 Path:',profiledata.value.profilePath)
      } else {
        console.log('데이터 가져오기 실패');
      }
    })
    .catch((error) => {
      console.error(error);
   });
};

// 이미지
const showDialog = ref(false); //프로필 사진 교체를 위한 Dialog 호출 변수
const imageUrl = ref('') // 이미지 URL을 담을 변수 -- 사진 1개
const imageSize = ref(null) //이미지 마우스 올릴 때 이벤트를 위한 변수
const imgUrl = ref(null); // imgUrl 변수 정의
const FileInputbtn = ref(true);
const inputfilename = ref(''); // 저장될 파일명
let fileName = ''; // fileName 변수 정의
const showIcon = ref(false); // 프로필 사진에 마우스 올리면 아이콘 노출 유무

//Profile 사진 교체를 위한 axios
const imagechange = () => {
  const requestData = {
    id: searchuser,
    profilePath: inputfilename.value
  };

  console.log('정상작동');
  axios
    .put('http://localhost:4000/comm/profile/update', requestData)
    .then(response => {
      // 성공적으로 업데이트되었을 때의 처리
      console.log('성공');
    })
    .catch(error => {
      // 업데이트 중 오류가 발생했을 때의 처리
      console.log(inputfilename.value);
      console.log('실패');
    });
}

// 프로필 파일 업로드할때 필요한 함수
const uploadImg = e => {
  const fileList = e.target.files;

  if (fileList.length > 0) {
    // fileList의 파일에 대해 URL 생성 및 배열에 추가
    const imageUrl = URL.createObjectURL(fileList[0]);

    // 배열을 컴포넌트 내의 데이터에 할당
    imgUrl.value = imageUrl;
    FileInputbtn.value = false;

    // 파일명 설정
    fileName = fileList[0].name;
    inputfilename.value = fileName; // 변경 전: `/src/assets/images/userProfile/${fileName}`
    uploadFile(fileList[0]);
  } else {
    // Handle the case where no file is selected
    console.error('No file selected');
  }
}

// 파일을 전송하고 서버로 업로드하는 함수
const uploadFile = file => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post('http://localhost:4000/comm/upload', formData)
    .then(response => {
      // 파일 업로드 성공 시 실행할 코드 작성
      console.log('File uploaded successfully');
      console.log('Response:', response);
    })
    .catch(error => {
      // 파일 업로드 실패 시 실행할 코드 작성
      console.error('File upload failed');
      console.error('Error:', error);
    });
};



// onMounted(fetchData, fetchProfile);
onMounted(async () => {
  await Promise.all([fetchData(), fetchProfile()]);
});

</script>

<style>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.icon {
  position: absolute;
  /* 아이콘 스타일 및 위치 설정 */
}
</style>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <div class="avatar-container">
            <VAvatar
                rounded="sm"
                size="120"
                :image="profiledata.profilePath"
                class="mt-3"
                @click="showDialog = true"
                @mouseover="showIcon = true"
                @mouseout="showIcon = false"
              />  
              <!-- 아래 Icon은 교체 아이콘으로... -->
            <VIcon
                v-if="showIcon"
                size="22"
                icon="mdi-magnify"
                class="icon"
                style="opacity: 1;"
                @click="showDialog = true"
              />
          </div>
          <!-- -->
          <VDialog v-model="showDialog" max-width="500">
            <VCard title="설정할 프로필 사진을 선택해주세요">
              <DialogCloseBtn variant="text" size="small" @click="showDialog = false" />
              <VCardText v-if="FileInputbtn">
                사진을 추가해주세요
              </VCardText>
              <VImg
                v-if="imgUrl"
                :src="imgUrl"
                style="width: 400px; height: 400px; align-self: center;"
              />
              <VCol cols="12">
                <VFileInput
                  :rules="rules"
                  label="Profile IMG"
                  type="file"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera-outline"
                  @change="uploadImg"
                />
                <!-- @change="uploadImg" -->
              </VCol>
              <VCol>
                <VBtn block @click="showDialog = false, imagechange()">확인</VBtn>
                <!-- <VBtn block @click="showDialog = false, imagechange()">확인</VBtn> -->
              </VCol>
            </VCard>
          </VDialog>  

          <!-- 👉 User fullName -->
          <h6 class="text-h6 mt-4">
            {{ profiledata.name }}
          </h6>

          <!-- 👉 Role chip -->
          <VChip
            label
            color="success"
            density="comfortable"
            class="text-capitalize mt-4"
          >
            {{ profiledata.date }}
          </VChip>
        </VCardText>

        <VCardText class="d-flex justify-space-between flex-wrap mt-1">
          <!-- 👉 Done task -->
          <div class="d-flex align-center">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-4"
            >
              <VIcon
                size="24"
                icon="mdi-poll"
              />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                {{ kFormatter(props.userData.taskDone) }}
              </h6>
              <span>이행률</span>
            </div>
          </div>

          <!-- 👉 Done Project -->
          <div class="d-flex align-center">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-4"
            >
              <VIcon
                size="24"
                icon="mdi-star"
              />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                {{ length }}
              </h6>
              <span>구독자 수</span>
            </div>
          </div>
        </VCardText>

        <!-- 👉 Details -->
        <VCardText>
          <VRow align="center ml-4">
            <h6 class="text-h6" style="margin-top: 10px; margin-bottom:5px;">
              자기소개
            </h6>
            <IconBtn>
              <VIcon
                icon="mdi-lead-pencil"
                size="22"
                @click="editClick=!editClick, edit=!edit"
              />
            </IconBtn>
          </VRow>
          <VCol
            cols="12"
            md="12"
            rows="12"
            style="height: 380px;"
          >
            <SelfEdit :readonly="editClick" :value="profiledata.proIntroduction"/>
            <div style="float: right; margin-top: 10px;" v-if="edit">
              <Btnsu @click="editClick=true, edit=false" />
            </div>
          </VCol>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.userData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.current-plan {
  border: 2px solid rgb(var(--v-theme-primary));
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
