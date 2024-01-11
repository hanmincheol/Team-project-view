<script setup>
import * as text from '@/views/demos/Terms_and_Conditions'
import DemoCheckboxLabelSlotAll from '@/views/demos/register/DemoCheckboxLabelSlotAll.vue'


import * as demoCode from '@/views/demos/register/demoCodeFormWizardIcons'
import DemoFormWizardIconsBasic from '@/views/demos/register/DemoFormWizardIconsBasic.vue'

const value = ref(text.TermsAndConditions.ts)
const value2 = ref(text.TermsAndConditionsN2.ts)
const value3 = ref(text.TermsAndConditionsN3.ts)
const value4 = ref(text.TermsAndConditionsN4.ts)
const value5 = ref(text.TermsAndConditionsN5.ts)
const value6 = ref(text.TermsAndConditionsN6.ts)
</script>






<template>
  <VRow>
    <VCol cols="12">
      <AppCardCode
        variant="outlined"
        title="HealthyReal 이용약관"
        :code="demoCode.vertical"
      >
        <VCol
          cols="12"
          md="12"
        >
          <!-- 👉 Label Slot -->
          <VCard title="전체 동의하기">
            <VCol
              cols="12"
              md="12"
            >
              <VTextarea 
                v-model="value6"
                readonly
                label="약관동의"
                no-resize
                rows="2"
              />
              <DemoCheckboxLabelSlotAll />
            </VCol>
          </VCard>
        </VCol>



        <VCol
          cols="12"
          md="12"
        >
          <!-- 👉 Label Slot -->
          <VCard title="[필수] 헬시리얼 이용약관">
            <VCol
              cols="12"
              md="12"
            >
              <VTextarea 
                v-model="value"
                readonly
                label="약관동의"
                no-resize
                rows="6"
              />
              <DemoCheckboxLabelSlot />
            </VCol>
          </VCard>
        </VCol>

        <VCol
          cols="12"
          md="12"
        >
          <!-- 👉 Label Slot -->
          <VCard title="[필수] 개인정보 수집 및 이용">
            <VCol
              cols="12"
              md="12"
            >
              <VTextarea 
                v-model="value2"
                readonly
                label="약관동의"
                no-resize
                rows="6"
              />
              <DemoCheckboxLabelSlot />
            </VCol>
          </VCard>
        </VCol>


        <VCol
          cols="12"
          md="12"
        >
          <!-- 👉 Label Slot -->
          <VCard title="[필수] 실명 인증된 아이디로 가입">
            <VCol
              cols="12"
              md="12"
            >
              <VTextarea 
                v-model="value3"
                readonly
                label="약관동의"
                no-resize
                rows="2"
              />
              <DemoCheckboxLabelSlot />
            </VCol>
          </VCard>
        </VCol>

        <VCol
          cols="12"
          md="12"
        >
          <!-- 👉 Label Slot -->
          <VCard title="[선택] 위치기반서비스 이용약관">
            <VCol
              cols="12"
              md="12"
            >
              <VTextarea 
                v-model="value4"
                readonly
                label="약관동의"
                no-resize
                rows="6"
              />
              <DemoCheckboxLabelSlot />
            </VCol>
          </VCard>
        </VCol>

        <VCol
          cols="12"
          md="12"
        >
          <!-- 👉 Label Slot -->
          <VCard title="[선택] 개인정보 수집 및 이용">
            <VCol
              cols="12"
              md="12"
            >
              <VTextarea 
                v-model="value5"
                readonly
                label="약관동의"
                no-resize
                rows="2"
              />
              <DemoCheckboxLabelSlot />
            </VCol>
          </VCard>
        </VCol>
      </AppCardCode>
    </VCol>
  </VRow>
</template>







