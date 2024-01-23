<script setup>
import bg1 from '@images/allergy/1.jpg'
import bg10 from '@images/allergy/10.jpg'
import bg11 from '@images/allergy/11.jpg'
import bg12 from '@images/allergy/12.jpg'
import bg13 from '@images/allergy/13.jpg'
import bg14 from '@images/allergy/14.jpg'
import bg15 from '@images/allergy/15.jpg'
import bg16 from '@images/allergy/16.jpg'
import bg17 from '@images/allergy/17.jpg'
import bg18 from '@images/allergy/18.jpg'
import bg2 from '@images/allergy/2.jpg'
import bg3 from '@images/allergy/3.jpg'
import bg4 from '@images/allergy/4.jpg'
import bg5 from '@images/allergy/5.jpg'
import bg6 from '@images/allergy/6.jpg'
import bg7 from '@images/allergy/7.jpg'
import bg8 from '@images/allergy/8.jpg'
import bg9 from '@images/allergy/9.jpg'

import ht1 from '@images/Unbalanced/1.jpg'
import ht10 from '@images/Unbalanced/10.jpg'
import ht11 from '@images/Unbalanced/11.jpg'
import ht12 from '@images/Unbalanced/12.jpg'
import ht13 from '@images/Unbalanced/13.jpg'
import ht14 from '@images/Unbalanced/14.jpg'
import ht15 from '@images/Unbalanced/15.jpg'
import ht16 from '@images/Unbalanced/16.jpg'
import ht17 from '@images/Unbalanced/17.jpg'
import ht18 from '@images/Unbalanced/18.jpg'
import ht19 from '@images/Unbalanced/19.jpg'
import ht2 from '@images/Unbalanced/2.jpg'
import ht20 from '@images/Unbalanced/20.jpg'
import ht21 from '@images/Unbalanced/21.jpg'
import ht22 from '@images/Unbalanced/22.jpg'
import ht3 from '@images/Unbalanced/3.jpg'
import ht4 from '@images/Unbalanced/4.jpg'
import ht5 from '@images/Unbalanced/5.jpg'
import ht6 from '@images/Unbalanced/6.jpg'
import ht7 from '@images/Unbalanced/7.jpg'
import ht8 from '@images/Unbalanced/8.jpg'
import ht9 from '@images/Unbalanced/9.jpg'

import { ref } from 'vue'

const isDialogVisible = ref(false)

const imageUrl = ref('') // 이미지 URL을 담을 변수 -- 사진 1개

const uploadImg = e => {
  const fileList = e.target.files
  if (fileList.length > 0) {
    const imgUrl = URL.createObjectURL(fileList[0])

    imageUrl.value = imgUrl
  } else {
    // Handle the case where no file is selected
    console.error('No file selected')
  }
}

const formData = ref({
  age: '',
  gender: '',
  sleep: '',
  imageUrl: '',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  linkedIn: 'https://linkedin.com/abc',
})

// 탭에다 뿌려줄 사진 및 밸류
const checkboxContent = [
  {
    bgImage: bg1,
    value: '1',
  },
  {
    bgImage: bg2,
    value: '2',
  },
  {
    bgImage: bg3,
    value: '3',
  },
  {
    bgImage: bg4,
    value: '4',
  },
  {
    bgImage: bg5,
    value: '5',
  },
  {
    bgImage: bg6,
    value: '6',
  },
  {
    bgImage: bg7,
    value: '7',
  },
  {
    bgImage: bg8,
    value: '8',
  },
  {
    bgImage: bg9,
    value: '9',
  },
  {
    bgImage: bg10,
    value: '10',
  },
  {
    bgImage: bg11,
    value: '11',
  },
  {
    bgImage: bg12,
    value: '12',
  },
  {
    bgImage: bg12,
    value: '12',
  },
  {
    bgImage: bg13,
    value: '13',
  },
  {
    bgImage: bg14,
    value: '14',
  },
  {
    bgImage: bg15,
    value: '15',
  },
  {
    bgImage: bg16,
    value: '16',
  },
  {
    bgImage: bg17,
    value: '17',
  },
  {
    bgImage: bg18,
    value: '18',
  },
]

// 탭에다 뿌려줄 사진 및 밸류
const checkboxContent2 = [
  {
    bgImage: ht1,
    value: '1',
  },
  {
    bgImage: ht2,
    value: '2',
  },
  {
    bgImage: ht3,
    value: '3',
  },
  {
    bgImage: ht4,
    value: '4',
  },
  {
    bgImage: ht5,
    value: '5',
  },
  {
    bgImage: ht6,
    value: '6',
  },
  {
    bgImage: ht7,
    value: '7',
  },
  {
    bgImage: ht8,
    value: '8',
  },
  {
    bgImage: ht9,
    value: '9',
  },
  {
    bgImage: ht10,
    value: '10',
  },
  {
    bgImage: ht11,
    value: '11',
  },
  {
    bgImage: ht12,
    value: '12',
  },
  {
    bgImage: ht13,
    value: '13',
  },
  {
    bgImage: ht14,
    value: '14',
  },
  {
    bgImage: ht15,
    value: '15',
  },  
  {
    bgImage: ht16,
    value: '16',
  },
  {
    bgImage: ht17,
    value: '17',
  },
  {
    bgImage: ht18,
    value: '18',
  },  
  {
    bgImage: ht19,
    value: '19',
  },
  {
    bgImage: ht20,
    value: '20',
  },
  {
    bgImage: ht21,
    value: '21',
  },
  {
    bgImage: ht22,
    value: '22',
  },
]

