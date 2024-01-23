<script setup>
import AddressApi from '@/views/demos/register/AddressApi.vue'
import Sub from '@/views/demos/register/DemoSelectCustomTextAndValue.vue'
import axios from '@axios'
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import Birthyday from './Birthyday.vue'

const emits = defineEmits({
  goal_No: {
    type: String,
    required: true,
  },
  userAddress: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

})


const idText=ref(null)
const id = ref('')
const name = ref('')
const b_day = ref('')
const pwd = ref('')
const passwordCK = ref('')
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
const isDialogVisible = ref(false)
const idError = ref('')
const idSuccess = ref('')
const nameError = ref('') 
const nameSuccess = ref('')
const passwordError = ref('')
const passwordSuccess = ref('')
const passwordCKError = ref('') 
const passwordCKSuccess= ref('')
const height = ref('')
const heightError = ref('')
const heightSuccess = ref('')
const weight = ref('')
const weightError = ref('')
const weightSuccess = ref('')
const tel = ref('')
const PNError = ref('')
const PNSuccess = ref('')
const isDialogTwoShow = ref(false)
const certifiedPN = ref('')
const certifiedSc = ref('')
const certifiedFa = ref('')
const timerMinutes = ref(5)
const timerSeconds = ref(0)
let timerInterval = null
const goal_No = ref("")
const gender = ref("")





const userAddress = reactive({
  postcode: '',
  address: '',
})



const handleUpdateAddress = newAddress => {
  userAddress.value = newAddress // 'update-address' 이벤트에 담긴 데이터를 받아 'userAddress'에 저장합니다.
}

const handleGoalNoChanged = newGoalNo => {
  console.log('부모컴포넌트', goal_No) // 여기서 newGoalNo는 선택한 항목의 goal_No 값입니다.
  goal_No.value = newGoalNo
}

const handleUpdateGender = event => {
  gender.value = event.target.value // gender 값 업데이트
  console.log('부모컴포넌트:', gender.value)
}

onMounted(() => {
  clearValidationErrors()
  startTimer()
})

onBeforeUnmount(() => {
  clearInterval(timerInterval)
})

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timerSeconds.value > 0) {
      timerSeconds.value--
    } else if (timerMinutes.value > 0) {
      timerMinutes.value--
      timerSeconds.value = 59
    } else {
      clearInterval(timerInterval)
      isDialogTwoShow.value = false
    }
  }, 1000)
}



const resetTimer = () => {
  timerMinutes.value = 4
  timerSeconds.value = 59
}

const closeDialogAndResetTimer = () => {
  isDialogTwoShow.value = false
  resetTimer() // resetTimer 함수는 다른 곳에서 정의되어 있다고 가정합니다.
}

const formatTime = value => {
  return value.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
}






watch(b_day, newVal => {
  if (newVal !== null) {
    
    console.log('')
  } else {
    MessageEvent = "생년월일을 입력해주세요."
    console.log('생년월일을 입력해주세요.')
  }
})

watch(userAddress, newVal => {
  if (newVal !== null) {
    console.log('')
  } else {
    MessageEvent = "주소를 입력해주세요."
    console.log('주소를 입력해주세요.')
  }
})

// 인증요청 버튼활성화 로직 
//유효성 검사 하나하나 통과 못할시 
//데이터베이스 전송 자체를 불가능 하게 해서 궂이 필요 없을듯 
/*
const isButtonDisabled = computed(() => {
  return tel.value === ''  || id.value === '' ||
    name.value === '' ||
    pwd.value === '' ||
    passwordCK.value === '' ||
    height.value === '' ||
    weight.value === '' 
    
}) */

const CertiPN = () => {
  const regex = /^[0-9]{6}$/ // 6자리 숫자만 허용하는 정규식

  if (!regex.test(certifiedPN.value)) {
    //certifiedPN.value = '' // 입력 초기화
  }
}


const isValidCertifiedPN = computed(() => {
  const regex = /^[0-9]{6}$/ // 6자리 숫자만 허용하는 정규식
  
  return regex.test(certifiedPN.value)
})


