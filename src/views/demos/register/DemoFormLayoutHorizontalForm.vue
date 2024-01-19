<script setup>
import ChooseRadios from '@/views/demos/register/ChooseRadios.vue'
import axios from '@axios'
import { computed, ref } from 'vue'

const idText=ref(null)
const id = ref('')
const fullName = ref('')
const birthday = ref('')
const password = ref('')
const passwordCK = ref('')
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
const isDialogVisible = ref(false)
const idError = ref('')
const nameError = ref('') 
const passwordError = ref('')
const passwordCKError = ref('') 
const userHeight = ref('')
const heightError = ref('')
const userWeight = ref('')
const weightError = ref('')
const email = ref('')
const emailError = ref('')
const phoneNumber = ref('')
const PNError = ref('')

function handleFormSubmit(formData) {
  // 전달받은 데이터 값을 처리합니다.
  const phoneNumber = formData.phoneNumber
  const email = formData.email

  // 처리 로직 작성
}


const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-wizard-account',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]


// 인증요청 버튼활성화 로직
/*
const isButtonDisabled = computed(() => {
  return phoneNumber.value === '' && email.value === '' || id.value === '' ||
    fullName.value === '' ||
    password.value === '' ||
    passwordCK.value === '' ||
    userHeight.value === '' ||
    userWeight.value === ''
}) */




const validateId = () => {
  const regex = /^[a-zA-Z0-9]{4,10}$/
  if (!regex.test(id.value)){
    idError.value = '아이디는 4~10자의 영문과 숫자 조합이어야 합니다.'

    //idText.value.focus()
  }
  else{
    idError.value = '사용가능!'

  }
}

const components = {
  ChooseRadios,
}

const validatePassword = () => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_-])[A-Za-z\d!@#$%^&*()_-]{8,20}$/
  if(!regex.test(password.value)){
    passwordError.value = '비밀번호는 8~20자의 영문 대/소문자, 숫자, 특수문자를 모두 사용해 주세요.'
  }
  else{
    passwordError.value = '사용가능!'
  }
}

const validatePasswordCK = () => {
  if(password.value !== passwordCK.value){
    passwordCKError.value = "비밀번호가 비밀번호 확인과 일치하지 않습니다."
  }
  else{
    passwordCKError.value = '일치합니다!'
  }
}

const validatenameCK = () => {
  const regex = /^[가-힣]{2,5}$/
  if(!regex.test(fullName.value)){
    nameError.value = '이름은 2~5자 한글만 사용가능합니다. 이름이 5자 이상인 경우 관리자에게 문의하여주세요 '
  }
  else{
    nameError.value = '사용가능!'
  }
}

const validateHeight = () => {
  const regex = /^[1-9][0-9]{0,2}$|^999$/
  if (!regex.test(userHeight.value)){
    heightError.value = '정확히 입력해주세요'
  }
  else{
    heightError.value = '성공!'
  }
}

const placeholderText = computed(() => {
  return userHeight.value ? 'CM' : '키'
})


const validateWeight = () => {
  const regex = /^[1-9][0-9]{0,2}$|^999$/
  if(!regex.test(userWeight.value)){
    weightError.value = '정확히 입력해주세요'
  }
  else{
    weightError.value = '성공!'
  }
}

const validateEmailCK = () => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ 
  if (!regex.test(email.value)) {
    emailError.value= '올바른 이메일형식으로 입력해주세요.' 
  }
  else{
    emailError.value= '올바른 형식입니다!'
  }
}

const validatePNCK = () => {
  const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/
  if (!regex.test(phoneNumber.value)){
    PNError.value= '올바른 전화번호를 입력해주세요' 
  }
  else{
    PNError.value= '올바른 형식입니다!' 
  }
}

const userCheck=()=>{
  console.log(phoneNumber.value)
  axios.post('http://localhost:9999/user/check', phoneNumber.value)
    .then(response=>console.log(response))
    .catch(error=>console.error(error))
}

const AxiosInst = axios.create({
  baseURL: 'http://localhost:9999',
})

AxiosInst.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Origin'] = '*'  // CORS 설정(모든 리소스 허용)
    
    return config
  },
)

/* axios 설치 
npm install axios
, import 구문 추가 
,import axios from '@axios'; */

const onSubmitIdCK = () => {
  
  validateId() // 아이디 유효성 검사 함수 호출
  console.log('서브밋')

  //서버 연결시 아이디 중복확인 주석 풀어야함


  // if(!idError.value){
  //   axios.post('TeamProject서버', { data: id.value})
  //   .then(function(response){
  //     if (response.data){
  //       idError.value = '이미 사용중인 아이디입니다'
  //     } else{
  //       console.log('폼 데이터 제출:', formData.value)
  //     }
  //   })
  //   .catch(function(error){
  //     console.error('서버 요청 실패:', error)
  //   })
  // }
}


const onSubmitPassword = () => {
  validatePassword()
}

const onSubmitPasswordCK = () => {
  validatePasswordCK()
}

const onSubmitName = () => {
  validatenameCK()
}

const onSubmitHeight = () => {
  validateHeight() 
}

const onSubmitWeight = () => {
  validateWeight()
}

const onSubmitEmail = () => {
  validateEmailCK()
}

const onSubmitPhone = () => {
  validatePNCK()
}
</script>




