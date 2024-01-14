<script setup>
import Btnsu from '@/pages/views/demos/components/button/self-suc.vue'
import Gender from '@/pages/views/demos/forms/form-elements/radio/Gender.vue'
import Edit from '@/pages/views/demos/forms/form-elements/textarea/Edit.vue'
import PW from '@/pages/views/demos/forms/form-elements/textfield/PasswordEdit.vue'
import Sub from '@/views/demos/DemoSelectCustomTextAndValue.vue'


const editClick1 = ref(true)
const edit1 = ref(false)
const editClick2 = ref(true)
const edit2 = ref(false)
const editClick3 = ref(true)
const edit3 = ref(false)
const editClick4 = ref(true)
const edit4 = ref(false)
const editClick5 = ref(true)
const edit5 = ref(false)
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
              />
            </IconBtn>
            <div
              v-if="edit1"
              style=" margin-top: 5px;float: inline-end;"
            >
              <Btnsu @click="editClick1=true, edit1=false" />
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
              <Btnsu @click="editClick2=true, edit2=false" />
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
            <Edit :readonly="editClick1" />
          </div>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <div style=" margin-top: -32px;">
            <PW :readonly="editClick2" />
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
              <Btnsu @click="editClick3=true, edit3=false" />
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
              <Btnsu @click="editClick4=true, edit4=false" />
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
            <Gender />
          </div>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div style=" margin-top: -20px;">
            <Edit :readonly="editClick3" />
          </div>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div style=" margin-top: -20px;">
            <Edit :readonly="editClick4" />
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
            이름
            <IconBtn>
              <VIcon
                size="22"
                icon="mdi-lead-pencil"
                @click="editClick3=false, edit3=true"
              />
            </IconBtn>
            <Btnsu
              v-if="edit3"
              style=" margin-right: 5px; float: inline-end;"
              @click="editClick3=true, edit3=false"
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
            <Edit :readonly="editClick3" />
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
      <Sub />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <h6
        class="text-h6"
        style=" margin: -2px 20px 10px;"
      >
        주소
      </h6>
    </VCol>
  </VCard>
</template>
