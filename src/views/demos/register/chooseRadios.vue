<script setup>
const radioContent = [
  {
    
    title: '이메일 인증하기',
    subtitle: '선택',
    desc: '이메일로 인증해주세요!',
    value: 'email',
  },
  {
    title: '전화번호 인증하기',
    subtitle: '선택',
    desc: '이메일 인증이 불가능 하다면 휴대전화인증을 이용하세요!',
    value: 'phone',
  },
]

const selectedRadio = ref('basic')
</script>

<template>
  <CustomRadios
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '12', cols: '12' }"
  />
</template>
