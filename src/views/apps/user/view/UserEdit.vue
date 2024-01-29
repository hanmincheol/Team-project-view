<script setup>
import Btnsu from '@/pages/views/demos/components/button/self-suc.vue'
import Gender from '@/pages/views/demos/forms/form-elements/radio/Gender.vue'
import Edit from '@/pages/views/demos/forms/form-elements/textarea/Edit.vue'
import PW from '@/pages/views/demos/forms/form-elements/textfield/PasswordEdit.vue'
import Sub from '@/views/demos/DemoSelectCustomTextAndValue.vue'
import axios from '@axios'

const editClick1 = ref(true) //이름
const edit1 = ref(false)
const editClick2 = ref(true) //비번
const edit2 = ref(false)
const editClick3 = ref(true) //키
const edit3 = ref(false)
const editClick4 = ref(true) //몸무게
const edit4 = ref(false)
const editClick5 = ref(true) //전화번호
const edit5 = ref(false)
const editClick6 = ref(true) //생년월일
const edit6 = ref(false)
const editClick7 = ref(true) //주소
const edit7 = ref(false)

const nameval = ref('');
const pwdval = ref('');
const heightval = ref('');
const weightval = ref('');
const telval = ref('');
const b_dayval = ref('');
const userAddressval = ref('');

// mh는 Member_History 테이블을 뜻하는 약자
const memberdata = ref([]);
const searchuser = 'HMC' //접속중인 유저 아이디값 받아넣기


const fetchData = async () => {
  axios
    .get('http://localhost:4000/member_info/View.do',{
      params: {
        id: searchuser,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        memberdata.value = response.data;
        console.log(memberdata.value)
      } else {
        console.log('데이터 가져오기 실패');
      }
    })
    .catch((error) => {
      console.error(error);
   });
};

const updatedata = (colname, newcolval) =>{
  const formData = new FormData();
  console.log(searchuser, colname, newcolval);
  formData.append('colname', colname);
  formData.append('id', searchuser);
  formData.append('newcolval', newcolval);
  console.log(formData);
  axios
    .put('http://localhost:4000/member_info/Edit.do', formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      // 성공적으로 업데이트되었을 때의 처리
      console.log('성공');
    })
    .catch(error => {
      // 업데이트 중 오류가 발생했을 때의 처리
      console.log('실패');
    });
}

onMounted(fetchData);
</script>