const validateId = () => {
  const regex = /^[a-zA-Z0-9]{4,10}$/
  if (!regex.test(id.value)){
    idError.value = '아이디는 4~10자의 영문과 숫자 조합이어야 합니다.'
    idSuccess.value = ''

  }
  else{
    idError.value = ''
    idSuccess.value = '사용가능!'
  }
}


const validatePassword = () => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_-])[A-Za-z\d!@#$%^&*()_-]{8,20}$/
  if(!regex.test(pwd.value)){
    passwordError.value = '비밀번호는 8~20자의 영문 대/소문자, 숫자, 특수문자를 모두 사용해 주세요.'
    passwordSuccess.value = ''
  }
  else{
    passwordSuccess.value ='사용가능!'
    passwordError.value = ''
  }
}

const validatePasswordCK = () => {
  if(pwd.value !== passwordCK.value){
    passwordCKError.value = "비밀번호가 비밀번호 확인과 일치하지 않습니다."
    passwordCKSuccess.value = ''
  }
  else{
    passwordCKSuccess.value = '일치합니다!'
    passwordCKError.value = ''
  }
}

const validatenameCK = () => {
  const regex = /^[가-힣]{2,5}$/
  if(!regex.test(name.value)){
    nameError.value = '이름은 2~5자 한글만 사용가능합니다. 이름이 5자 이상인 경우 관리자에게 문의하여주세요 '
    nameSuccess.value = ''
  }
  else{
    nameSuccess.value = '사용가능!'
    nameError.value = ''
  }
}

const validateHeight = () => {
  const regex = /^[1-9][0-9]{0,2}$|^999$/
  if (!regex.test(height.value)){
    heightError.value = '정확히 입력해주세요'
    heightSuccess.value = ''
  }
  else{
    heightSuccess.value = '성공!'
    heightError.value = ''
  }
}



const validateWeight = () => {
  const regex = /^[1-9][0-9]{0,2}$|^999$/
  if(!regex.test(weight.value)){
    weightError.value = '정확히 입력해주세요'
    weightSuccess.value = ''
  }
  else{
    weightSuccess.value = '성공!'
    weightError.value = ''
  }
}



const validatePNCK = () => {
  const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/
  if (!regex.test(tel.value)){
    PNError.value= '올바른 전화번호를 입력해주세요' 
    PNSuccess.value = ''
  }
  else{
    PNSuccess.value = '올바른 형식입니다!'
    PNError.value= '' 
  }
}


const handleCertification = () => {
  // 인증번호가 유효한지 확인합니다.
  if (isValidCertifiedPN.value) {
    console.log('인증이 완료되었습니다.')
    certifiedSc.value = "인증이 완료되었습니다."

    // 유효성 검사를 수행합니다.
    validateId()
    validatePassword()
    validatePasswordCK()
    validatenameCK()
    validateHeight()
    validateWeight()
    validatePNCK()

    // 유효성 검사 결과를 확인합니다.
    if (idError.value === '' &&
        passwordError.value === '' &&
        passwordCKError.value === '' &&
        nameError.value === '' &&
        heightError.value === '' &&
        weightError.value === '' &&
        PNError.value === '') {
      
      // 모든 유효성 검사를 통과했을 때 데이터 객체를 구성합니다.
      const data = {
        id: id.value,
        pwd: pwd.value,
        name: name.value,
        gender: gender.value,
        b_day: b_day.value,
        tel: tel.value,
        height: height.value,
        weight: weight.value,
        goal_No: goal_No.value.value,
        userAddress: `${userAddress.value.postcode} ${userAddress.value.address}`,
      }

      console.log(b_day.value)
      console.log(data)

      // 유효성 검사를 통과한 데이터를 서버에 전송합니다.
      axios.post('http://localhost:4000/register', data)
        .then(response => {
          // 데이터 전송 성공 시 처리할 코드 작성
          console.log(response.data, '회원가입 성공')
        })
        .catch(error => {
          // 데이터 전송 실패 시 처리할 코드 작성
          console.error(error)
        })
    } else {
      // 유효성 검사를 통과하지 못했을 때 처리할 코드 작성
      console.log('유효성 검사를 통과하지 못했습니다.')
    }
  } else {
    console.log('인증번호를 확인해주세요.')
    certifiedFa.value = "인증번호를 확인해주세요"
  }
}

