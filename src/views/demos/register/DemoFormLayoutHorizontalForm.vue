<script setup>
import { ref } from 'vue'

const id = ref('')
const fullName = ref('')
const emailid = ref('')
const emailaddr = ref('')
const birthday = ref('')
const password = ref('')
const passwordCK = ref('')
const isPasswordVisible = ref(false)
const phoneNumber = ref('')
const tellecom = ref('')
const currentStep = ref(0)
const isCPasswordVisible = ref(false)

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



const onSubmit = () => {
  console.log(formData.value)
}
const isDialogVisible = ref(false)
const PostalCode = ref('')
const DetailedAddr = ref('')
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 ID -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="id" >ID</label>
          </VCol>

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
              v-model="id"
              placeholder="아이디"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="password">Password</label>
          </VCol>

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
              type="password"
              placeholder="비밀번호"
              persistent-placeholder
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="password">Password</label>
          </VCol>

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
              type="passwordCK"
              placeholder="비밀번호 확인"
              persistent-placeholder
              :type="isPasswordVisible ? 'text' : 'passwordCK'"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>
        </VRow>
      </VCol>




      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="4"
          >
            <label for="email">Email</label>
          </VCol>


          <VCol
            cols="12"
            md="2"
          >
            <VTextField
            
              id="emailid"
              v-model="emailid"
              type="emailid"
              placeholder="이메일"
              persistent-placeholder
            />
          </VCol>
          <h5 style="margin: 15px 5px 0px 5px; font-size: 20px;">@</h5>
          <VCol
            cols="12"
            md="2"
          >
            <template v-if="emailaddr === '직접입력'">
              <!-- 직접입력이 선택되었을 때 텍스트 상자를 표시 -->
              <VTextField
                v-model="customEmail"
                label="직접입력"
                placeholder="직접입력"
              />
            </template>
            <VSelect
              v-show="emailaddr !== '직접입력'"
              id="emailaddr"
              v-model="emailaddr"
              label="emailaddr"
              placeholder="E-mail"
              :items="['naver.com', 'daum.net', 'nate.com', 'gmail.com','직접입력']" 
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 fullName -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="fullName">fullName</label>
          </VCol>

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
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 birthday -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="birthday">birthday</label>
          </VCol>

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
          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="4"
          >
            <label for="email">Email</label>
          </VCol>

          <VCol
            cols="12"
            md="2"
          >
            <VTextField
            
              id="phoneNumber"
              v-model="phoneNumber"
              type="phoneNumber"
              placeholder="휴대전화 번호"
              persistent-placeholder
            />
          </VCol>
          <h5 style="margin: 15px 5px 0px 5px; font-size: 20px;"> </h5>
          <VCol
            cols="12"
            md="2"
          >
            <VSelect
              id="tellecom"
              v-model="tellecom"
              label="tellecom"
              placeholder="통신사"
              :items="['SKT', 'LG U+', 'KT', 'SKT 알뜰폰','LG U+ 알뜰폰','KT 알뜰폰']"
            />
          </VCol>
        </VRow>
      </VCol>


      <VDialog
        v-model="isDialogVisible"
        max-width="600"
      >
        <!-- Dialog Activator -->
        <template #activator="{ props }">
          <VRow cols="12">
            <VCol cols="1" />
            <VCol>
              <VBtn v-bind="props" height="60px" width="40">
                우편번호
              </VBtn>
            </VCol>
          </VRow>
        </template>
        

        <!-- Dialog Content -->
        <VRow cols="12">
          <VCol cols="5" />
          <VCard title="우편번호 검색 및 등록">
            <DialogCloseBtn
              variant="text"
              size="big"
              @click="isDialogVisible = false"
            />

            <VCardText>
              <VRow>
                <VCol cols="12">
                  <VTextField
                    v-model="SearchPostal"
                    label="SearchPostal"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="DetailedAddr"
                    label="DetailedAddr"
                    type="DetailedAddr"
                  />
                </VCol>
              </VRow>
            </VCardText>

            <VCardActions>
              <VSpacer />
              <VBtn
                color="error"
                @click="isDialogVisible = false"
              >
                Close
              </VBtn>
              <VBtn
                color="success"
                @click="isDialogVisible = false"
              >
                Save
              </VBtn>
            </VCardActions>
          </VCard>
        </VRow>
      </VDialog>


          <VTextField
            
            id="phoneNumber"
            v-model="phoneNumber"
            type="phoneNumber"
            placeholder="휴대전화 번호"
            persistent-placeholder
          />
      <!-- 👉 submit and reset button -->
    </VRow>
  </VForm>
</template>