const selectedCheckbox = ref(['basic'])

const iconsSteps = [
  {
    title: '알레르기',
    icon: 'mdi-allergy',
  },
  {
    title: '싫어하는 음식',
    icon: 'mdi-food-variant-off',
  },
  {
    title: '기타',
    icon: 'mdi-text-box-edit',
  },
  
]

const currentStep = ref(0)

const onSubmit = () => {
  console.log(formData.value)
}

const isSelected = value => {
  return selectedCheckbox.value === value
}
</script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <!-- 첫번째 탭 (알레르기) -->
          <VWindowItem>
            <VRow>
              <CustomCheckboxesWithImage
                v-model:selected-checkbox="selectedCheckbox"
                :checkbox-content="checkboxContent"
                :grid-column="{ sm: '3', cols: '12' }"
              />
            </VRow>
          </VWindowItem>
          <!-- 두번쨰 탭 (좋아하는 음식) -->
          <!-- 하트 이미지 수정하려면 src\@core\components\app-form-elements\CustomCheckboxesWithImageIcon.vue 에서 수정 -->
          <VWindowItem>
            <VRow>
              <CustomCheckboxesWithImageIcon
                v-model:selected-checkbox="selectedCheckbox"
                :checkbox-content="checkboxContent2"
                :grid-column="{ sm: '3', cols: '12' }"
              />
            </VRow>
          </VWindowItem>
          <!-- 세번쨰 탭 (싫어하는 음식) -->
          <VWindowItem>
            <!--   첫번째 줄  -->
            <VRow>
              <VCol cols="3">
                <p />생체 정보
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <VTextField
                  v-model="formData.age"
                  placeholder="ex)30"
                  label="연령"
                />
              </VCol>

              <VCol
                cols="12"
                md="3"
              >
                <VTextField
                  v-model="formData.gender"
                  placeholder="ex)남"
                  label="성별"
                />
              </VCol>
              <VCol cols="2" />
            </VRow>
            <!--   두번째 줄  -->
            <VRow>
              <VCol cols="3">
                <p />평균 수면 시간
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="formData.sleep"
                  placeholder="ex)8"
                  label="평균 수면 시간"
                />
              </VCol>

              <VCol cols="2" />
            </VRow>
            <!--   세번째 줄  -->
            <VRow>
              <VCol cols="5">
                <p />인바디 정보 입력
              </VCol>
              <VCol
                cols="12"
                md="4"
              >
                <VDialog
                  v-model="isDialogVisible"
                  width="1000"
                >
                  <!-- Activator -->
                  <template #activator="{ props }">
                    <VBtn 
                      v-bind="props"
                      size="x-large"
                    >
                      Inbody
                    </VBtn>
                  </template>
                  <!-- Dialog Content -->
                  <VCard title="Inbody">
                    <DialogCloseBtn
                      variant="text"
                      size="small"
                      @click="isDialogVisible = false"
                    />
                    <VCardText>
                      인바디 분석 용지를 사진 찍어주세요
                    </VCardText>
                    <VRow>
                      <VRow>
                        <!-- 원본 인바디 사진 -->
                        <VImg
                          id="diaryImages"
                          :src="imageUrl"
                          style="align-self: center; margin: 50px;"
                        />
                        <!-- 여기는 인식된 인바디 사진 -->
                        <VImg
                          id="diaryImages"
                          :src="imageUrl"
                          style="align-self: center; margin: 50px;"
                        />
                      </VRow>
                    </VRow>
                    <VCol cols="12">
                      <VFileInput
                        :rules="rules"
                        label="Face IMG"
                        type="file"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Pick an avatar"
                        prepend-icon="mdi-camera-outline"
                        @change="uploadImg"
                      />
                    </VCol>
                    <VCol>
                      <VBtn 
                        block
                        @click="isDialogVisible=false"
                      >
                        확인
                      </VBtn>
                    </VCol>
                  </VCard>
                </VDialog>
              </VCol>
              <VCol cols="2" />
            </VRow>
            <VRow>
              <VImg
                id="diaryImages"
                v-model="formData.imageUrl"
                :src="imageUrl"
                style="align-self: center; margin: 50px;"
              />  
            </VRow>
          </VWindowItem>


          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Account
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Personal Info
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Address
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Social Links
              </h6>

              <p class="mb-1">
                {{ formData.twitter }}
              </p>
              <p class="mb-1">
                {{ formData.facebook }}
              </p>
              <p class="mb-1">
                {{ formData.googlePlus }}
              </p>
              <p class="mb-1">
                {{ formData.linkedIn }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex justify-sm-space-between gap-4 flex-wrap justify-center mt-8">
          <VBtn
            :color="currentStep === 0 ? 'secondary' : 'default'"
            variant="outlined"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="mdi-arrow-left"
              start
              class="flip-in-rtl"
            />
            이전
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="mdi-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            다음

            <VIcon
              icon="mdi-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>

<style scoped>
.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.text-lg {
  font-size: 1.25rem; /* 원하는 폰트 크기로 조정 */
}

.text-md {
  font-size: 1rem; /* 원하는 폰트 크기로 조정 */
}
</style>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>