// 유효성 검사 에러 메시지 초기화 함수
const clearValidationErrors = () => {
  idError.value = ''
  passwordError.value = ''
  passwordCKError.value = ''
  nameError.value = ''
  heightError.value = ''
  weightError.value = ''
  PNError.value = ''
}

clearValidationErrors() // 유효성 검사 에러 메시지를 초기화합니다.
handleCertification() // 인증 및 데이터 전송을 위한 함수를 호출합니다.



// const userPNCheck=()=>{
//   console.log(phoneNumber.value)
//   axios.post('http://localhost:4000/user/check', phoneNumber.value)
//     .then(response=>console.log(response))
//     .catch(error=>console.error(error))
// }

// const AxiosInst = axios.create({
//   baseURL: 'http://localhost:9999',
// })

// AxiosInst.interceptors.request.use(
//   config => {
//     config.headers['Access-Control-Allow-Origin'] = '*'  // CORS 설정(모든 리소스 허용)
//     config.headers['Content-type'] = 'application/json'
    
//     return config
//   },
// )

/* axios 설치 
npm install axios
, import 구문 추가 
,import axios from '@axios'; */

/*
const onSubmitIdCK = () => {
  validateId(); // 아이디 유효성 검사 함수 호출
  console.log('서브밋');

  // 서버 연결시 아이디 중복확인 주석 풀어야함
  if (!idError.value) {
    axios.post('/checkDuplicateId', { data: id.value })
      .then(response => {
        if (response.data) {
          idError.value = '이미 사용중인 아이디입니다';
        } else {
          regiter(); // 데이터를 백엔드로 전송하는 함수 호출
        }
      })
      .catch(error => {
        console.error('서버 요청 실패:', error);
      });
  }
}; 
onSubmitIdCK() 
*/
</script>




