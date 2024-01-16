<script setup>
const items = [
  '식단',
  '운동',
  '심리',
]

const selected = ref([
  '식단',
  '운동',
  '심리',
])
</script>

<template>
  <VSelect
    v-model="selected"
    :items="items"
    label="카테고리"
    chips
    multiple
  />
</template>
