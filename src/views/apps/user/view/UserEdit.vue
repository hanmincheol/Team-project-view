<script setup>
import Edit from '@/pages/views/demos/forms/form-elements/textarea/Edit.vue'
import Btnsu from '@/pages/views/demos/components/button/self-suc.vue'
import Sub from '@/views/demos/DemoSelectCustomTextAndValue.vue'

const editClick1 = ref(true)
const edit1 = ref(false)
const editClick2 = ref(true)
const edit2 = ref(false)
const editClick3 = ref(true)
const edit3 = ref(false)
</script>

<template>
  <VCard class="fill-height">
    <VCardText>
      <VRow align="center ml-4">
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
          </h6>
        </VCol>
      </VRow>

      <!-- 첫 번째 카드 텍스트 - 이름 -->
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <Edit :readonly="editClick1" />
          <div style="float: right; margin-top: 10px;" v-if="edit1">
            <Btnsu @click="editClick1=true, edit1=false" />
          </div>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <Edit :readonly="editClick2" />
          <div style="float: right; margin-top: 10px;" v-if="edit2">
            <Btnsu @click="editClick2=true, edit2=false" />
          </div>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText>
      <VRow align="center ml-4">
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
                @click="editClick3=false, edit3=true"
              />
            </IconBtn>
          </h6>
        </VCol>
      </VRow>

      <!-- 첫 번째 카드 텍스트 - 이름 -->
      <VRow>
        <VCol
          cols="12"
          md="12"
        >
          <Edit :readonly="editClick3" />
          <div style="float: right; margin-top: 10px;" v-if="edit3">
            <Btnsu @click="editClick3=true, edit3=false" />
          </div>
        </VCol>
      </VRow>
    </VCardText>
    <VCol
      cols="12"
      md="12"
    >
      <Sub />
    </VCol>
  </VCard>
</template>
