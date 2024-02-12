<script setup>
import AddressApi from '@/views/demos/register/AddressApi.vue'
import Sub from '@/views/demos/register/DemoSelectCustomTextAndValue.vue'
import axios from '@axios'
import { onBeforeUnmount, onMounted, provide, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'


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
  address: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },

})


// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://localhost:4000/',
})


// 요청 인터셉터 설정
instance.interceptors.request.use(
  config => {
    // config.headers.authorization = 'token'
    config.headers['Access-Control-Allow-Origin'] = '*'  // CORS 설정(모든 리소스 허용)
    
    return config
  },
  error => {
    // 요청을 보내는 데 실패했을 때의 처리
    return Promise.reject(error)
  },
)

// 응답 인터셉터 설정
instance.interceptors.response.use(
  response => {
    // 응답 코드가 200이면, 응답을 그대로 반환
    if (response.status === 200) {
      return response
    }
  },
  error => {
    // 오류 응답이 401이면, 사용자 정의 오류 메시지를 반환
    if (error.response && error.response.status === 401) {
      
      console.log("무슨에러냐 도대체", error.response.status)
      
      return Promise.reject('인증번호를 다시 확인해주세요.')
    }
    
    console.log("무슨에러냐 도대체", error.response.status)

    // 그 외의 오류는 그대로 반환
    return Promise.reject(error)
  },
)


const router = useRouter()

const isSnackbarVisible = ref(false)
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
  // newAddress가 객체라고 가정하고, 그 객체의 구조가 { postcode, address }라고 할 때:
  userAddress.postcode = newAddress.postcode
  userAddress.address = newAddress.address
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

let isTimerRunning = false

const startTimer = () => {
  if (!isTimerRunning) {
    isTimerRunning = true
    timerInterval = setInterval(() => {
      if (timerSeconds.value > 0) {
        timerSeconds.value--
      } else if (timerMinutes.value > 0) {
        timerMinutes.value--
        timerSeconds.value = 59
      } else {
        clearInterval(timerInterval)
        isDialogTwoShow.value = false
        isTimerRunning = false
      }
    }, 1000)
  }
}



const resetTimer = () => {
  timerMinutes.value = 4
  timerSeconds.value = 59
}

const closeDialogAndResetTimer = () => {
  isDialogTwoShow.value = false
  isDialogVisible.value = false
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

const isValidCertifiedPN = ref(false) // ref로 선언

watch(certifiedPN, newValue => {
  const regex = /^[0-9]{6}$/ // 6자리 숫자만 허용하는 정규식

  isValidCertifiedPN.value = regex.test(newValue)
})



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


const handleCertification = async () => {
  // 유효성 검사 함수 호출
  validatenameCK()
  validateHeight()
  validateWeight()
  validatePNCK()

  // 모든 유효성 검사를 통과했을 때
  if (idError.value === '' &&
      passwordError.value === '' &&
      passwordCKError.value === '' &&
      nameError.value === '' &&
      heightError.value === '' &&
      weightError.value === '' &&
      PNError.value === '') {

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
      userAddress: `${userAddress.postcode} ${userAddress.address}`,
    }

    console.log("유저데이터,수정이?", data)
    console.log("주소", userAddress)

    // 모든 유효성 검사를 통과한 데이터를 반환합니다.
    return data

  } else {
    console.log('유효성 검사를 통과하지 못했습니다.')
    throw new Error('Validation failed')
  }
}

const handleButtonClick = async () => {
  if (handleCertification()) {
    const result = await sendMessage()
    if (result) {
      isDialogTwoShow.value = !isDialogTwoShow.value
    }
  }
}

const sendMessage = async () => {
  try {
    // 유효성 검사를 수행합니다.
    const data = await handleCertification()

    // 해당 번호가 이미 존재하는지 확인하는 API를 호출합니다.
    const checkResponse = await instance.post('http://localhost:4000/checkPhoneNumber', { phone: data.tel })

    // 이미 존재하는 번호라면, 에러 메시지를 보여줍니다.
    if (checkResponse.data.exists) {
      alert('이미 가입된 번호입니다.')
      isDialogVisible.value = false
      
      return isDialogVisible.value 
    }

    // 인증번호를 요청하는 기존 로직
    const response = await instance.post('/send', { phone: data.tel })

    console.log(response)
    alert('인증번호가 발송되었습니다.')
    
    // 타이머 초기화 및 시작
    resetTimer()
    startTimer()

    return true
  } catch (error) {
    if (error.message === 'Validation failed') {
      // 유효성 검사에 실패했을 때는 사용자에게 알립니다.
      alert('회원정보를 올바르게 입력했는지 확인해주세요.')
      isDialogVisible.value = false
    } else {
      // 그 외의 오류는 로그를 출력하고, 사용자에게 알립니다.
      console.error('An unknown error occurred:', error)
      alert('인증번호 발송에 실패하였습니다. 다시 시도해주세요.')
      isDialogVisible.value = false
    }
    
    return isDialogVisible.value
  }
}