<template>
  <VForm @submit.prevent="handleFormSubmit,onSubmitIdCK,onSubmitPassword,onSubmitPasswordCK,onSubmitName,onSubmitHeight,onSubmitWeight,onSubmitEmail,onSubmitPhone">
    <!-- () => {} -->
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 ID -->
          <VCol
            cols="12"
            md="3"
          />

          <VCol
            cols="12"
            md="1"
          />
          
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              id="id"
              ref="idText"
              v-model="id"
              placeholder="아이디"
              persistent-placeholder
              @input="validateId"
            />
            <!-- 입력 변경시 마다 아이디 유효성 검사 호출 -->
            <div :style="{ color: idError ? (idError === '사용가능!' ? 'greenyellow' : 'red') : '' }">
              {{ idError }}
            </div> <!-- 아이디 오류 메세지 -->
          </VCol>
        </VRow>
      </VCol>



      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
          />
            
          <VCol
            cols="12"
            md="1"
          />

          <VCol
            cols="12"
            md="4"
          >
            <VTextField
            
              id="password"
              v-model="password"
              placeholder="비밀번호"
              persistent-placeholder
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              @input="validatePassword"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
            <div :style="{ color: passwordError ? (passwordError === '사용가능!' ? 'greenyellow' : 'red') : '' }">
              {{ passwordError }}
            </div>
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
          />

          <VCol
            cols="12"
            md="1"
          />

          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              id="passwordCK"
              v-model="passwordCK"
              placeholder="비밀번호 확인"
              persistent-placeholder
              :type="isCPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isCPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              @input="validatePasswordCK"
              @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
            />
            <div :style="{ color: passwordCKError ? (passwordCKError === '일치합니다!' ? 'greenyellow' : 'red') : '' }">
              {{ passwordCKError }}
            </div>
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 fullName -->
          <VCol
            cols="12"
            md="3"
          />

          <VCol
            cols="12"
            md="1"
          />

          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              id="fullName"
              v-model="fullName"
              type="fullName"
              placeholder="이름"
              persistent-placeholder
              @input="validatenameCK"
            />
            <div :style="{ color: nameError ? (nameError === '사용가능!' ? 'greenyellow' : 'red') : '' }">
              {{ nameError }}
            </div>
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 fullName -->
          <VCol
            cols="12"
            md="2"
          />

          <VCol
            cols="12"
            md="2"
          />
          

          <VTextField
            id="userHeight"
            v-model="userHeight"
            type="userHeight"
            placeholder="키"
            persistent-placeholder
            label="CM"
            @input="validateHeight"
          />
          <div :style="{ color: heightError ? (heightError === '성공!' ? 'greenyellow' : 'red') : '' }">
            {{ heightError }}
          </div>



          <VTextField
            id="userWeight"
            v-model="userWeight"
            type="userWeight"
            placeholder="몸무게"
            persistent-placeholder
            label="KG"
            @input="validateWeight"
          />
          <div
            :style="{ color: weightError ? (weightError === '성공!' ? 'greenyellow' : 'red') : '' }"
            height="50px"
          >
            {{ weightError }}
          </div>
          <VCol
            cols="12"
            md="4"
          />
        </VRow>
      </VCol>

      


      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 birthday -->
          <VCol
            cols="12"
            md="3"
          />

          <VCol
            cols="12"
            md="1"
          />

          <VCol
            cols="12"
            md="4"
          >
            <AppDateTimePicker
              v-model="birthday"
              label="생년월일"
            />
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 ID -->
          <VCol
            cols="12"
            md="3"
          />

          <VCol
            cols="12"
            md="1"
          />
          
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              id="email"
              v-model="email"
              placeholder="이메일"
              persistent-placeholder
              @input="validateEmailCK"
            />
            <!-- 입력 변경시 마다 아이디 유효성 검사 호출 -->
            <div :style="{ color: emailError ? (emailError === '올바른 형식입니다!' ? 'greenyellow' : 'red') : '' }">
              {{ emailError }}
            </div>
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 ID -->
          <VCol
            cols="12"
            md="3"
          />

          <VCol
            cols="12"
            md="1"
          />
          
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              id="phoneNumber"
              v-model="phoneNumber"
              placeholder="휴대전화 번호(-생략 가능)"
              persistent-placeholder
              @input="validatePNCK"
            />
            <!-- 입력 변경시 마다 아이디 유효성 검사 호출 -->
            <div :style="{ color: PNError ? (PNError === '올바른 형식입니다!' ? 'greenyellow' : 'red') : '' }">
              {{ PNError }}
            </div> <!-- 아이디 오류 메세지 -->
          </VCol>
        </VRow>
      </VCol>
      
      <AddressApi />

      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="2"
          />

          <VCol
            cols="12"
            md="2"
          />

          <VCol
            cols="12"
            md="4"
          >
            <VDialog
              v-model="isDialogVisible"
              max-width="800"
            >
              <!-- Dialog Activator -->
              <template #activator="{ props }">
                <VBtn
                  :phone-number="phoneNumber"
                  :email="email"
                  v-bind="props"
                  :disabled="isButtonDisabled"
                  color="primary"
                  class="my-custom-button"
                  height="55px"
                  width="800"
                  @submit="handleFormSubmit"
                >
                  인증요청
                </VBtn>
              </template>

              <!-- Dialog Content -->
              <VCard title="회원가입 인증">
                <DialogCloseBtn
                  variant="text"
                  size="small"
                  @click="isDialogVisible = false"
                />
                <!---->
                <ChooseRadios
                  :email="email"
                  :phone-number="phoneNumber"
                />
                <VCardActions>
                  <VSpacer />
                  <VBtn
                    color="error"
                    @click="isDialogVisible = false"
                  >
                    닫기
                  </VBtn>
                  <VBtn
                    color="success"
                    @click="userCheck"
                  >
                    요청하기
                  </VBtn>
                </VCardActions>
              </VCard>
            </VDialog>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VForm>
</template>

<style scoped>
.parent-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>




