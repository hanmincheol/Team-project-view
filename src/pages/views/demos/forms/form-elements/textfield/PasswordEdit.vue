<script setup>
const show1 = ref(false)
const password = ref('비밀번호 입력')

const rules = {
  required: value => !!value || '입력하세요.',
  min: v => v.length >= 8 || '8자리 이상',
}
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="12"
    >
      <VTextField
        v-model="password"
        :append-inner-icon="show1 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="비밀번호"
        hint="8자리 이상"
        counter
        @click:append-inner="show1 = !show1"
      />
    </VCol>
  </VRow>
</template>
