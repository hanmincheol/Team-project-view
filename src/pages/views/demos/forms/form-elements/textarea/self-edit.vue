<script setup>
const textareaValue = ref('자기소개')
const rules = [v => v.length <= 200 || '최대 200자까지']
</script>

<template>
  <VTextarea
    v-model="textareaValue"
    label="자기소개"
    :rules="rules"
    no-resize
    rows="12"
  />
</template>