// 인증을 검증하는 함수
const verifyCertification = async() => {
  try {
    const response = await instance.post('http://localhost:4000/verify', {
      phone: tel.value,
      authCode: certifiedPN.value,
    })

    // 인증 성공
    if (response.status === 200) {
      isValidCertifiedPN.value = true

      // 유효성 검사 및 회원 데이터를 가져옵니다.
      const data = await handleCertification()

      // 회원가입 함수를 호출하며, data를 인자로 전달합니다.
      await registerUser(data, isValidCertifiedPN)
    }
  } 
  catch (error) {
    // 인증 실패 메시지 출력
    alert(error)
    isValidCertifiedPN.value = false
  }
}


const resendVerificationCode = async () => {
  try {
    // 인증번호를 만료하고 새로운 인증번호를 발급합니다.
    const response = await axios.post('http://localhost:4000/resendVerificationCode', {
      phone: tel.value,
    })

    // 인증번호 발급이 성공하면 사용자에게 재발송합니다.
    if (response.status === 200) {
      console.log('인증번호 재발송 성공')
      alert('인증번호가 재발송되었습니다.')
      resetTimer()
      startTimer()
    } else {
      console.log('인증번호 재발송 실패')
      alert('인증번호 재발송에 실패하였습니다. 다시 시도해주세요.')
    }
  } catch (error) {
    console.error('인증번호 재발송 과정에서 오류 발생:', error)
    alert('인증번호 재발송 중 오류가 발생하였습니다. 다시 시도해주세요.')
  }
}

provide('isSnackbarVisible', isSnackbarVisible)

const registerUser = async (data, isValidCertifiedPN) => {
  try {
    if (isValidCertifiedPN.value) {
      const registerResponse = await axios.post('http://localhost:4000/register', data)

      console.log(registerResponse.data, '회원가입 성공')

      // 회원가입 성공 시 Snackbar를 보여줍니다.
      isSnackbarVisible.value = true

      // 회원가입 요청의 응답이 성공적으로 수신된 경우에만 페이지 이동을 실행합니다.
      if (registerResponse.status === 200) {
        setTimeout(() => {
          router.replace({ name: 'login' })
        }, 3000)
      }
    } else {
      console.log('인증 실패')
      alert('인증번호를 확인해주세요.')
    }
  } catch (error) {
    console.log('회원가입 실패', error.response?.data || error.message)
    alert('회원가입에 실패하였습니다. 다시 시도해주세요.')
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
//handleCertification() // 인증 및 데이터 전송을 위한 함수를 호출합니다.



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
  <VForm>
    <!-- () => {} -->
    <VRow class="my-3">
      <VCol cols="12">
        <VRow no-gutters>
          <VCol cols="12">
            <VRow
              no-gutters
              class="my-3"
            >
              <!-- 👉 fullName -->
              <VCol cols="4" />

         
              <Myradio @update-gender="handleUpdateGender" />

              <VCol cols="4" />
            </VRow>
          </VCol>

          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
          />
            
          <VCol
            cols="12"
            class="my-3"
          >
            <VRow no-gutters>
              <!-- 👉 fullName -->
              <VCol cols="4" />
              <VCol cols="2">
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
              </VCol>
              <VCol cols="2">
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
              </VCol>

              <VCol cols="4" />
            </VRow>
          </VCol> 

          <VCol cols="12">
            <VRow
              no-gutters
              class="my-3"
            >
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

          <AddressApi
            v-model="userAddress"
            :new-address="userAddress" 
            @update-address="handleUpdateAddress"
          />

          <VCol
            cols="12"
            class="my-3"
          >
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
                      @click="handleButtonClick"
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
                            md="7"
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
                                @click="verifyCertification"
                              >
                                인증 확인
                              </VBtn>
                              <VBtn
                                block
                                class="btn"
                                variant="flat"
                                color="info"
                                @click="resendVerificationCode"
                              >
                                인증번호 재발송
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
      </vcol>
    </vrow>
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
  inline-size: 50px;
  inset-inline-end: 20px;
}

.modal {
  inset-block-end: 40px;
  inset-inline-start: 120px;
}
</style>
