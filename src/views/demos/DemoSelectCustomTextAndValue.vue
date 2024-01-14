<script setup>
const selectedOption = ref({
  state: '건강 관리',
  value: '건강 관리',
})

const items = [
  {
    state: '건강 관리',
    value: '건강 관리',
  },
  {
    state: '체중 감량',
    value: '체중 감량',
  },
  {
    state: '체중 증가',
    value: '체중 증가',
  },
  {
    state: '근육 강화',
    value: '근육 강화',
  },
  {
    state: '다이어트 식단',
    value: '다이어트 식단',
  },
]
</script>

<template>
  <VSelect
    v-model="selectedOption"
    :hint="`${selectedOption.state}`"
    :items="items"
    item-title="state"
    item-value="abbr"
    label="Select"
    persistent-hint
    return-object
    single-line
  />
</template>
