<script setup>
const selectedOption = ref({
  state: '카테고리',
  value: '카테고리',
})

const items = [
  {
    state: '운동',
    value: '운동',
  },
  {
    state: '식단',
    value: '식단',
  },
  {
    state: '심리',
    value: '심리',
  },
]
</script>

<template>
  <VSelect
    v-model="selectedOption"
    :items="items"
    item-title="state"
    item-value="value"
    persistent-hint
    return-object
    single-line
  />
</template>