<template>
  <VCard class="fill-height">
    <VCardText>
      <VRow align="center ml-2">
        <VCol
          cols="12"
          md="6"
        >
          <!-- 첫 번째 카드 텍스트 - 이름 -->
          <h6 class="text-h6">
            이름
            <IconBtn>
              <VIcon
                size="22"
                icon="mdi-lead-pencil"
                @click="editClick1=false, edit1=true" 
              /> <!--editClick1이 false일때는 입력이 안됨 / editClick이 true일때 입력 가능 -->
            </IconBtn>
            <div
              v-if="edit1"
              style=" margin-top: 5px;float: inline-end;"
            >
              <Btnsu @click="editClick1=true, edit1=false, updatedata('name', nameval)" />
            </div>
          </h6>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <!-- 두 번째 카드 텍스트 - 비밀번호 -->
          <h6 class="text-h6">
            비밀번호
            <IconBtn>
              <VIcon
                size="22"
                icon="mdi-lead-pencil"
                @click="editClick2=false, edit2=true"
              />
            </IconBtn>
            <div
              v-if="edit2"
              style=" margin-top: 5px;float: inline-end;"
            >
              <Btnsu @click="editClick2=true, edit2=false , updatedata('pwd', pwdval)"/>
            </div>
          </h6>
        </VCol>
      </VRow>

      <!-- 첫 번째 카드 텍스트 - 이름 -->
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <div style=" margin-top: -20px;">
            <Edit :readonly="editClick1" :placeholder="memberdata.name" v-model="nameval"/>
          </div>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <div style=" margin-top: -32px;">
            <!-- <PW :readonly="editClick2"/> -->
            <PW :readonly="editClick2" v-model="pwdval"/>
          </div>
        </VCol>
      </VRow>
    </VCardText>
    <!-- 두번째 줄 -->
    <VCardText>
      <VRow align="center ml-2">
        <VCol
          cols="12"
          md="4"
        >
          <h6 class="text-h6">
            성별
          </h6>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <h6 class="text-h6">
            키
            <IconBtn>
              <VIcon
                size="22"
                icon="mdi-lead-pencil"
                @click="editClick3=false, edit3=true"
              />
            </IconBtn>
            <div
              v-if="edit3"
              style=" margin-top: 5px;float: inline-end;"
            >
              <Btnsu @click="editClick3=true, edit3=false, updatedata('height', heightval)" />
            </div>
          </h6>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <h6 class="text-h6">
            몸무게
            <IconBtn>
              <VIcon
                size="22"
                icon="mdi-lead-pencil"
                @click="editClick4=false, edit4=true"
              />
            </IconBtn>
            <div
              v-if="edit4"
              style=" margin-top: 5px;float: inline-end;"
            >
              <Btnsu @click="editClick4=true, edit4=false, updatedata('weight', weightval)" />
            </div>
          </h6>
        </VCol>
      </VRow>
      <!-- 입력 부분 -->
      <VRow>
        <VCol
          cols="12"
          md="4"
        >
          <div style=" margin: -10px 0 0 20px;">
            <Gender :value="memberdata.gender"/>
          </div>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div style=" margin-top: -20px;">
            <Edit :readonly="editClick3" :placeholder="memberdata.height" v-model="heightval"/>
          </div>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div style=" margin-top: -20px;">
            <Edit :readonly="editClick4" :placeholder="memberdata.weight" v-model="weightval"/>
          </div>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <h6 class="text-h6">
            전화번호
            <IconBtn>
              <VIcon
                size="22"
                icon="mdi-lead-pencil"
                @click="editClick5=false, edit5=true"
              />
            </IconBtn>
            <div
              v-if="edit5"
              style=" margin-top: 5px;float: inline-end;"
            >
              <Btnsu @click="editClick5=true, edit5=false, updatedata('tel', telval)" />
            </div>
          </h6>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <h6 class="text-h6">
            생년월일
            <IconBtn>
              <VIcon
                size="22"
                icon="mdi-lead-pencil"
                @click="editClick6=false, edit6=true"
              />
            </IconBtn>
            <div
              v-if="edit6"
              style=" margin-top: 5px;float: inline-end;"
            >
              <Btnsu @click="editClick6=true, edit6=false, updatedata('b_day', b_dayval)" />
            </div>
          </h6>
        </VCol>
      </VRow>
      <!-- 입력 부분 -->
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <div style=" margin-top: -20px;">
            <Edit :readonly="editClick5" :placeholder="memberdata.tel" v-model="telval"/>
          </div>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <div style=" margin-top: -20px;">
            <Edit :readonly="editClick6" :placeholder="memberdata.b_day" v-model="b_dayval"/>
          </div>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText>
      <VRow align="center ml-2">
        <VCol cols="12">
          <h6
            class="text-h6"
            style=" margin-top: -10px;"
          >
            주소
            <IconBtn>
              <VIcon
                size="22"
                icon="mdi-lead-pencil"
                @click="editClick7=false, edit7=true"
              />
            </IconBtn>
            <Btnsu
              v-if="edit7"
              style=" margin-right: 5px; float: inline-end;"
              @click="editClick7=true, edit7=false, updatedata('userAddress', userAddressval)"
            />
          </h6>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols="12"
          md="12"
        >
          <div style=" margin-top: -20px;">
            <Edit :readonly="editClick7" :placeholder="memberdata.userAddress" v-model="userAddressval"/>
          </div>
        </VCol>
      </VRow>
    </VCardText>
    <VCol
      cols="12"
      md="12"
    >
      <h6
        class="text-h6"
        style=" margin: -10px 20px 10px;"
      >
        사용 목적
      </h6>
      <Sub :value="memberdata.goal_No"/>
    </VCol>
  </VCard>
</template>