<template>
  <VForm @submit.prevent="handleCertification">
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
            <div
              v-if="idError"
              :style="{ color: 'red' }"
            >
              {{ idError }}
            </div> <!-- 아이디 오류 메세지 -->

            <div
              v-if="idSuccess"
              :style="{ color: 'greenyellow' }"
            >
              {{ idSuccess }}
            </div> <!-- 아이디 성공 메세지 -->
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
            
              id="pwd"
              v-model="pwd"
              placeholder="비밀번호"
              persistent-placeholder
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              @input="validatePassword"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
            <div
              v-if="passwordError"
              :style="{ color: 'red' }"
            >
              {{ passwordError }}
            </div> <!-- 아이디 오류 메세지 -->

            <div
              v-if="passwordSuccess"
              :style="{ color: 'greenyellow' }"
            >
              {{ passwordSuccess }}
            </div> <!-- 아이디 성공 메세지 -->
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
            <div
              v-if="passwordCKError"
              :style="{ color: 'red' }"
            >
              {{ passwordCKError }}
            </div> <!-- 아이디 오류 메세지 -->

            <div
              v-if="passwordCKSuccess"
              :style="{ color: 'greenyellow' }"
            >
              {{ passwordCKSuccess }}
            </div> <!-- 아이디 성공 메세지 -->
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
              id="name"
              v-model="name"
              type="name"
              placeholder="이름"
              persistent-placeholder
              @input="validatenameCK"
            />
            <div
              v-if="nameError"
              :style="{ color: 'red' }"
            >
              {{ nameError }}
            </div> <!-- 아이디 오류 메세지 -->

            <div
              v-if="nameSuccess"
              :style="{ color: 'greenyellow' }"
            >
              {{ nameSuccess }}
            </div> <!-- 아이디 성공 메세지 -->
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 fullName -->
          <VCol cols="4" />

         
          <Myradio @update-gender="handleUpdateGender" />

          <VCol cols="4" />
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
            id="height"
            v-model="height"
            type="height"
            placeholder="키"
            persistent-placeholder
            label="CM"
            
            @input="validateHeight"
          />
          <div
            v-if="heightError"
            :style="{ color: 'red' }"
          >
            {{ heightError }}
          </div> <!-- 아이디 오류 메세지 -->

          <div
            v-if="heightSuccess"
            :style="{ color: 'greenyellow' }"
          >
            {{ heightSuccess }}
          </div> <!-- 아이디 성공 메세지 -->





          <VTextField
            id="weight"
            v-model="weight"
            type="weight"
            placeholder="몸무게"
            persistent-placeholder
            label="KG"
            @input="validateWeight"
          />
          <div
            v-if="weightError"
            :style="{ color: 'red' }"
          >
            {{ weightError }}
          </div> <!-- 아이디 오류 메세지 -->

          <div
            v-if="weightSuccess"
            :style="{ color: 'greenyellow' }"
          >
            {{ weightSuccess }}
          </div> <!-- 아이디 성공 메세지 -->


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
            <Birthyday
              v-model="b_day"
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
              id="tel"
              v-model="tel"
              placeholder="휴대전화 번호(-생략 가능)"
              persistent-placeholder
              @input="validatePNCK"
            />
            <div
              v-if="PNError"
              :style="{ color: 'red' }"
            >
              {{ PNError }}
            </div> <!-- 아이디 오류 메세지 -->

            <div
              v-if="PNSuccess"
              :style="{ color: 'greenyellow' }"
            >
              {{ PNSuccess }}
            </div> <!-- 아이디 성공 메세지 -->
          </VCol>
        </VRow>

        <VCol cols="12">
          <VRow no-gutters>
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
              <Sub @update:model-value="handleGoalNoChanged" />
            </VCol>
          </VRow>
        </VCol>
      </VCol>
      
      <AddressApi
        :new-address="userAddress"
        @update-address="handleUpdateAddress"
      />

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
                  :phone-number="tel"
                  v-bind="props"
                  color="primary"
                  class="my-custom-button"
                  height="55px"
                  width="800"
                  :disabled="isButtonDisabled"
                  @click="isDialogTwoShow = !isDialogTwoShow "
                >
                  인증요청
                </VBtn>
              </template>

              <!-- Dialog Content -->
              

              <VDialog
                v-model="isDialogTwoShow"
                class="v-dialog-sm text-center"
                persistent
              >
                <VAlert
                  title="휴대전화로 받은 인증번호를 입력하세요!"
                  title-size="100px"
                  class="modal"
                  icon="mdi-shield-lock-outline"
                  prominent
                  aria-setsize="50px"
                >
                  <VAlert
                    border="bottom"
                    color="success"
                    variant="tonal"
                  >
                    이름: {{ name }}, 휴대전화: {{ tel }}
                  </VAlert>
                  <DialogCloseBtn
                    variant="text"
                    size="small"
                    
                    @click="closeDialogAndResetTimer"
                  />
                  <VRow no-gutters>
                    <VCol cols="12">
                      <VCol
                        cols="12"
                        md="6"
                      />

                      <VTextField
                        id="certifiedPN"
                        v-model="certifiedPN"
                        
                        type="certifiedPN"
                        placeholder="인증번호"
                        persistent-placeholder
                        inputmode="numeric"
                        class="wider-textfield"
                        @input="CertiPN"
                      />
                      
                      <VCol
                        cols="12"
                        md="12"
                      >
                        <VAlert
                          color="red"
                          class="alert"
                        >
                          {{ formatTime(timerMinutes) }}:{{ formatTime(timerSeconds) }}
                        </VAlert>
                        <VCardActions>
                          <VSpacer />
                          <VBtn
                            block
                            class="btn"
                            variant="flat"
                            color="success"
                            @click="handleCertification "
                          >
                            인증하기
                          </VBtn>
                        </VCardActions>
                      </vcol>
                    </vcol>
                  </VRow>
                </valert>
              </VDialog>
            </vdialog>
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

  .error-message {
    color: red;
  }

  .success-message {
    color: green;
  }
}

.model {
  background-color: #fff;
}

.wider-textfield {
  block-size: 70px;  /* 원하는 폭으로 수정 */
}

.alert {
  position: absolute;
  block-size: 40px;
  color: red;
  inset-block-start: 143px;
  inset-inline-end: 20px;
}

.btn {
  block-size: 50px;
  inline-size: 100px;
  inset-inline: px;
}

.modal {
  inset-block-end: 40px;
  inset-inline-start: 120px;
}
</style>




