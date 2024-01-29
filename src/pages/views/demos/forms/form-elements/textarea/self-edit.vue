<script setup>

const props = defineProps({
  value: String,
});
const textareaValue = ref('자기소개')
const rules = [v => v.length <= 200 || '최대 200자까지']
</script>

<template>
  <VTextarea
    v-model="props.value"
    :rules="rules"
    no-resize
    rows="12"
  />
</template>
